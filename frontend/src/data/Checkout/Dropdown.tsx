import { useState } from "react"
import countries from "./Countries"


interface DropdownProps {
    label: string
    css: string
}


function Dropdown({ label, css }: DropdownProps) {

    const [isOpen, setIsOpen] = useState(false)

    const handleToggle = () => {
        setIsOpen(!isOpen)
    }

    function handleCountryChange(item: String) {
        setCountry(String(item))
        setIsOpen(!isOpen)
    }

    function RenderMenu() {
        return (
            <div className="absolute h-96 overflow-auto bg-white w-full drop-shadow-xl rounded-xl scrollbar border-2 px-3">
                <div className="py-1">
                    {countries.map((countryElem) => (
                        <button
                            className="flex items-center w-full text-left py-1 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                            onClick={() => { handleCountryChange(countryElem.name) }}>
                            <p>{countryElem.name}</p>
                        </button>
                    ))}
                </div>
            </div>
        )
    }


    const [country, setCountry] = useState(label);
    return (
        <div className="relative">
            <button
                type="button"
                className={`${css} items-center`}
                onClick={handleToggle}
            >
                <div className="dropdown text-s">
                    <p className="flex mb-[-6px]">Country</p>
                    <p id="countryName" className="flex">{country}</p>
                </div>
                <span className="flex items-center justify-center ml-auto">
                    <svg
                        className={`h-5 transform ${isOpen ? 'rotate-180' : 'rotate-0'} transition-transform duration-300`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path
                            className="stroke-current"
                            d="M7 10l5 5 5-5"
                            transform="translate(-2,-2)"
                        />
                    </svg>
                </span>
            </button>
            {isOpen ? RenderMenu() : null}
        </div>
    )
}

export { Dropdown }