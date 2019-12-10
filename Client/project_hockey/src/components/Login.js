import React from 'react';
import './HeaderStyle.css';
import './LoginStyle.css';
import './BurgerMenu.js';


export default function Login() {
    return (
        <div>
            <div className="headerbody">
                <div class="login-container">
                    <form action="/action_page.php">
                        <input type="text" placeholder="Username" name="username" />
                        <input type="text" placeholder="Password" name="psw" />
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



