import React from 'react';
import './HeaderStyle.css';
import './LoginStyle.css';
import APIconnection from '../APIconnection.json';
import axios from 'axios';


export default function Header(props) {

    function login(event)
    {    
      event.preventDefault();
      props.setUserInfo("null");

      //Sending a post request to the API with input username and password as payload
      axios.post(APIconnection.baseAddress + '/login', {
        data: {
            username: event.target['username'].value,
            password: event.target['password'].value
        }
      }) //If the API approves the login, the client will store these values for later use
      .then(results => {
        props.loginSuccess();
        props.setUserInfo(results.data.id, results.data.username);
        sessionStorage.setItem('User', JSON.stringify(results.data));
        sessionStorage.setItem('username', results.data.username);
        sessionStorage.setItem('id', results.data.id);
        sessionStorage.setItem('login', true);
        props.history.push(props.redirectPathOnSuccess);

        console.log(results.data.username);
      })
    }

    //Testing if the user is already logged in and redirecting them back to the homepage
    function loggedin(){
      if(sessionStorage.getItem('login') === 'true'){
        props.loginSuccess();
        props.setUserInfo(sessionStorage.getItem("id"), sessionStorage.getItem("username"));
        props.history.push(props.redirectPathOnSuccess);
        console.log(JSON.stringify(props.location))
      }
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
                <h1>YETI Hockey</h1>
                <div className="login-container">
                    <form onSubmit={login}>
                        <input type="text" placeholder="Username" name="username" />
                        <br></br>
                        <input type="password" placeholder="Password" name="password" />
                        <br></br>
                        <button type="submit">Login</button>
                    </form>
                    <form action="/action_page.php">
                        <button className="register-button" type="submit">Sign up</button>
                    </form>
                </div>
            </div>
        </div>
    )
}



