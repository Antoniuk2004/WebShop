import { useState } from "react"
import Slider from "./Slider"


interface DropdownItem {
    label: any
    check?: boolean
    onClick: () => void
}


interface DropdownProps {
    label: string
    number: number
    type: Type
    items: DropdownItem[]
}


enum Type {
    normal,
    price
}


var checkVar: boolean


function Dropdown({ label, number, items, type }: DropdownProps) {

    const [isOpen, setIsOpen] = useState(true)

    const handleToggle = () => {
        setIsOpen(!isOpen)
    }

    function handleCheckboxChange(id: number) {
        setCheckboxes(prevCheckboxes =>
            prevCheckboxes.map((checkbox, index) =>
                index === id ? { ...checkbox, checked: !checkbox.checked } : checkbox
            )
        );

    }

    const [checkboxes, setCheckboxes] = useState(() => {
        const input = [
            { id: 0, label: "Checkbox 1", checked: false },
            { id: 1, label: "Checkbox 2", checked: false },
        ];
        input.length = 0
        for (let index = 0; index < items.length; index++) {
            input.push({ id: index, label: `${items[index].label}`, checked: false })
        }

        return input.map(item => ({
            id: item.id,
            label: item.label,
            checked: item.checked
        }));
    });

    function NormalMenu() {
        return (
            <div className="">
                <div className="py-1">
                    {checkboxes.map((checkbox, index) => (
                        <button
                            className="flex items-center w-full text-left py-1 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                            key={checkbox.id} onClick={
                                () => {
                                    checkVar = checkbox.checked
                                    handleCheckboxChange(checkbox.id)
                                    items[index].onClick()
                                }
                            }>
                            <input
                                type="checkbox"
                                className="form-checkbox h-4 w-4 text-blue-500 rounded-sm mr-2"
                                onChange={() => null}
                                checked={checkbox.checked}
                            />
                            <label>{checkbox.label}</label>
                        </button>
                    ))}
                </div>
            </div>
        )
    }
    
    return (
        <div className="">
            <button
                type="button"
                className="py-2 flex justify-between w-full"
                onClick={handleToggle}
            >
                <span>{`${label} \0`}</span>
                {number != 0 ? <span className="opacity-60">{number}</span> : null}
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
            {isOpen && (
                type === Type.normal ? NormalMenu() : <Slider />
            )}
        </div>
    )
}

export { Dropdown, Type, checkVar }
export type { DropdownItem }