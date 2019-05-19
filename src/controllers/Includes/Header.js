import React from 'react';
import './Header.css'
import {Link} from "react-router-dom";

function Header() {
    return (
        <div>
            <nav>
                <ul>
                    <li><Link to="/groups/">Groups</Link></li>
                    <li><Link to="/teachers/">Teachers</Link></li>
                </ul>
            </nav>
        </div>
    );
}

export default Header;
