import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ChangeEvent, useState } from "react"

import { arrOfAllTypesOfConfectioneries } from "../data/Data"
import { Confectionery } from "./Confectionery"
import { useNavigate } from "react-router"


var elems = ["text", "text2"]



function Searchbar() {
    const [isVisible, setVisible] = useState(false)
    const [searchValue, setSearchValue] = useState('');
    const [buttonClicked, setButtonClicked] = useState(false)
    const [menuInputHover, setMenuInputHover] = useState(false)


    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    }

    function handleClick() {
        setVisible(true)
        setButtonClicked(true)
        return null
    }

    function handleBlur() {
        if (!menuInputHover) {
            setVisible(false)
            setButtonClicked(false)
            turnOffGrayScreen()
        }
        return null
    }


    function openProductPage(element: Confectionery) {
        setVisible(false)
        setButtonClicked(false)
        turnOffGrayScreen()
        setMenuInputHover(false)
        var type = element.constructor.name.toLowerCase()
        var name = element.name.replaceAll(' ', '_').toLowerCase()
        navigate(`/${type}/${name}`)

    }

    function renderProudcts(arrOfProducts: Array<Confectionery>) {
        return (
            <div className="py-1">
                {
                    arrOfProducts.map((element) => (
                        <button
                            onClick={() => openProductPage(element)}
                            className="flex items-center w-full text-left py-1 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        >
                            <div className="img-container basis-2/12 flex justify-end px-3">
                                <div className="img overflow-hidden flex justify-center rounded-s bg-pink-100 items-center">
                                    <img className="object-cover object-center transition duration-300 ease-in-out hover:scale-110 h-15" src={element.image} alt="" />
                                </div>
                            </div>
                            <p>{element.name}</p>
                        </button>
                    ))
                }
            </div>
        )
    }


    function renderEmptyListOfProducts() {
        return (
            <div className="py-1">
                <p className="flex items-center w-full text-left py-1 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                >
                    No results
                </p>
            </div>
        )
    }


    function RenderMenu() {
        turnOnGrayScreen()
        var arrOfProducts = getArrOfProducts()
        return (
            <div
                id="input-menu"
                onMouseEnter={() => setMenuInputHover(true)}
                onMouseLeave={() => setMenuInputHover(false)}
                className="absolute max-h-96 overflow-auto mt-3 bg-white w-full drop-shadow-xl rounded-sm scrollbar border-2">
                {arrOfProducts.length != 0 ?
                    renderProudcts(arrOfProducts)
                    : renderEmptyListOfProducts()}
            </div>
        )
    }


    function getArrOfProducts() {
        var newData = arrOfAllTypesOfConfectioneries.filter((element) => element.name.toLowerCase().substring(0, searchValue.length) === searchValue.toLowerCase())
        return newData
    }


    function turnOnGrayScreen() {
        var grayScreen = document.getElementById("gray-screen")
        if (grayScreen) {
            grayScreen.style.display = "block"
        }
        return null
    }


    function turnOffGrayScreen() {
        var grayScreen = document.getElementById("gray-screen")
        if (grayScreen) {
            grayScreen.style.display = "contents"
        }
        return null
    }




    const navigate = useNavigate()
    return (
        <div className="searchbar flex items-center z-20 w-full">

            <div className="relative px-2 w-full">
                <FontAwesomeIcon className="text-black opacity-70 w-8 pr-2 " icon={faMagnifyingGlass} />
                <input
                    type="search"
                    onInput={handleInputChange}
                    onClick={handleClick}
                    onBlur={handleBlur}
                    className="bg-transparent border-none px-0 focus:ring-transparent text-black opacity-70 font-sans"
                    placeholder="Search our store"
                />
                {searchValue != '' && buttonClicked ? RenderMenu() : null}
                {searchValue == '' && buttonClicked ? turnOnGrayScreen() : null}
            </div>
        </div>
    )
}

export default Searchbar