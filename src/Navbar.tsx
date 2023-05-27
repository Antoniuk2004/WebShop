import React from "react";
import { BrowserRouter, Route, Link, useNavigate } from "react-router-dom";

var elemCSS = "elem hover:bg-purple-400 transition duration-100 ease-in px-7 py-5 cursor-pointer uppercase";
function Navbar() {
    const navigate = useNavigate();
    return (
        <nav className="navbar bg-gray-100">
            <ul className="list-none list-inside container flex items-center justify-center mx-auto font-medium text-lg opacity-70">
                <li className={elemCSS} onClick={() => navigate("/")}>home</li>
                <li className={elemCSS} onClick={() => navigate("/chocolate")}>chocolate</li>
                <li className={elemCSS} onClick={() => navigate("/cookies")}>cookies</li>
                <li className={elemCSS} onClick={() => navigate("/biscuits")}>biscuits</li>
                <li className={elemCSS} onClick={() => navigate("/candies")}>candies</li>
                <li className={elemCSS} onClick={() => navigate("/cakes")}>cakes</li>
            </ul>
        </nav>
    );
}

export default Navbar;