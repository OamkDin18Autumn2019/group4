import React from 'react';
import './HeaderStyle.css';
import './LoginStyle.css';


export default function Login() {
    return (
        <div>
            <div>Hello World</div>

            <div class="login-container">
                <form action="/action_page.php">
                    <input type="text" placeholder="Username" name="username" />
                    <input type="text" placeholder="Password" name="psw" />
                    <button type="submit">Login</button>
                </form>
            </div>
            <div className="headerbody">Hej</div>
        </div>
    )
}



