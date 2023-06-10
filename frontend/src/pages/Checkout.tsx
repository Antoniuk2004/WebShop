import Cookies from "js-cookie"
import { Dropdown } from "../data/Checkout/Dropdown"
import { ChangeEvent, useState } from "react"
import { Order, Item } from "../data/Order"
import { arrOfChocolates, arrOfCookies, arrOfBuiscuits, arrOfCandies, arrOfCakes } from "../data/Data"
import { ConfectioneryType } from "../data/DataTypes"
import { Confectionery } from "../data/Confectionery"
import { Navigate, useNavigate } from "react-router"
import ApiRequest from "../data/API"

function Checkout() {
    var correctInputCSS = "input h-[52px] flex justify-between w-full rounded-lg border border-neutral-500 px-3 text-black text-opacity-70 rounded-lg w-full text-black text-opacity-70 border-2 focus:outline-none focus:ring-0 focus:border-purple-400"

    const [firstName, setFirstName] = useState("")
    const [secondName, setSecondName] = useState("")
    const [adress, setAdress] = useState("")
    const [apartment, setApartment] = useState("")
    const [city, setCity] = useState("")
    const [postalCode, setPostalCode] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [email, setEmail] = useState("")

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        switch (name) {
            case 'firstName':
                setFirstName(value)
                break
            case 'secondName':
                setSecondName(value)
                break
            case 'adress':
                setAdress(value)
                break
            case 'apartment':
                setApartment(value)
                break
            case 'city':
                setCity(value)
                break
            case 'postalCode':
                setPostalCode(value)
                break
            case 'phoneNumber':
                setPhoneNumber(value)
                break
            case 'email':
                setEmail(value)
                break
        }
    }

    function ConfirmOrder() {
        var countryElement = document.getElementById("countryName")
        var countryName = ""
        if (countryElement) {
            countryName = String(countryElement.textContent)
        }
        var items: Array<Item> = []
        var arrOfCookieElements = document.cookie.split("; ")
        arrOfCookieElements.forEach(element => {
            var cookieElement = element.split("=")
            var item: Item = {
                name: cookieElement[0],
                type: cookieElement[1],
                quantity: Number(cookieElement[2])
            }
            items.push(item)
        })
        var id = numOfOrders + 1
        
        const date = Date.now()
        var order = new Order(id, date, totalPrice, firstName, secondName, Number(phoneNumber), adress, apartment, city, Number(postalCode), email, countryName, items)


        var isCorrect = checkIfCorrectlyInput()
        if (isCorrect) {
            sendDataToServer(order)
            navigate("/")
            cleanCookies()
            alert("Your order is confirmed")
        }
    }

    function changeBorderColor(name: string) {
        var inputElement = document.getElementsByName(name)[0]
        inputElement.style.borderColor = "red";
    }

    function handleClick(name: string) {
        var inputElement = document.getElementsByName(name)[0]
        inputElement.style.borderColor = ""
    }

    function checkIfCorrectlyInput() {
        var isCorrect = true
        if (Number.isNaN(Number(phoneNumber)) || phoneNumber == "") {
            changeBorderColor("phoneNumber")
            isCorrect = false
        }
        if (Number.isNaN(Number(postalCode)) || postalCode == "") {
            changeBorderColor("postalCode")
            isCorrect = false
        }
        if (email == "") {
            changeBorderColor("email")
            isCorrect = false
        }
        if (firstName == "") {
            changeBorderColor("firstName")
            isCorrect = false
        }
        if (secondName == "") {
            changeBorderColor("secondName")
            isCorrect = false
        }
        if (adress == "") {
            changeBorderColor("adress")
            isCorrect = false
        }
        if (apartment == "") {
            changeBorderColor("apartment")
            isCorrect = false
        }
        if (city == "") {
            changeBorderColor("city")
            isCorrect = false
        }
        return isCorrect
    }


    function sendDataToServer(data: any) {
        fetch('http://localhost:8800/api/data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.text())
            .then(data => {

            })
            .catch(error => {
                console.error(error);
            });
    }


    function getArrOfCookies() {
        var arrOfCookieElements = document.cookie.split("; ")
        var arrOfFormatedCookies: Array<Array<string>> = []
        arrOfCookieElements.forEach(element => {
            arrOfFormatedCookies.push(element.split("="))
        })
        return arrOfFormatedCookies
    }


    function cleanCookies() {
        var arrOfFormatedCookies = getArrOfCookies()
        arrOfFormatedCookies.forEach(element => {
            Cookies.remove(element[0])
        });
    }


    function renderProducts() {

        return (
            <div className="list-of-products">
                {arrOfConfectioneries.map((element, index) => (
                    <div className="left-side flex pb-2">
                        <div className="img-container basis-2/12 relative flex justify-end">
                            <p id="num-of-products" className="absolute mr-[-5px] mt-[-5px] text-xs text-black rounded-xl px-[5px] bg-purple-400">
                                {Number(arrOfFormatedCookies[index][2])}
                            </p>
                            <div className="img overflow-hidden flex justify-center rounded-xl bg-pink-100 h-20 w-20 items-center">
                                <img className="object-cover object-center transition duration-300 ease-in-out hover:scale-110 h-16" src={element.image} alt="" />
                            </div>
                        </div>
                        <p className="product-name basis-8/12 px-3 py-2 text-balck opacity-70">{element.name}</p>
                        <div className="price flex items-center basis-2/12 justify-end px-3">
                            <p className="text-balck opacity-70">${arrOfPrices[index].toFixed(2)}</p>
                        </div>
                    </div>
                ))}
                <div className="total-price text-black text-opacity-70 grid grid-cols-2 py-3">
                    <div className="flex justify-start px-3">
                        Total
                    </div>
                    <div className="flex justify-end px-3">
                        ${totalPrice.toFixed(2)}
                    </div>
                </div>
            </div>
        )
    }


    function getSum(arrOfPrices: Array<number>) {
        var sum: number = 0
        arrOfPrices.forEach(element => {
            sum += element
        });
        return sum
    }


    function getArrOfPrices(arrOfFormatedCookies: Array<Array<string>>, arrOfConfectioneries: Array<Confectionery>) {
        var arrOfPrices: Array<number> = []
        arrOfFormatedCookies.map((element, index) => (
            arrOfPrices.push(Number(element[2]) * arrOfConfectioneries[index].price)
        ))
        return arrOfPrices
    }


    function getArrOfConfectionry(typeOfProduct: string) {
        switch (typeOfProduct) {
            case (ConfectioneryType.Chocolate.toLowerCase()):
                return arrOfChocolates
            case (ConfectioneryType.Biscuits.toLowerCase()):
                return arrOfBuiscuits
            case (ConfectioneryType.Cakes.toLowerCase()):
                return arrOfCakes
            case (ConfectioneryType.Candies.toLowerCase()):
                return arrOfCandies
            default:
                return arrOfCookies
        }
    }


    function capitalizeFirstLetters(name: string) {
        var words: Array<String> = []
        name.split('_').forEach(element => {
            words.push(element.charAt(0).toUpperCase() + element.slice(1))
        });
        return words.join(' ')
    }


    function getArrOfarrOfarrOfConfectioneriesOfDifferentTypes(arrOfFormatedCookies: Array<Array<string>>) {
        var arrOfarrOfConfectioneries: Array<any> = []
        arrOfFormatedCookies.forEach(element => {
            var arrOfConfectionry = getArrOfConfectionry(element[1])
            var nameOfProduct = capitalizeFirstLetters(element[0])
            let confectionry = arrOfConfectionry.find(elem => elem.name.toLowerCase() === nameOfProduct.toLowerCase());
            if (confectionry) arrOfarrOfConfectioneries.push(confectionry)
        });
        return arrOfarrOfConfectioneries
    }


    const [numOfOrders, setNumOfOrders] = useState(0);

    ApiRequest({ data: numOfOrders, set: setNumOfOrders }, "numberOfOrders")


    var arrOfFormatedCookies = getArrOfCookies()
    var arrOfConfectioneries: Array<Confectionery> = getArrOfarrOfarrOfConfectioneriesOfDifferentTypes(arrOfFormatedCookies)
    var arrOfPrices = getArrOfPrices(arrOfFormatedCookies, arrOfConfectioneries)
    const totalPrice: number = Number(getSum(arrOfPrices).toFixed(2))
    var navigate = useNavigate()
    return (
        <div className="checkout container mx-auto py-5">

            <div className="flex gap-5">
                <div className="left-side grid grid-cols-1 gap-y-5 basis-8/12">
                    <div className="contact">
                        <p className="font-bold pb-1">Contact</p>
                        <input className={correctInputCSS} name="email" placeholder="Email" type="text" onChange={handleChange} onClick={() => handleClick("email")} value={email} />
                    </div>
                    <div className="shipping">
                        <p className="font-bold pb-1">Shipping address</p>
                        <Dropdown
                            css={correctInputCSS}
                            label={"Ukraine"}
                        />
                    </div>
                    <div className="row flex gap-5">
                        <input className={correctInputCSS} name="firstName" placeholder="First name" type="text" onChange={handleChange} onClick={() => handleClick("firstName")} value={firstName} />
                        <input className={correctInputCSS} name="secondName" placeholder="Second name" type="text" onChange={handleChange} onClick={() => handleClick("secondName")} value={secondName} />
                    </div>
                    <input className={correctInputCSS} name="adress" placeholder="Adress" type="text" onChange={handleChange} onClick={() => handleClick("adress")} value={adress} />
                    <input className={correctInputCSS} name="apartment" placeholder="Apartment, suite, etc" type="text" onChange={handleChange} onClick={() => handleClick("apartment")} value={apartment} />
                    <div className="row flex gap-5">
                        <input className={correctInputCSS} name="city" placeholder="City" type="text" onChange={handleChange} onClick={() => handleClick("city")} value={city} />
                        <input className={correctInputCSS} name="postalCode" placeholder="Postal code" type="text" onChange={handleChange} onClick={() => handleClick("postalCode")} value={postalCode} />
                    </div>
                    <input className={correctInputCSS} name="phoneNumber" placeholder="Phone" type="text" onChange={handleChange} onClick={() => handleClick("phoneNumber")} value={phoneNumber} />
                </div>
                <div className="right-side basis-4/12">
                    {renderProducts()}
                    <div className="btn-container flex justify-end w-full">
                        <button
                            onClick={ConfirmOrder}
                            className="btn bg-purple-400 mt-6 hover:bg-purple-500 transition duration-300 rounded-xl text-2xl py-3 my-2 text-white w-1/3"
                        >Confirm</button>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default Checkout

function calculatePrice(arrOfPrices: any) {

    return 0
}
