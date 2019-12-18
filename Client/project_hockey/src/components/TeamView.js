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

    useEffect(() => { 
        const id = parseInt(props.match.params.id);

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
                    
                        if(TeamMembers.length === 0){
                            setTeamMembers(TeamUsers);
                        }
                        else{

                        }
                    });

                    if(Team[0].teamowner === ParsedUser.id){
                        //manage;
                    }
                    else{

                    }
                }
                else{
                    setTeam(Teams);
                }
            }
            else{

            }
        });
    });

    function noteam(){
        function jointeam(){
            console.log(ParsedUser.id + "id")
            console.log(parseInt(props.match.params.id) + "team")
            axios.post(APIconnection.baseAddress + "/jointeam", {
                data: {
                    userid: ParsedUser.id,
                    teamid: parseInt(props.match.params.id)
                }
            }).then(results => {
                console.log(results);
                console.log(results.data);
            });

            function update(value){
                let prevData = JSON.parse(sessionStorage.getItem('User'));

                Object.keys(value).forEach(function(val, key){
                    prevData[val] = value[val];
                })
                sessionStorage.setItem('User', JSON.stringify(prevData));
            }
            update({teamid: parseInt(props.match.params.id)})
        }

        if(ParsedUser.teamid === null || ParsedUser.teamid === ""){
            return(<button onClick={jointeam}>JOIN THIS TEAM</button>)
        }
    }
    console.log("neekeri")

    return (
    <div style={{textAlign: "center"}}>

        <Header/>

        <div style={{ color: "black" }}>

            <div>
                <div>
                    
                    {Team.map(team => <div><h1>{team.teamname}</h1> <br/> <h3>{team.teaminfo}</h3></div>)} 
                    The owner of this team is <Link to={ `/users/${OwnerId}` }>{TeamOwner}</Link>
                    <h3>Stats:</h3>
                    {Team.map(team => <div><a style={{ color: "green" }}>{team.teamwins} wins</a> and <a style={{ color: "red" }}> {team.teamlosses} losses</a></div>)} 
                    Members: {TeamMembers.map(member => <div><Link to={ `/users/${member.id}` }>{member.username}</Link></div>)}
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