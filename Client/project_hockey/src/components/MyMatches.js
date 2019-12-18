import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Header from './LoggedinHeader';
import axios from 'axios';
import APIconnection from '../APIconnection';

export default function MyMatches(props) {

    let ParsedUser = JSON.parse(sessionStorage.getItem("User"));
    const [MyMatches, setMyMatches] = useState([]);

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

  function showmatches(){

      return(
          <div>

          </div>
      )
  
  }

  return (
    <div style={{textAlign: "center"}}>

            <Header/>

      <div style={{ color: "black" }}>
        {MyMatches.map(match => <div><Link to={ `/teams/${match.team1}` }>{match.team1}</Link> vs <Link to={ `/teams/${match.team2}` }>{match.team2}</Link> on {match.matchdate}</div>)}
      </div>  
    
    </div>
  )
}