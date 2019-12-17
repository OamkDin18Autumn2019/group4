import React from 'react';
import {Link} from 'react-router-dom';
import './BurgerMenu.css';

export default function BurgerMenu() {

    let ParsedUser = JSON.parse(sessionStorage.getItem("User"));

    return (
        <div>

            <nav role='navigation'>
                <div id="menuToggle">

                    <input type="checkbox" />

                    <span></span>
                    <span></span>
                    <span></span>

                    <ul id="menu">
                        <a href="#"><li>Option 1</li></a>
                        <a href="#"><li>Option 2</li></a>
                        <li><Link to={ `/users/${ParsedUser.id}` }>My Profile</Link></li>
                        <li><Link to="MyMatches">My Matches</Link></li>
                        <li><Link to="MyTeam">My Team</Link></li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}