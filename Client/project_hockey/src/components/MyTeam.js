import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Header from './LoggedinHeader';
import BurgerMenu from './BurgerMenu';
import axios from 'axios';
import APIconnection from '../APIconnection';

export default function MyTeam(props) {

    let ParsedUser = JSON.parse(sessionStorage.getItem("User"));
    let ParsedTeam = JSON.parse(sessionStorage.getItem("Team"));
    const [UserTeam, setUserTeam] = useState("");
    const [TeamOwner, setTeamOwner] = useState("");
    const [OwnerId, setOwnerId] = useState([]);
    const [TeamMembers, setTeamMembers] = useState([]);
    //const [showManagement, setShowManagement] = useState("");

    
    console.log(ParsedUser.teamid);

    useEffect(() => {
      if(ParsedUser.teamid === null){
        console.log("null");
        setUserTeam("null");
      }
      else{
        console.log(ParsedUser.teamid);
        setUserTeam(ParsedUser.teamid);

        axios.post(APIconnection.baseAddress + '/finduser', {
          data: {
              userid: ParsedTeam.teamowner
          }
        }).then(results => {
          setTeamOwner(results.data.username);
          setOwnerId(results.data.id);
        });

        axios.post(APIconnection.baseAddress + '/findmembers', {
          data: {
              teamid: ParsedTeam.teamid
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
 
        })
      }
    });

    function leaveteam(){
      axios.post(APIconnection.baseAddress + '/leaveteam', {
        data: {
            userid: ParsedUser.id
        }
      }).then(results => {
        window.location.reload();
        sessionStorage.removeItem("Team");
      });

    }

    //Testing if the user is in a team and then showing relevant information to the user
    function testteam(){
        
        if(ParsedUser.teamid === null){
            console.log("null");
            
            return(
                <div style={{textAlign: "center"}}>
                    You aren't in a team. You can join one here: <br></br>





                    or create your own here: <br></br>
                    <form onSubmit={createteam}>
                        <input type="text" placeholder="Team name" name="teamname" />
                        <input type="text" placeholder="Team info" name="teaminfo" />
                        <button type="submit">Create Team</button>
                    </form>
                </div>
            )
        }
        else{
            return(
                <div>
                    <h1>{ParsedTeam.teamname}</h1>
                        <br></br>
                    <h3>{ParsedTeam.teaminfo}</h3>
                        <br></br>
                    The owner of this team is <Link to={ `/users/${OwnerId}` }>{TeamOwner}</Link>
                        <br></br>
                    <h3>Stats:</h3> 
                    <a style={{ color: "green" }}> Wins: {ParsedTeam.teamwins} </a>
                    <a style={{ color: "red" }}> Losses: {ParsedTeam.teamlosses} </a>
                        <br></br>

                    Members: {TeamMembers.map(member => <div><Link to={ `/users/${member.id}` }>{member.username}</Link></div>)}
                        <br></br>
                    <button onClick={leaveteam}>Leave team</button>

                </div>
            )
        }
    }

    function createteam(event){
        event.preventDefault();
  
        //Sending a post request to the API with input teamname & teaminfo and userid as payload
        axios.post(APIconnection.baseAddress + '/teams', {
          data: {
              teamname: event.target['teamname'].value,
              teaminfo: event.target['teaminfo'].value,
              teamowner: ParsedUser.id
          }
        })
        .then(results => {

        })
    }

    function manageteam(){
      if(ParsedUser.teamid === null){

      }
      else{
        if(ParsedUser.id === ParsedTeam.teamowner){
          return(
            <Link to="ManageTeam"><button> Manage your team </button></Link>
          )
        }
        else{

        }
      }

      //console.log(showManagement);
      
    }
    

  return (
    <div style={{textAlign: "center"}}>

            <Header/>

      <div style={{ color: "black" }}>

        {testteam()}
        {manageteam()}
        
      </div>  
      <BurgerMenu />
    </div>
  )
}