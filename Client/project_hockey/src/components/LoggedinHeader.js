import React from 'react';
import './HeaderStyle.css';
import './LoginStyle.css';


export default function Header() {

    return (
        <div>
            <div>Hello Hockey World</div>
            <div className="headerbody">
                <div class="login-container">
                    <button type="submit">HAMBURGER</button>
                </div>
            </div>
        </div>
    )
}