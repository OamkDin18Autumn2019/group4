import React, {useState} from 'react';
import './HeaderStyle.css';
import './LoginStyle.css';
import APIconnection from '../APIconnection.json';
import axios from 'axios';


export default function Header(props) {

  const [ShowSignup, setShowSignup] = useState("hidden");

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

        if(results.data.teamid === null){

        }
        else{
          axios.post(APIconnection.baseAddress + '/findteam', {
            data: {
                teamid: results.data.teamid
            }
          }).then(results => {
              sessionStorage.setItem('Team', JSON.stringify(results.data));
          });
        }

        console.log(results.data.username);
      });
    }

    return (
        <div style={{textAlign: "center", display: "block"}}>
            <div>Hello Hockey World</div>
            <div className="headerbody">
                <div className="login-container">
                    <form onSubmit={login}>
                        <input type="text" placeholder="Username" name="username" />
                        <input type="password" placeholder="Password" name="password" />
                        <button type="submit">Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}