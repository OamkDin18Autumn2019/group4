/*
------------------------Just commenting this out if we need it later--------------------

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = App;
*/

const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const passport = require('passport');
const app = express();
const db = require('./Connection');
const port = 4000;
const jwt = require('jsonwebtoken');

var Strategy = require('passport-http').BasicStrategy;

const saltRounds = 4;

app.use(bodyParser.json());
app.use(cors());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization');
  next();
});

 //----------------------------------------------------------------------USERS---------------------------------------------------------------------------------//

app.post('/signup', (req, res) => {
  let username = req.body.data.username.trim();
  let password = req.body.data.password.trim();
  let email = req.body.data.email.trim();
  let role = req.body.data.role;
  let handness = req.body.data.handedness;

  db.query('SELECT username FROM NHLusers WHERE username = ?', [username]).then(results => {

    if(results.length == 0){
  
      if((typeof password === "string") &&
        (password.length > 6) && 
        (typeof email === "string")){

        if((typeof username === "string") &&
        (username.length > 4)){

          bcrypt.hash(password, saltRounds).then(hash =>
            db.query('INSERT INTO NHLusers (username, password, email, role, handness) VALUES (?,?,?,?,?)', [username, hash, email, role, handness])
          )
          .then(dbResults => {
              console.log(dbResults);
              res.sendStatus(201);
          })
          .catch(error => res.sendStatus(500));
        }
        else{
          console.log("username");
          res.json("username");

        }
      }
      else {
        console.log("password");
        res.json("password");
      }
    }
    else{
      console.log("taken");
      res.json("taken");
    }
  })
});

app.get('/users', (req, res) => {
  db.query('SELECT id, username, teamid, goals, assists, email, role, handness FROM NHLusers').then(results => {
    res.json(results);
  })
});

app.get('/users/:id',
        //passport.authenticate('basic', { session: false }),
        (req, res) => {
          db.query('SELECT id, username, teamid, goals, assists, email, role, handness FROM NHLusers WHERE id = ?', [req.params.id]).then(results => {
            res.json(results);
          })
 });

 app.post('/login', (req, res) => {
  let username = req.body.data.username
  let password = req.body.data.password
  console.log(req.body);
  console.log(username);
  db.query('SELECT username, password FROM NHLusers WHERE username = ?', [username]).then(dbResults => {

    if(dbResults.length == 0)
    {
      res.sendStatus(402);
    }

    bcrypt.compare(password, dbResults[0].password).then(bcryptResult => {
      if(bcryptResult == true)
      {
        if(dbResults[0].username == username){
          db.query('SELECT id, username, teamid, goals, assists, email, role, handness FROM NHLusers WHERE username = ?', [username]).then(dbResults2 => {
            let token = jwt.sign({username: username},"secret",{expiresIn: '10min'});
            res.json(dbResults2[0]);
            console.log(token);
          });
        }
        else{
          res.sendStatus(403);
        }
      }
      else
      {
        res.sendStatus(400);
      }
    })

  })
});

app.post('/finduser',(req, res) => {
  let userid = req.body.data.userid
  db.query('SELECT id, username FROM NHLusers WHERE id = ?', [userid]).then(results => {
    res.json(results[0]);
  })
});

app.get('/usergoals', (req, res) => {
  db.query('SELECT id, username, teamid, goals FROM NHLusers ORDER BY goals DESC').then(results => {
    res.json(results);
  })
});

app.get('/userassists', (req, res) => {
  db.query('SELECT id, username, teamid, assists FROM NHLusers ORDER BY assists DESC').then(results => {
    res.json(results);
  })
});

 //----------------------------------------------------------------------TEAMS---------------------------------------------------------------------------------//

 app.post('/teams', (req, res) => {
  let teamname = req.body.teamname.trim();
  let teaminfo = req.body.teaminfo.trim();
  let teamowner = req.body.id.trim();

  if((typeof teamname === "string"))
  {
    (db.query('INSERT INTO NHLteams (teamname, teaminfo, teamowner) VALUES (?,?,?)', [teamname, teaminfo, teamowner]))
    .then(dbResults => {
        console.log(dbResults);
        res.sendStatus(201);
    })
    .catch(error => res.sendStatus(500));
  }
  else {
    console.log("teamname is not string");
    res.sendStatus(400);
  }
});

app.get('/teams', (req, res) => {
  db.query('SELECT teamid, teamname, teaminfo, teamowner, teamwins, teamlosses FROM NHLteams').then(results => {
    res.json(results);
  })
});

app.get('/teams/:id',(req, res) => {
  db.query('SELECT teamid, teamname, teaminfo, teamowner, teamwins, teamlosses FROM NHLteams WHERE teamid = ?', [req.params.id]).then(results => {
    res.json(results);
  })
});

