import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";

var aClassName = "border-b-2 border-transparent hover:text-gray-800 dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6";
function Navbar() {
    return (
        <nav className="navbar bg-white shadow dark:bg-gray-800">
            <ul className="list-none list-inside container flex items-center justify-center p-6 mx-auto text-gray-600 capitalize dark:text-gray-300">
                <li className={aClassName}><Link to="/">home</Link></li>
                <li className={aClassName}><Link to="/chocolate">chocolate</Link></li>
                <li className={aClassName}><Link to="/cookies">cookies</Link></li>
                <li className={aClassName}><Link to="/biscuits">biscuits</Link></li>
                <li className={aClassName}><Link to="/candies">candies</Link></li>
                <li className={aClassName}><Link to="/cakes">cakes</Link></li>
            </ul>
        </nav>





    );
}

export default Navbar;