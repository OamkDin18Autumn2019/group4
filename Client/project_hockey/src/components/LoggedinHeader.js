import React from 'react';
import './HeaderStyle.css';
import './LoginStyle.css';


export default function Header(props) 
{

    function logout()
    {
        sessionStorage.clear();
        window.location.reload();
        console.log("Logged out");
    }

    return (
        <div>
            <div>Hello Hockey World</div>
            <div className="headerbody">
                <div className="login-container">
                    <button type="submit">HAMBURGER</button>
                    <button type="submit" onClick={logout}>Logout</button>
                </div>
            </div>
        </div>
    )
}