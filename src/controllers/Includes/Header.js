import React from 'react';
import {Link} from "react-router-dom";

function Header() {
    var links = () => {
        return (
            <div >
                <li><Link to="/groups/"><b style={{color: "#324051"}}>Групи</b></Link></li>
                <li><Link to="/teachers/"><b style={{color: "#324051"}}>Викладачі</b></Link></li>
                <li><Link to="/subjects/"><b style={{color: "#324051"}}>Предмети</b></Link></li>
            </div>
        )
    };
    return (
        <header>
            <nav className={'indigo lighten-5'}>
                <div className="nav-wrapper ">
                    <Link to={'/'}>
                        <div style={{marginLeft: '10px'}} className="brand-logo"><img src='/LOGO.svg' width='56'/></div>
                    </Link>
                    <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i
                        className="material-icons">menu</i>
                    </a>
                    <ul className="right hide-on-med-and-down">
                        {links()}
                    </ul>
                </div>
            </nav>
            <ul className="sidenav" id="mobile-demo">
                {links()}
            </ul>
        </header>
    );
}

export default Header;
