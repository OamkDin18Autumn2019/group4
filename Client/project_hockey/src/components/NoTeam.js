import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Header from './LoggedinHeader';
import BurgerMenu from './BurgerMenu';
import axios from 'axios';
import APIconnection from '../APIconnection';

export default function NoTeam(props) {

    let ParsedUser = JSON.parse(sessionStorage.getItem("User"));

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

    

  return (
    <div style={{textAlign: "center"}}>

            <Header/>

      <div style={{ color: "black" }}>

        You aren't in a team. You can join one here: <br></br>


        or create your own here: <br></br>
        <form onSubmit={createteam} id="creation">
            <input type="text" placeholder="Team name" name="teamname" />
            <textarea placeholder="Enter info about your team here.." name="teaminfo" form="creation"></textarea>
            <button type="submit">Create Team</button>
        </form>

      </div>  
      <BurgerMenu />
    </div>
  )
}