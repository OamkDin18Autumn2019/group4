import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Header from './LoggedinHeader';
import axios from 'axios';
import APIconnection from '../APIconnection';
import team1 from './team-images/team1.png';
import team2 from './team-images/team2.png';
import team3 from './team-images/team3.png';

export default function TeamView(props) {
    let ParsedUser = JSON.parse(sessionStorage.getItem("User"));

    const [Team, setTeam] = useState([]);
    const [TeamOwner, setTeamOwner] = useState("");
    const [OwnerId, setOwnerId] = useState([]);
    const [TeamMembers, setTeamMembers] = useState([]);

    //When component mounts, sending POST calls to API where it fetches information about the team.
    useEffect(() => { 
        const id = parseInt(props.match.params.id);

        //Getting team info with its id
        axios.get(APIconnection.baseAddress + `/teams/${id}`, {
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
                if(Team.length === 1){
                    console.log(Team[0]);

                    //Getting information about the team owner
                    axios.post(APIconnection.baseAddress + '/finduser', {
                        data: {
                            userid: Team[0].teamowner
                        }
                    }).then(results => {
                        setTeamOwner(results.data.username);
                        setOwnerId(results.data.id);
                    });

                    //Getting information about the members
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
                    
                        if(TeamMembers.length === 0){
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

    //If the user viewing the page isn't in a team, show "Join team" button to be able to join the team.
    function noteam(){
        if(ParsedUser.teamid === null || ParsedUser.teamid === ""){
            function jointeam(){
                axios.post(APIconnection.baseAddress + "/jointeam", {
                    data: {
                        userid: ParsedUser.id,
                        teamid: parseInt(props.match.params.id)
                    }
                }).then(results => {
                });

                //Updating the stored team value
                function update(value){
                    let prevData = JSON.parse(sessionStorage.getItem('User'));

                    Object.keys(value).forEach(function(val, key){
                        prevData[val] = value[val];
                    })
                    sessionStorage.setItem('User', JSON.stringify(prevData));
                }
                update({teamid: parseInt(props.match.params.id)})
            }
            return(<button onClick={jointeam}>JOIN THIS TEAM</button>)
        }
        else{

        }
    }
    function teamimage(){
        if(Team.teamid === 1)
        {
           return (<p>test</p>)
        }
    }

    return (
    <div style={{textAlign: "center"}}>

        <Header/>

        <div style={{ color: "black" }}>

            <div>
                <div>
                    <div>
                        {teamimage()}
                    </div>
                    {Team.map(team => <div><h1>{team.teamname}</h1> <br/> <h3 style={{marginLeft: "auto", marginRight: "auto", width: "40%"}}>{team.teaminfo}</h3></div>)} 
                    The owner of this team is <b><Link to={ `/users/${OwnerId}` }>{TeamOwner}</Link></b>
                    <h3>Stats:</h3>
                    {Team.map(team => <div><a style={{ color: "green", fontSize: "25px" }}>{team.teamwins} wins</a> and <a style={{ color: "red", fontSize: "25px"  }}> {team.teamlosses} losses</a></div>)} 
                   <br></br> <p style={{ fontSize: "25px" }}>Members:</p> {TeamMembers.map(member => <div><Link to={ `/users/${member.id}` }>{member.username}</Link></div>)}
                    <br></br>
                    {noteam()}
                    
                <div>
            </div>
        </div>
        </div>
        </div>
    </div>
  )
}