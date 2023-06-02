import Cookies from "js-cookie"
import { Dropdown } from "../data/Checkout/Dropdown"
import { ChangeEvent, useState } from "react"
import { Order, Item } from "../data/Order"
import axios from 'axios';

interface OrderData {
    id: number;
    customer: string;
}

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

        var order = new Order(firstName, secondName, Number(phoneNumber), adress, apartment, city, Number(postalCode), email, countryName, items)

        console.log(checkIfCorrectlyInput())

        var isCorrect = checkIfCorrectlyInput()
        if (isCorrect) {
            // sendDataToServer(order)

            // cleanCookies()
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
                console.log(data);
            })
            .catch(error => {
                console.error(error);
            });
    }


    function getArrOfCookies(){
        var arrOfCookieElements = document.cookie.split("; ")
        var arrOfFormatedCookies:Array<Array<string>> = []
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


    function renderProducts(){
        var arrOfFormatedCookies = getArrOfCookies()
        return(
            <div>
                {arrOfFormatedCookies.map((element) => (
                    <p>{element[0]}</p>
                ))}
            </div>
        )
    }


    return (
        <div className="checkout container mx-auto py-5">
            <div className="flex gap-5">
                <div className="left-side grid grid-cols-1 gap-y-5 basis-1/2">
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
                <div className="right-side basis-1/2">
                    {renderProducts()}
                    <div className="btn-container flex justify-end w-full">
                        <button
                            onClick={ConfirmOrder}
                            className="btn bg-purple-400 mt-6 hover:bg-purple-500 transition duration-300 rounded-xl text-2xl py-3 my-2 text-white px-40"
                        >Confirm</button>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default Checkout