let mysql = require('mysql');
let pool = null;
try {
  pool  = mysql.createPool({
    host            : 'mysli.oamk.fi',
    user            : 't7aljo00',
    password        : 'HfxZ2wfqMF4wRx2k',
    database        : 'opisk_t7aljo00'
  });

} catch (error) {
  console.error('Mysql pool create failed');
  console.error(error);
}


const api = {
  query: (query, ...parameters) =>
  {
    let promise = new Promise(function(resolve, reject) {
      pool.query(query, ...parameters, (error, results, fields) => {
        if(error) {
          reject(error)
        };

        resolve(results);
      })
    });

    return promise;
  },
  closeAll: () => {
    pool.end();
  }
};

module.exports = api;