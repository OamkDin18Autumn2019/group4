import React from 'react';
import { Redirect } from 'react-router-dom';
import './SignUpForm.css';
import APIconnection from '../APIconnection.json';
import axios from 'axios';

export default function SignUpForm(props) {

    function signup(event){
        event.preventDefault();
        props.setUserInfo("null");
  
        //Sending a post request to the API with input username and password as payload
        axios.post(APIconnection.baseAddress + '/signup', {
          data: {
              username: event.target['username'].value,
              email: event.target['email'].value,
              role: event.target['role'].value,
              handedness: event.target['handedness'].value,
              password: event.target['password'].value
          }
        }) //If the API approves the signup, the client will store these values for later use
        .then(results => {
          /*props.loginSuccess();
          props.setUserInfo(results.data.id, results.data.username);
          sessionStorage.setItem('User', JSON.stringify(results.data));
          sessionStorage.setItem('username', results.data.username);
          sessionStorage.setItem('id', results.data.id);
          sessionStorage.setItem('login', true);
          props.history.push(props.redirectPathOnSuccess);*/

          console.log(results.data)
        
          if(results.data === "Created"){
              console.log("created");
              return <Redirect to="/LoginAfterSignup"/>
          }
          else{
              console.log(results.data)
          }
  
          /*if(results.data.teamid === null){
  
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
  
          console.log(results.data.username);*/
        });
        //style={{visibility: "hidden"}}
    }

    return (
        <div>

            <form onSubmit={signup}>
                <ul className="form-style-1">
                    <li><label>Username <span className="required">*</span></label><input type="text" name="username" className="field-long" placeholder="Username"/> </li>

                    <li>
                        <label>E-mail <span className="required">*</span></label>
                        <input type="email" name="email" className="field-long" placeholder="E-mail" />
                    </li>

                    <li>
                        <label>Role and Handedness</label>
                        <select name="role" className="field-divided">
                            <option value="0">Center</option>
                            <option value="1">Left Winger</option>
                            <option value="2">Right Winger</option>
                            <option value="3">Left Defenseman</option>
                            <option value="4">Right Defenseman</option>
                            <option value="5">Goalie</option>
                        </select>

                        <select name="handedness" className="field-divided">
                            <option value="0">Right</option>
                            <option value="1">Left</option>
                        </select>
                    </li>

                    <li><label>Password <span className="required">*</span></label><input type="password" name="password" className="field-long" placeholder="Password"/></li>

                    <li>
                        <input type="submit" value="Submit" />
                    </li>
                </ul>
            </form>

        </div>
    )
}