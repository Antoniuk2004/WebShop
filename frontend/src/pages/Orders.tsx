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
        if (!arrOfOrders[orderIndex]) {
            return null
        }

        return (
            <div className="order absolute bg-gray-100 w-1/2 left-1/4 top-1/2 px-2 py-1 border-2 rounded-xl">
                <div className="flex justify-end w-full text-xl">
                    <button className="" onClick={() => setOpen(false)}><FontAwesomeIcon icon={faXmark} /></button>
                </div>
                <table className="w-full">
                    <tr>
                        <td className={cellCSS}>ID</td>
                        <td className={cellCSS}>{arrOfOrders[orderIndex].id}</td>
                    </tr>
                    <tr>
                        <td className={cellCSS}>First name</td>
                        <td className={cellCSS}>{arrOfOrders[orderIndex].firstName}</td>
                    </tr>
                    <tr>
                        <td className={cellCSS}>Second name</td>
                        <td className={cellCSS}>{arrOfOrders[orderIndex].secondName}</td>
                    </tr>
                    <tr>
                        <td className={cellCSS}>Email</td>
                        <td className={cellCSS}>{arrOfOrders[orderIndex].email}</td>
                    </tr>
                    <tr>
                        <td className={cellCSS}>Phone number</td>
                        <td className={cellCSS}>{arrOfOrders[orderIndex].phoneNumber}</td>
                    </tr>
                    <tr>
                        <td className={cellCSS}>Apartment</td>
                        <td className={cellCSS}>{arrOfOrders[orderIndex].date}</td>
                    </tr>
                    <tr>
                        <td className={cellCSS}>Country</td>
                        <td className={cellCSS}>{arrOfOrders[orderIndex].country}</td>
                    </tr>
                    <tr>
                        <td className={cellCSS}>City</td>
                        <td className={cellCSS}>{arrOfOrders[orderIndex].city}</td>
                    </tr>
                    <tr>
                        <td className={cellCSS}>Adress</td>
                        <td className={cellCSS}>{arrOfOrders[orderIndex].adress}</td>
                    </tr>
                    <tr>
                        <td className={cellCSS}>Apartment</td>
                        <td className={cellCSS}>{arrOfOrders[orderIndex].apartment}</td>
                    </tr>
                    <tr>
                        <td className={cellCSS}>Postal code</td>
                        <td className={cellCSS}>{arrOfOrders[orderIndex].postalCode}</td>
                    </tr>
                </table>
                <table className="w-full">
                    <tr>
                        <th className="text-start w-1/2 px-1">Item</th>
                        <th className="text-start w-1/2 px-1">Qunatity</th>
                    </tr>
                    {arrOfOrders[orderIndex].items.map((element) => (
                        <tr>
                            <td className={cellCSS}>{element.name}</td>
                            <td className={cellCSS}>{element.quantity}</td>
                        </tr>
                    ))}

                </table>
            </div>
        );
    }

    const [isOpen, setOpen] = useState(false)
    const [orderIndex, setOrderIndex] = useState(0)
    const cellCSS = "text-start px-1 py-1 w-1/2"
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
                    <div className={`flex items-center ${index % 2 === 0 ? 'bg-gray-100' : ''}`} >
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
