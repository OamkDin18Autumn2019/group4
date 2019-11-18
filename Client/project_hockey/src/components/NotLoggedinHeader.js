import React from 'react';
import Authenticator from './Authenticator';
import './HeaderStyle.css';
import './LoginStyle.css';


export default function Header(props) {

    function login(event)
    {    
      event.preventDefault();
      props.setUserInfo(event.target['username'].value);    
      Authenticator.authenticate(event.target['username'].value, event.target['password'].value)
        .then(result =>
          {
            props.loginSuccess();
            props.history.push(props.redirectPathOnSuccess);
          })
        .catch(() => {
          props.loginFail();
        })
    }

    return (
        <div>
            <div>Hello Hockey World</div>
            <div className="headerbody">
                <div class="login-container">
                    <form onSubmit={login}>
                        <input type="text" placeholder="Username" name="username" />
                        <input type="password" placeholder="Password" name="password" />
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



