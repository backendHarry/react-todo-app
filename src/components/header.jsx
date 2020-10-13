import React from 'react';
import './header.css';
import {NavLink, Link} from 'react-router-dom';

const Header = () => {
    return (
        <div className="header">
            <Link to='/'><h1>my <small>logo</small></h1></Link>
            <div className="header__options">
                <div className="login-confirm"><NavLink exact to='/login' activeClassName="selected">log in</NavLink></div>
                <div className="login-confirm"><NavLink exact to='/signup' activeClassName="selected">create an account</NavLink></div>
            </div>
        </div>
    );
}
 
export default Header;