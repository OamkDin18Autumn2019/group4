import React from 'react';
import './BurgerMenu.css';


export default function BurgerMenu() {
    return (
        <div>
            <div>Hello World</div>
            <div className="headerbody">
                <div class="menu-wrap">
                    <input type="checkbox" className="toggler"></input>
                    <div className="hamburger"><div></div></div>
                    <div className="menu">
                        <div>
                            <ul>
                                <li><a href="#">Option 1</a></li>
                                <li><a href="#">Option 2</a></li>
                                <li><a href="#">Option 3</a></li>
                                <li><a href="#">Option 4</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}