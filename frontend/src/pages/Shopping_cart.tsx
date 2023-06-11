import Breadcrumbs from "../data/Breadcrumbs";
import Cookies from 'js-cookie';
import { useState } from "react";
import { arrOfChocolates, arrOfCookies, arrOfBuiscuits, arrOfCandies, arrOfCakes } from "../data/Data"
import { ConfectioneryType } from "../data/DataTypes";
import { Confectionery } from "../data/Confectionery";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faM, faMinus, faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { MathSign } from "../data/DataTypes"
import { useLocation, useNavigate } from 'react-router-dom';

var items: Array<Array<string>>

function Cart() {
    const location = useLocation()
    function GetAllValuesInCookies() {
        var items = []
        if (document.cookie !== "") {
            var cookies = document.cookie.split("; ")
            for (let index = 0; index < cookies.length; index++) {
                items.push(cookies[index].split("="))
            }
        }
        return items
    }

    function FindCurrentItem(name: string, arrOfProducts: Array<Confectionery>) {
        var formatedName = name.replaceAll("_", " ")
        for (let index = 0; index < arrOfProducts.length; index++) {
            if (arrOfProducts[index].name.toLowerCase() == formatedName) {
                return arrOfProducts[index]
            }
        }
        return arrOfProducts[0]
    }

    function GetArrOfProducts(type: string) {
        var arrOfProducts: Confectionery[] = []
        switch (type.charAt(0).toUpperCase() + type.slice(1)) {
            case ConfectioneryType.Chocolate:
                arrOfProducts = arrOfChocolates
                break
            case ConfectioneryType.Cookies:
                arrOfProducts = arrOfCookies
                break
            case ConfectioneryType.Biscuits:
                arrOfProducts = arrOfBuiscuits
                break
            case ConfectioneryType.Candies:
                arrOfProducts = arrOfCandies
                break
            case ConfectioneryType.Cakes:
                arrOfProducts = arrOfCakes
                break
        }
        return arrOfProducts
    }

    function MathOperation(product: Array<string>, value: number) {
        var quantityElem = document.getElementById(`${product[0]}_quantity`)
        if (quantityElem !== null) {
            var quantity = quantityElem?.textContent
            var newQuantity = Number(quantity) + value
            if(newQuantity > 0){
                quantityElem.textContent = newQuantity.toString()
                Cookies.set(product[0], `${product[1]}=${newQuantity}`)
                return newQuantity
            }
            else return quantity
        }
    }

    function ChangeTotalPrice(product: Array<string>, newQuantity: any, price: number) {
        var quantityElem = document.getElementById(`${product[0]}_total_price`)
        if (quantityElem !== null) {
            var newTotalPrice = newQuantity * price
            quantityElem.textContent = `$${newTotalPrice.toFixed(2)}`
        }
    }

    function ChangeQuantity(product: Array<string>, sign: MathSign, price: any) {
        var newQuantity
        switch (sign) {
            case MathSign.Plus:
                newQuantity = MathOperation(product, 1)
                break
            case MathSign.Minus:
                newQuantity = MathOperation(product, -1)
                break
        }
        ChangeTotalPrice(product, newQuantity, price)
        ChangeSubtotalPrice()
    }

    function GetIndexOfElement(name: string) {
        for (let index = 0; index < items.length; index++) {
            if (items[index][0] === name) return index
        }
        return -1
    }

    function RenderEmptyCart() {
        var pElem = document.createElement("p")
        pElem.textContent = "Your cart is currently empty."
        pElem.className = "text-black opacity-70  text-lg py-2"
        return (
            pElem
        )
    }

    function ChangeCartTable() {
        var cartTableElem = document.getElementById("cart-table")
        if (cartTableElem !== null) {
            cartTableElem.remove()
        }
        var cartElem = document.getElementById("cart")
        if (cartElem !== null) {
            var pElem = document.createElement("p")
            pElem.textContent = ""
            cartElem.appendChild(RenderEmptyCart())
        }
    }

    function DeleteProduct(product: Array<string>) {
        Cookies.remove(product[0])
        var row = document.getElementById(`${product[0]}_row`)
        var index = GetIndexOfElement(product[0])
        items.splice(index, 1);
        if (items.length === 0) ChangeCartTable()
        row?.remove()
        ChangeSubtotalPrice()
        var numOfProducts = document.getElementById("num-of-products")
        if (numOfProducts) {
            var prevNum = Number(numOfProducts.textContent)
            numOfProducts.textContent = `${prevNum - 1}`
        }
    }

    function ChangeSubtotalPrice() {
        var container = document.getElementById("sub-total-container")
        var subtotal = document.getElementById("subtotal-price")
        subtotal?.remove()
        var subTotalPrice = CalculateSubtotalPrice()
        subtotal = document.createElement("p")
        var pElemCSS = "text-black opacity-70 text-3xl font-semibold text-end py-3"
        subtotal.id = "subtotal-price"
        subtotal.className = pElemCSS
        subtotal.textContent = `Subtotal: $${subTotalPrice.toFixed(2)}`
        container?.appendChild(subtotal)
    }

    function RenderSubtotalPrice() {
        var subTotalPrice = CalculateForTheFirstTime()
        var pElemCSS = "text-black opacity-70 text-3xl font-semibold text-end py-3"
        return (
            <div id="sub-total-container">
                <p
                    id="subtotal-price"
                    className={pElemCSS}>Subtotal: ${subTotalPrice.toFixed(2)}</p>
            </div>
        )
    }

    function CalculateForTheFirstTime() {
        var subTotalPrice = 0
        for (let index = 0; index < items.length; index++) {
            var arrOfProducts = GetArrOfProducts(items[index][1])
            var product = FindCurrentItem(items[index][0], arrOfProducts)
            subTotalPrice += Number(items[index][2]) * product.price
        }
        return subTotalPrice
    }

    function CalculateSubtotalPrice() {
        var subTotalPrice = 0
        for (let index = 0; index < items.length; index++) {
            var priceElem = document.getElementById(`${items[index][0]}_total_price`)
            if (priceElem !== null) {
                var currentElemPrice = Number(priceElem.textContent?.substring(1))
                subTotalPrice += currentElemPrice
            }
        }
        return subTotalPrice
    }


    function GoToProduct(product: Array<string>) {
        navigate(`/${product[1]}/${product[0]}`)
    }

    function RenderOneProduct(product: Array<string>) {
        var arrOfProducts = GetArrOfProducts(product[1])
        var currentItem = FindCurrentItem(product[0], arrOfProducts)
        var totalPrice = Number(product[2]) * Number(currentItem?.price)
        var iconCSS = "border-2 rounded-full px-2 py-2 cursor-pointer"
        return (
            <div id={`${product[0]}_row`} className="flex py-6 border-b-2 text-lg border-stone-100 items-center">
                <div className="left-side basis-7/12 flex items-center">
                    <div
                        onClick={() => GoToProduct(product)}
                        className="img cursor-pointer basis-2/12 overflow-hidden rounded-lg bg-pink-100 ">
                        <img className="h-full w-full object-cover object-center transition duration-300 ease-in-out hover:scale-110" src={currentItem?.image} alt="" />
                    </div>
                    <p className="px-4 text-balck opacity-70">{currentItem?.name}</p>
                </div>
                <div className="right-side flex items-center basis-5/12 ">
                    <p className="basis-1/3 text-start text-black opacity-70" >${currentItem?.price.toFixed(2)}</p>
                    <div className="quantity basis-1/3 opacity-70 gap-2 text-center">
                        <div className="top flex items-center opacity-70 justify-center gap-3">
                            <FontAwesomeIcon
                                className={iconCSS}
                                onClick={() => ChangeQuantity(product, MathSign.Minus, currentItem?.price)}
                                icon={faMinus} />
                            <p className="" id={`${product[0]}_quantity`}>{product[2]}</p>
                            <FontAwesomeIcon
                                onClick={() => ChangeQuantity(product, MathSign.Plus, currentItem?.price)}
                                className={iconCSS}
                                icon={faPlus}
                            />
                        </div>
                        <div className="bottom flex items-center justify-center gap-1 text-sm ">
                            <FontAwesomeIcon
                                className="cursor-pointer"
                                onClick={() => DeleteProduct(product)}
                                icon={faXmark} />
                            <p
                                onClick={() => DeleteProduct(product)}
                                className="cursor-pointer">Remove</p>
                        </div>

                    </div>
                    <p className="basis-1/3 text-end text-black opacity-70" id={`${product[0]}_total_price`}>${totalPrice.toFixed(2)}</p>
                </div>
            </div>
        )
    }

    function RenderCart() {

        return (
            <div className="cart" id="cart-table">
                <div className="products-titles flex border-y-2 py-3 text-balck opacity-70 border-stone-100">
                    <div className="left-side basis-7/12">
                        <p>Product</p>
                    </div>
                    <div className="right-side basis-5/12 flex">
                        <div className="price basis-1/3 text-start">
                            <p>Price</p>
                        </div>
                        <div className="quantitty basis-1/3 text-center">
                            <p>Quantity</p>
                        </div>
                        <div className="total basis-1/3 text-end">
                            <p>Total</p>
                        </div>
                    </div>
                </div>
                <div className="products-content">
                    {items.map((product) => (
                        <div>
                            {RenderOneProduct(product)}
                        </div>
                    ))}
                </div>
                <RenderSubtotalPrice />
                <div className="btn-container flex justify-end">
                    <button
                        onClick={() => navigate("/checkout")}
                        className="basis-4/12 btn bg-purple-400 mt-6 hover:bg-purple-500 transition duration-300 rounded-xl text-2xl py-3 my-2 text-white px-40">Check Out</button>
                </div>
            </div>
        )
    }


    items = GetAllValuesInCookies()
    var navigate = useNavigate()
    return (
        <div className="container mx-auto xl:px-10" id="cart">
            <Breadcrumbs location={location} />
            <p className="text-4xl uppercase font-semibold text-purple-400 py-2">
                Shopping cart
            </p>
            {items.length > 0 ? RenderCart() :
                <p className="text-black opacity-70 text-lg py-2">Your cart is currently empty.</p>}
        </div>
    );
}

export default Cart;