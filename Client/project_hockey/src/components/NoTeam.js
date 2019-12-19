import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Header from './LoggedinHeader';
import axios from 'axios';
import APIconnection from '../APIconnection';

export default function NoTeam(props) {

    const [Team, setTeam] = useState([]);
    const [TeamOwner, setTeamOwner] = useState("");
    const [OwnerId, setOwnerId] = useState([]);
    const [TeamMembers, setTeamMembers] = useState([]);

    useEffect(() => {

        axios.get(APIconnection.baseAddress + "/teams", {
        }).then(results => {
            if(results.data.length > 0){
                let Teams = results.data.map((info) => {
                    const Team_Info = {
                    teamid: info.teamid,
                    teamname: info.teamname,
                    teaminfo: info.teaminfo,
                    teamowner: info.teamowner,
                    teamwins: info.teamwins,
                    teamlosses: info.teamlosses
                }
                    return Team_Info;
                });
                if(Team.length == 5){
                    console.log(Team[0]);

                    axios.post(APIconnection.baseAddress + '/finduser', {
                        data: {
                            userid: Team[0].teamowner
                        }
                    }).then(results => {
                        setTeamOwner(results.data.username);
                        setOwnerId(results.data.id);
                    });

                    axios.post(APIconnection.baseAddress + '/findmembers', {
                        data: {
                            teamid: Team[0].teamid
                        }
                        }).then(results => {
                        console.log(results.data);
                        let TeamUsers = results.data.map((info) => {
                            const Member_Info = {
                                id: info.id,
                                username: info.username,
                                role: info.role
                            }
                            return Member_Info;
                        });
                    
                        if(TeamMembers.length == 0){
                            setTeamMembers(TeamUsers);
                        }
                        else{

                        }
                    });
                }
                else{
                    setTeam(Teams);
                }
            }
            else{

            }
        });
    });

    let ParsedUser = JSON.parse(sessionStorage.getItem("User"));

    function jointeam(id){
        //event.preventDefault();
  
        //Sending a post request to the API with input teamname & teaminfo and userid as payload
        axios.post(APIconnection.baseAddress + '/teams', {
          data: {
              /*teamname: event.target['teamname'].value,
              teaminfo: event.target['teaminfo'].value,
              teamowner: ParsedUser.id*/
          }
        })
        .then(results => {

        })
    }

    

  return (
    <div style={{textAlign: "center"}}>

            <Header/>

      <div style={{ color: "black" }}>

        You aren't in a team. You can join one here: <br></br>

        {Team.map(team => <div><Link to={ `/teams/${team.teamid}` }><h1>{team.teamname}</h1></Link></div>)}

      </div>  
    </div>
  )
}