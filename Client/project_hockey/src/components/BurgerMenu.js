import React from 'react';
import './BurgerMenu.css';


export default function BurgerMenu() {
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
                        <a href="#"><li>Option 3</li></a>
                        <a href="#"><li>Option 4</li></a>
                    </ul>
                </div>
            </nav>
        </div>
    )
}