app.post('/findteam',(req, res) => {
  let teamid = req.body.data.teamid
  db.query('SELECT teamid, teamname, teaminfo, teamowner, teamwins, teamlosses FROM NHLteams WHERE teamid = ?', [teamid]).then(results => {
    res.json(results[0]);
  })
});

app.post('/jointeam',(req, res) => {
  let teamid = req.body.data.teamid
  let userid = req.body.data.userid
  console.log(teamid)
  db.query('UPDATE NHLusers SET teamid = ? WHERE id = ?', [teamid, userid]).then(dbResults => {
    console.log(dbResults);
    res.sendStatus(201);
  })
  .catch(error => res.sendStatus(500));
  });

app.post('/leaveteam',(req, res) => {
  let userid = req.body.data.userid
  db.query('UPDATE NHLusers SET teamid = null WHERE id = ?', [userid]).then(dbResults => {
    console.log(dbResults);
    res.sendStatus(201);
    res.json(dbResults);
  })
  .catch(error => res.sendStatus(500));
  });

  app.post('/findmembers',(req, res) => {
    let teamid = req.body.data.teamid
    db.query('SELECT id, username, role FROM NHLusers WHERE teamid = ?', [teamid]).then(results => {
      res.json(results);
      console.log(results);
    })
  });

 //----------------------------------------------------------------------LEAGUES---------------------------------------------------------------------------------//

app.post('/leagues', (req, res) => {
  let leaguename = req.body.leaguename.trim();
  let leagueinfo = req.body.leagueinfo.trim();
  let leagueowner = req.body.id.trim();

  if((typeof leaguename === "string"))
  {
    (db.query('INSERT INTO NHLleagues (leaguename, leagueinfo, leagueowner) VALUES (?,?,?)', [leaguename, leagueinfo, leagueowner]))
    .then(dbResults => {
        console.log(dbResults);
        res.sendStatus(201);
    })
    .catch(error => res.sendStatus(500));
  }
  else {
    console.log("leaguename is not string");
    res.sendStatus(400);
  }
});

app.get('/leagues', (req, res) => {
  db.query('SELECT leagueid, leaguename, leagueinfo, leagueowner, teams FROM NHLleagues').then(results => {
    res.json(results);
  })
});

app.get('/leagues/:leagueid',(req, res) => {
  db.query('SELECT leagueid, leaguename, leagueinfo, leagueowner, teams FROM NHLleagues WHERE leagueid = ?', [req.params.leagueid]).then(results => {
    res.json(results);
  })
});

app.post('/getmatches',(req, res) => {
  let teamid = req.body.data.teamid
  db.query('SELECT matchid, team1, team2, matchdate, goals1, goals2, scorers, assists, teamname1, teamname2 FROM NHLmatches WHERE team1 = ? OR team2 = ? ORDER BY matchdate ASC', [teamid,teamid]).then(results => {
    res.json(results);
    console.log(results);
  })
});

app.post('/getpastmatches',(req, res) => {
  let teamid = req.body.data.teamid
  db.query('SELECT matchid, team1, team2, matchdate, goals1, goals2, scorers, assists, teamname1, teamname2 FROM NHLpastmatches WHERE team1 = ? OR team2 = ? ORDER BY matchdate DESC', [teamid,teamid]).then(results => {
    res.json(results);
    console.log(results);
  })
});

app.get('/allmatches', (req, res) => {
  db.query('SELECT matchid, team1, team2, matchdate, goals1, goals2, scorers, assists FROM NHLmatches').then(results => {
    res.json(results);
  })
});

 //----------------------------------------------------------------------PASSPORT---------------------------------------------------------------------------------//

passport.use(new Strategy((username, password, cb) => {
  db.query('SELECT id, username, password FROM NHLusers WHERE username = ?', [username]).then(dbResults => {

    if(dbResults.length == 0)
    {
      return cb(null, false);
    }

    bcrypt.compare(password, dbResults[0].password).then(bcryptResult => {
      if(bcryptResult == true)
      {
        let token = jwt.sign({username: username},"asdasd",{expiresIn: '10min'});
        cb(null, dbResults[0], token);
        console.log(token);
      }
      else
      {
        return cb(null, false);
      }
    })

  }).catch(dbError => cb(err))
}));

/* DB init if the tables dont exist */
Promise.all(
  [
      // Add table creation statements if you need new tables
  ]
).then(() => {
  console.log('Database Initialized');
  app.listen(port, () => {
      console.log(`API listening on http://localhost:${port}\n`);
  });
})
.catch(error => console.log(error));

