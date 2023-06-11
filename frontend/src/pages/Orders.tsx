import { useState } from "react"
import { Order } from "../data/Order"
import ApiRequest from "../data/API"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Arrow } from "../data/DataTypes";

function Orders() {
    const [arrOfOrders, setArrOfOrders] = useState(new Array<Order>);
    const arrOfTitles = ['Order ID', 'Date', 'Name', 'Total']

    ApiRequest({ data: arrOfOrders, set: setArrOfOrders }, "data")

    function convertDate(currentTimeStamp: number) {
        const currentDate = new Date(currentTimeStamp)
        const day: number = currentDate.getDate()
        const month: number = currentDate.getUTCMonth() + 1
        const year: number = currentDate.getFullYear()
        const hours: number = currentDate.getHours()
        const minutes: number = currentDate.getMinutes()
        const convertedDate = `${year}-${month < 10 ? "0" + month : month}-${day < 10 ? "0" + day : day} 
        ${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes}`;
        return convertedDate
    }

    function sort(func: (arrOfOrders: Array<Order>, j: number) => boolean, index: number) {
        const newArr: Array<Order> = []
        arrOfOrders.forEach(element => {
            newArr.push(element)
        })
        const len = newArr.length;
        for (let i = 0; i < len - 1; i++) {
            for (let j = 0; j < len - 1; j++) {
                if (func(newArr, j)) {
                    [newArr[j], newArr[j + 1]] = [newArr[j + 1], newArr[j]]
                }
            }
        }
        if (arrOfArrowValueAndReverseValue[index][1]) setArrOfOrders(newArr.reverse())
        else setArrOfOrders(newArr)
        changeArrowValueAndReverseValue(index)
    }

    function changeArrowValueAndReverseValue(index: number) {
        const newArr: Array<any> = []
        for (let indexOfOldArr = 0; indexOfOldArr < arrOfArrowValueAndReverseValue.length; indexOfOldArr++) {
            if (indexOfOldArr == index) {
                const reverseValue = !arrOfArrowValueAndReverseValue[index][1]
                var arrowValue: Arrow
                if (arrOfArrowValueAndReverseValue[index][0] === Arrow.Down) arrowValue = Arrow.Up
                else arrowValue = Arrow.Down
                newArr.push([arrowValue, reverseValue])
            }
            else newArr.push([Arrow.None, false])
        }
        setArrOfArrowValueAndReverseValue(newArr)
    }

    const [arrOfArrowValueAndReverseValue, setArrOfArrowValueAndReverseValue] = useState<Array<any>>(() => {
        var array: Array<any> = []
        for (let index = 0; index < arrOfTitles.length; index++) {
            var value = [Arrow.None, false]
            array.push(value)
        }
        return array;
    })

    const arrOfFunctions = [
        function byId(arrOfOrders: Array<Order>, j: number) {
            return arrOfOrders[j].id < arrOfOrders[j + 1].id
        },

        function byDate(arrOfOrders: Array<Order>, j: number) {
            return arrOfOrders[j].date < arrOfOrders[j + 1].date
        },

        function byFullName(arrOfOrders: Array<Order>, j: number) {
            const currentFullName = `${arrOfOrders[j].secondName} ${arrOfOrders[j].firstName}`
            const nextFullName = `${arrOfOrders[j + 1].secondName} ${arrOfOrders[j + 1].firstName}`
            return currentFullName < nextFullName
        },

        function byPrice(arrOfOrders: Array<Order>, j: number) {
            return arrOfOrders[j].price < arrOfOrders[j + 1].price
        }
    ]

    function TurnOnOrderInformationRender(index: number) {
        setOpen(true)
        setOrderIndex(index)
    }

    function renderOrderInformation() {
        const grayRow = "bg-gray-100"
        if (!arrOfOrders[orderIndex]) {
            return null
        }

        return (
            <div className="order absolute w-1/2 left-1/4 top-1/2 border-2 rounded-xl bg-white">
                <div className="flex justify-end w-full text-xl px-2.5 py-1">
                    <button className="" onClick={() => setOpen(false)}><FontAwesomeIcon icon={faXmark} /></button>
                </div>
                <div className="w-full flex font-bold border border-t-2 rounded-t-xl border-b-0">
                    <p className="text-start w-1/2 px-3 py-2">Label</p>
                    <p className="text-start w-1/2 px-3 py-2">Value</p>
                </div>
                <div className="w-full border-b-2 rounded-b-xl">
                    <div className={`flex ${grayRow}`}>
                        <p className={cellCSS}>ID</p>
                        <p className={cellCSS}>{arrOfOrders[orderIndex].id}</p>
                    </div>
                    <div className="flex">
                        <p className={cellCSS}>First name</p>
                        <p className={cellCSS}>{arrOfOrders[orderIndex].firstName}</p>
                    </div>
                    <div className={`flex ${grayRow}`}>
                        <p className={cellCSS}>Second name</p>
                        <p className={cellCSS}>{arrOfOrders[orderIndex].secondName}</p>
                    </div>
                    <div className="flex">
                        <p className={cellCSS}>Email</p>
                        <p className={cellCSS}>{arrOfOrders[orderIndex].email}</p>
                    </div>
                    <div className={`flex ${grayRow}`}>
                        <p className={cellCSS}>Phone number</p>
                        <p className={cellCSS}>{arrOfOrders[orderIndex].phoneNumber}</p>
                    </div>
                    <div className="flex">
                        <p className={cellCSS}>Date</p>
                        <p className={cellCSS}>{convertDate(arrOfOrders[orderIndex].date)}</p>
                    </div>
                    <div className={`flex ${grayRow}`}>
                        <p className={cellCSS}>Country</p>
                        <p className={cellCSS}>{arrOfOrders[orderIndex].country}</p>
                    </div>
                    <div className="flex">
                        <p className={cellCSS}>City</p>
                        <p className={cellCSS}>{arrOfOrders[orderIndex].city}</p>
                    </div>
                    <div className={`flex ${grayRow}`}>
                        <p className={cellCSS}>Adress</p>
                        <p className={cellCSS}>{arrOfOrders[orderIndex].adress}</p>
                    </div>
                    <div className="flex">
                        <p className={cellCSS}>Apartment</p>
                        <p className={cellCSS}>{arrOfOrders[orderIndex].apartment}</p>
                    </div>
                    <div className={`flex ${grayRow} rounded-b-xl`}>
                        <p className={cellCSS}>Postal code</p>
                        <p className={cellCSS}>{arrOfOrders[orderIndex].postalCode}</p>
                    </div>
                </div>
                <div className="w-full flex font-bold border border-t-2 rounded-t-xl border-b-0 mt-8">
                    <p className="text-start w-1/2 px-3 py-2">Item</p>
                    <p className="text-start w-1/2 px-3 py-2">Qunatity</p>
                </div>
                {arrOfOrders[orderIndex].items.map((element, index) => (
                    <div className={`flex w-full items-center ${index % 2 === 0 ? 'bg-gray-100' : ''} ${index === arrOfOrders[orderIndex].items.length - 1 ? 'rounded-b-xl' : ''}`} >
                        <p className={`w-1/2 px-3 py-2`}>{element.name}</p>
                        <p className={`w-1/2 px-3 py-2`}>{element.quantity}</p>
                    </div>
                ))}
            </div>
        );
    }

    const [isOpen, setOpen] = useState(false)
    const [orderIndex, setOrderIndex] = useState(0)
    const cellCSS = "text-start px-3 py-2 w-1/2"
    const css = ['1/12', '3/12', '3/12', '3/12', '2/12']

    return (
        <div className="orders-page py-20 relative container mx-auto">
            {isOpen ? renderOrderInformation() : null}
            <div className="table-head border-2 border-b-0 rounded-t-xl flex font-bold py-1">
                {arrOfTitles.map((element, index) => (
                    <div
                        className={`flex cursor-pointer w-${css[index]} ${index === 0 ? 'pl-3' : ''}`}
                        onClick={() => sort(arrOfFunctions[index], index)}>
                        <p className="pr-3">{element}</p>
                        {arrOfArrowValueAndReverseValue[index][0] === Arrow.Up ? <FontAwesomeIcon className="flex self-center" icon={faCaretUp} /> : null}
                        {arrOfArrowValueAndReverseValue[index][0] === Arrow.Down ? <FontAwesomeIcon className="flex self-center" icon={faCaretDown} /> : null}
                    </div>
                ))}
                <div className=""><button></button></div>
            </div>
            <div className="table-body border-2 rounded-b-xl">
                {arrOfOrders.map((element, index) => (
                    <div className={`flex w-full items-center ${index % 2 === 0 ? 'bg-gray-100' : ''} ${index === arrOfOrders.length - 1 ? 'rounded-b-xl' : ''}`} >
                        <p className={`w-${css[0]} px-3 `}>{element.id}</p>
                        <p className={`w-${css[1]} `}>{convertDate(element.date)}</p>
                        <p className={`w-${css[2]} `}>{`${element.secondName} ${element.firstName}`}</p>
                        <p className={`w-${css[3]} `}>${element.price}</p>
                        <p className={`cursor-pointer w-${css[4]} `}>
                            <button
                                className="bg-purple-400 rounded-md px-2 py-1 m-1 text-white hover:bg-purple-500"
                                onClick={() => TurnOnOrderInformationRender(index)}>view
                            </button>
                        </p>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default Orders;
