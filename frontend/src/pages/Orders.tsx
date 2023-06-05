import { useState } from "react"
import { Order } from "../data/Order"
import ApiRequest from "../data/API"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { Arrow } from "../data/DataTypes";

function Orders() {
    const [arrOfOrders, setArrOfOrders] = useState(new Array<Order>);
    const arrOfTitles = ['Order ID', 'Date', 'Customer', 'Total']

    ApiRequest({ dataProp: arrOfOrders, onDataChange: setArrOfOrders }, "data")

    function convertDate(currentTimeStamp: number) {
        const currentDate = new Date(currentTimeStamp)
        const day: number = currentDate.getDate()
        const month: number = currentDate.getUTCMonth() + 1
        const year: number = currentDate.getFullYear()
        const convertedDate = `${day < 10 ? "0" + day : day}.${month < 10 ? "0" + month : month}.${year}`;
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
            const currentFullName = `${arrOfOrders[j].sescondName} ${arrOfOrders[j].firstName}`
            const nextFullName = `${arrOfOrders[j + 1].sescondName} ${arrOfOrders[j + 1].firstName}`
            return currentFullName < nextFullName
        },

        function byPrice(arrOfOrders: Array<Order>, j: number) {
            return arrOfOrders[j].price < arrOfOrders[j + 1].price
        }
    ]

    const bodyRowCSS = "w-1/6 text-start border-2"
    const headRowCSS = `${bodyRowCSS} cursor-pointer`

    return (
        <div className="orders-page py-20">
            <table className="container mx-auto w-full">
                <tr className="">
                    {arrOfTitles.map((element, index) => (
                        <th className={headRowCSS} onClick={() => sort(arrOfFunctions[index], index)}>
                            <div className="flex items-center">
                                <p className="pr-3">{element}</p>
                                {arrOfArrowValueAndReverseValue[index][0] === Arrow.Up ? <FontAwesomeIcon icon={faCaretUp} /> : null}
                                {arrOfArrowValueAndReverseValue[index][0] === Arrow.Down ? <FontAwesomeIcon icon={faCaretDown} /> : null}
                            </div>
                        </th>
                    ))}
                    <th className={headRowCSS}><button></button></th>
                </tr>
                {arrOfOrders.map((element, index) => (
                    <tr>
                        <td className={`${`${bodyRowCSS} ${index % 2 === 0 ? 'bg-gray-100' : ''}`} ${index % 2 === 0 ? 'bg-gray-100' : ''}`}>{element.id}</td>
                        <td className={`${bodyRowCSS} ${index % 2 === 0 ? 'bg-gray-100' : ''}`}>{convertDate(element.date)}</td>
                        <td className={`${bodyRowCSS} ${index % 2 === 0 ? 'bg-gray-100' : ''}`}>{`${element.sescondName} ${element.firstName}`}</td>
                        <td className={`${bodyRowCSS} ${index % 2 === 0 ? 'bg-gray-100' : ''}`}>{element.price}</td>
                        <td className={`${bodyRowCSS} ${index % 2 === 0 ? 'bg-gray-100' : ''}`}><button>view</button></td>
                    </tr>
                ))}
            </table>
        </div>
    );
}

export default Orders;
