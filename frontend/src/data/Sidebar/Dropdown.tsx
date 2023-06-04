import { useState } from "react"
import { Confectionery } from "../Confectionery"

interface DropdownItem {
    label: any
    check?: boolean
    onClick: (checkbox: boolean) => void
}


interface DropdownProps {
    label?: string
    number?: number
    items?: DropdownItem[]
}

var checkVar: boolean

function Dropdown({ label, number, items }: DropdownProps) {

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
        if (items) {
            for (let index = 0; index < items.length; index++) {
                input.push({ id: index, label: `${items[index].label}`, checked: false })
            }
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
                                    if (items) items[index].onClick(checkbox.checked)
                                }
                            }>
                            <input
                                type="checkbox"
                                className="form-checkbox h-4 w-4 text-purple-500 ring-0 focus:ring-0 focus:ring-offset-0 rounded-sm mr-2"
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
            {isOpen ? NormalMenu() : null}
        </div>
    )
}

export { Dropdown, checkVar }
export type { DropdownItem }