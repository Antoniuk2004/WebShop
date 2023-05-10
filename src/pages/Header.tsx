import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faUser, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { BrowserRouter, Route, Link } from "react-router-dom";

function Header() {
    return (
        <div className="header-content">
            <div className = "header-content-left">
                <FontAwesomeIcon icon={faMagnifyingGlass}></FontAwesomeIcon>
            </div>

            <div className="header-content-center">World Of Sweets</div>

            <div className="header-content-right">
            <FontAwesomeIcon icon={faUser} />
            <FontAwesomeIcon icon={faCartShopping} />
            </div>            
        </div>
    );
}

export default Header;