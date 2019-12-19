import React, { useState } from 'react';
import './HeaderStyle.css';
import './LoginStyle.css';
import APIconnection from '../APIconnection.json';
import axios from 'axios';
import SignUpForm from './SignUpForm';
import hockeylogo from '../hockeylogo.svg';
import hockeybg from '../hockeybg.svg';


export default function Header(props) {


  function login(event) {
    event.preventDefault();
    props.setUserInfo("null");

      //Sending a post request to the API with input username and password as payload.
      axios.post(APIconnection.baseAddress + '/login', {
        data: {
            username: event.target['username'].value,
            password: event.target['password'].value
        }
      }) //If the API approves the login, the client will store these values for later use.

      .then(results => {
        props.loginSuccess();
        props.setUserInfo(results.data.id, results.data.username);
        sessionStorage.setItem('User', JSON.stringify(results.data));
        sessionStorage.setItem('login', true);
        props.history.push(props.redirectPathOnSuccess);

        //Checking if user is in a team and  if so, storing the team values.
        if(results.data.teamid === null){


        }
        else {
          axios.post(APIconnection.baseAddress + '/findteam', {
            data: {
              teamid: results.data.teamid
            }
          }).then(results => {
            sessionStorage.setItem('Team', JSON.stringify(results.data));
          });
        }
      });
  }
    //Testing if the user is already logged in and redirecting them back to the homepage.
    function loggedin(){
      if(sessionStorage.getItem('login') === 'true'){
        props.loginSuccess();
        props.setUserInfo(sessionStorage.getItem("id"), sessionStorage.getItem("username"));
        props.history.push(props.redirectPathOnSuccess);
        console.log(JSON.stringify(props.location))
      }
    }

  function changeSignup() {
    document.getElementById("login-div").style.display = "none";
    document.getElementById("signup-div").style.display = "block"
  }
  function changeSignup2() {
    document.getElementById("login-div").style.display = "block";
    document.getElementById("signup-div").style.display = "none"
  }

  /*Authenticator.authenticate(event.target['username'].value, event.target['password'].value)
    .then(result =>
      {
        props.loginSuccess();
        props.history.push(props.redirectPathOnSuccess);
      })
    .catch(() => {
      props.loginFail();
    });*/

  return (
    <div onLoad={loggedin()}>
      <div className="loginpage">
        <div>
          <div className="hockeylogo2">
            <img className="yetiLogo2" src={hockeylogo} />
          </div>
        </div>
        <div id="login-div" className="login-container">
          <form onSubmit={login}>
            <input className="loginman" type="text" placeholder="Username" name="username" />
            <br></br>
            <input className="loginman" type="password" placeholder="Password" name="password" />
            <br></br>
            <button style={{backgroundColor:"#2c2825"}} type="submit">Login</button>
          </form>
          <div className="signup_div">
          <button style={{backgroundColor:"#2c2825"}} className="register-button" type="submit" onClick={changeSignup}>Sign up</button>
          </div>

        </div>
      </div>
      <div id="signup-div">
        <SignUpForm setUserInfo={props.setUserInfo} UserInfo={props.UserInfo} loginSuccess={props.loginSuccess} redirectPathOnSuccess={props.redirectPathOnSuccess} />
        <div className="exist_div">
        <button className="existing-button" type="submit" onClick={changeSignup2}>Already have an account?</button>
        </div>
        
      </div>
      <div>
        <div className="hockeybackground">
          <img className="hockeybg" src={hockeybg} />
        </div>
      </div>
    </div>
  )
  }




