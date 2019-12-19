import React from 'react';
import { Link } from 'react-router-dom';
import './BurgerMenu.css';

export default function BurgerMenu() {

    let ParsedUser = JSON.parse(sessionStorage.getItem("User"));

    function userteam() {
        if (ParsedUser.teamid === null || ParsedUser.teamid === "") {
            return (<li><Link to="/NoTeam" >Team</Link></li>)
        }
        else {
            return (<li><Link to={`/teams/${ParsedUser.teamid}`}>Team</Link></li>)
        }
    }
    function logout() {
        sessionStorage.clear();
        window.location.reload();
    }
    return (
        <div>

            <nav role='navigation'>
                <div id="menuToggle">

                    <input type="checkbox" />

                    <span></span>
                    <span></span>
                    <span></span>

                    <ul id="menu">
                        <li><Link to={`/users/${ParsedUser.id}`}>Profile</Link></li>
                        <li><Link to="../MyMatches">Matches</Link></li>
                        {userteam()}
                        <li onClick={logout}><Link style={{ color: "#1d74b5" }}>Logout</Link></li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}