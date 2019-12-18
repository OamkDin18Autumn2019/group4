import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Header from './LoggedinHeader';
import axios from 'axios';
import APIconnection from '../APIconnection';

export default function MyMatches(props) {

    let ParsedUser = JSON.parse(sessionStorage.getItem("User"));
    const [MyMatches, setMyMatches] = useState([]);

    //When component mounts, send POST calls to API where it fetches all the matches set for users team
    useEffect(() => { 
      axios.post(APIconnection.baseAddress + '/getmatches', {
        data: {
            teamid: ParsedUser.teamid
        }
        }).then(results => {
          if(results.data.length > 0){
            let Matches = results.data.map((info) => {
              const Match_Info = {
                  matchid: info.matchid,
                  team1: info.team1,
                  team2: info.team2,
                  matchdate: info.matchdate,
                  goals1: info.goals1,
                  goals2: info.goals2,
                  scorers: info.scorers,
                  assists: info.assists,
              }
              return Match_Info;
            });
            
            console.log(Matches);
  
            if(MyMatches.length == 0){
              setMyMatches(Matches);
              console.log(MyMatches);
            }
            else{
              
            }
          }
          else{

          }
      });
    });

  //Matches page
  return (
    <div style={{textAlign: "center"}}>

            <Header/>

      <div className="playedmatches">
        {MyMatches.map((match, i, x) =>
          <div > 
          <Link key={i} to={ `/teams/${match.team1}` }>{match.team1}</Link> vs <Link key={x} to={ `/teams/${match.team2}` }>{match.team2}</Link> on {match.matchdate.slice(0,10)}
          </div>
          )}
      </div>  

      <div className="upcomingmatches">
      {MyMatches.map((match, i, x) =>
        <div > 
        <Link key={i} to={ `/teams/${match.team1}` }>{match.team1}</Link> vs <Link key={x} to={ `/teams/${match.team2}` }>{match.team2}</Link> on {match.matchdate.slice(0,10)}
        </div>
        )}
    </div>  
    
    </div>
  )
}