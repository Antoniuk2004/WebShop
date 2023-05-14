import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faMagnifyingGlass, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from "react-router-dom";

function Header() {
    const navigate = useNavigate();
    return (
        <header className="px-2 py-3 bg-purple-400 text-white text-2xl">
            <div className="header-contant container mx-auto grid grid-cols-3">
                <div className="left-side flex items-center px-3">
                    <FontAwesomeIcon className="text-black opacity-70" icon={faMagnifyingGlass} />
                    <input
                        type="search"
                        className=" bg-transparent border-none focus:ring-transparent text-black opacity-70 font-sans"
                        placeholder="Search our store" />
                </div>
                <div className="middle flex items-center justify-center">
                    <p className="logo ">Wolrd Of Sweets</p>
                </div>
                <div className="right-side flex items-center justify-end px-3 gap-3">
                    <FontAwesomeIcon
                        onClick={() => navigate("/profile")}
                        className="text-black opacity-70 cursor-pointer  hover:text-white transition duration-100 ease-in"
                        icon={faUser} />
                    <FontAwesomeIcon
                        onClick={() => navigate("/cart")}
                        className="text-black opacity-70 cursor-pointer hover:text-white transition duration-100 ease-in"
                        icon={faShoppingCart} />
                </div>
            </div>
        </header>
    );
}

export default Header;