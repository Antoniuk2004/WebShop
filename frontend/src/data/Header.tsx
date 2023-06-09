import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faMagnifyingGlass, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import Searchbar from './Searchbar';

function Header() {
    const navigate = useNavigate()
    var number = 0
    if (document.cookie !== "") {
        number = document.cookie.split(";").length
    }
    return (
        <div>
            <header id="header" className="px-2 py-3 bg-white text-purple-400 text-2xl">
                <div className="header-contant container mx-auto flex">
                    <div className="left-side flex items-center px-3 basis-1/3">
                        <Searchbar />
                    </div>
                    <div className="middle flex items-center justify-center basis-1/3">
                        <p className="logo cursor-pointer" onClick={() => navigate("/")}>World Of Sweets</p>
                    </div>
                    <div className="right-side flex items-center justify-end px-3 gap-3 basis-1/3">
                        <FontAwesomeIcon
                            onClick={() => navigate('/profile')}
                            className="text-black opacity-70 cursor-pointer hover:text-white transition duration-100 ease-in"
                            icon={faUser}
                        />
                        <div className="flex justify-end relative">
                            <FontAwesomeIcon
                                onClick={() => navigate('/shopping_cart')}
                                className="text-black opacity-70 cursor-pointer rounded-md p-1 hover:bg-slate-400 transition duration-100 ease-in"
                                icon={faShoppingCart}
                            />
                            <p id="num-of-products" className="absolute mt-[-4px] mr-[-4px] text-xs text-black rounded-xl px-[5px] bg-purple-400">
                                {number}
                            </p>
                        </div>
                    </div>
                </div>

            </header>
            <div id="gray-screen" className="fixed z-10 h-full w-full  bg-black opacity-25 contents"></div>
        </div>

    );
}

export default Header;
