import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Header from './LoggedinHeader';
import axios from 'axios';
import APIconnection from '../APIconnection';
import team1 from './team-images/team1.png';
import team2 from './team-images/team2.png';
import team3 from './team-images/team3.png';

export default function MyMatches(props) {

    let ParsedUser = JSON.parse(sessionStorage.getItem("User"));
    const [Team, setTeam] = useState([]);
    const [MyMatches, setMyMatches] = useState([]);
    const [MyPastMatches, setMyPastMatches] = useState([]);

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
                  teamname1: info.teamname1,
                  teamname2: info.teamname2
              }
              return Match_Info;
            });
  
            if(MyMatches.length == 0){
              setMyMatches(Matches);
            }
            else{
              //Nothing
            }
          }
          else{
            //Nothing
          }
      });

      axios.post(APIconnection.baseAddress + '/getpastmatches', {
        data: {
            teamid: ParsedUser.teamid
        }
        }).then(results => {
          if(results.data.length > 0){
            let PastMatches = results.data.map((info) => {
              const Match_Info = {
                  matchid: info.matchid,
                  team1: info.team1,
                  team2: info.team2,
                  matchdate: info.matchdate,
                  goals1: info.goals1,
                  goals2: info.goals2,
                  scorers: info.scorers,
                  assists: info.assists,
                  teamname1: info.teamname1,
                  teamname2: info.teamname2
              }
              return Match_Info;
            });
  
            if(MyPastMatches.length == 0){
              setMyPastMatches(PastMatches);
            }
            else{
              //Nothing
            }
          }
          else{
            //Nothing
          }
      });
    });


  //Matches page
  return (
    <div style={{textAlign: "center"}}>

            <Header/>

      <div className="upcomingmatches">
        <h2>Your upcoming matches</h2> 
        {MyMatches.map((match, i, x) =>
          <div>
            <Link key={i} to={ `/teams/${match.team1}` }>{match.teamname1}</Link> vs <Link key={x} to={ `/teams/${match.team2}` }>{match.teamname2}</Link> on {match.matchdate.slice(0,10)}
          </div>
          )}
      </div>  

      <div className="playedmatches">
        <h2>Your past matches</h2>
        {MyPastMatches.map((match, i, x) =>
          <div > 
            <Link key={i} to={ `/teams/${match.team1}` }>{match.teamname1}</Link> vs <Link key={x} to={ `/teams/${match.team2}` }>{match.teamname2}</Link> on {match.matchdate.slice(0,10)} ({match.goals1}-{match.goals2})
          </div>
          )}
      </div>  
    
    </div>
  )
}