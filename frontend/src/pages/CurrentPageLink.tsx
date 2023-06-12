import { WrongPage } from "./WrongPage";
import Breadcrumbs from "../data/Breadcrumbs";
import { arrOfChocolates, arrOfCookies, arrOfBuiscuits, arrOfCandies, arrOfCakes } from "../data/Data"
import { Confectionery } from "../data/Confectionery"
import { ConfectioneryType } from "../data/DataTypes"
import { NavigateFunction, useLocation, useNavigate } from 'react-router-dom';
import GetData from "../data/Desctiption";
import Navbar from "../Navbar";
import Cookies from 'js-cookie';

function CurrentPageLink() {
    function GetArrOfProductsOrMatchBoolean(value: string): { arrayOfProducts: Array<Confectionery>, matched: boolean } {
        var arrayOfProducts: Array<Confectionery> = []
        var matched = false
        switch (value.toLowerCase()) {
            case ConfectioneryType.Chocolate.toLocaleLowerCase():
                arrayOfProducts = arrOfChocolates
                matched = true
                break
            case ConfectioneryType.Cookies.toLocaleLowerCase():
                arrayOfProducts = arrOfCookies
                matched = true
                break
            case ConfectioneryType.Biscuits.toLocaleLowerCase():
                arrayOfProducts = arrOfBuiscuits
                matched = true
                break
            case ConfectioneryType.Candies.toLocaleLowerCase():
                arrayOfProducts = arrOfCandies
                matched = true
                break
            case ConfectioneryType.Cakes.toLocaleLowerCase():
                arrayOfProducts = arrOfCakes
                matched = true
                break
            case "shopping_cart": 
                matched = true 
                break
            case "checkout": 
                matched = true
                break
            case "orders":
                matched = true
                break
        }
        if (value === "") matched = true
        return { arrayOfProducts, matched }
    }

    function FormatIngredientsList(path: string) {
        var list: string = GetData(path).toLowerCase()
        list = list.replace(list.charAt(0), list.charAt(0).toUpperCase())
        return list
    }

    function FormatText(text: string) {
        var firstLetter = text[0]
        if (text !== null) {
            firstLetter = firstLetter.toUpperCase()
            return text.replace(text[0], firstLetter)
        }
        else return "NULL"
    }

    function GetCharacteristics(product: Confectionery) {
        navigate = useNavigate()
        var titleClassName = "text-black opacity-75 text-lg font-sans font-light"
        var elemClassName = titleClassName + " text-purple-500"
        return (
            <table className="w-full table-auto py-2">
                <tbody>
                    <tr>
                        <td className={titleClassName}>Type</td>
                        <a className={elemClassName}>{FormatText(typeOfProduct)}</a>
                    </tr>
                    <tr>
                        <td className={titleClassName}>Brand</td>
                        <a className={elemClassName}>{product.brand}</a>
                    </tr>
                    <tr>
                        <td className={titleClassName}>Country</td>
                        <a className={elemClassName}>{product.country}</a>
                    </tr>
                    <tr>
                        <td className={titleClassName}>Quantity in the package</td>
                        <a className={elemClassName}>{product.packageQuantity}</a>
                    </tr>
                    <tr>
                        <td className={titleClassName}>Weigth</td>
                        <a className={elemClassName}>{product.weight} g</a>
                    </tr>
                </tbody>
            </table>
        )
    }

    function UpdateNumberOfProductsInCart() {
        var numOfProducts = document.getElementById("num-of-products")
        if (numOfProducts) {
            var prevNum = Number(numOfProducts.textContent)
            numOfProducts.textContent = `${prevNum + 1}`
        }
        const btn = document.getElementById('btn') as HTMLButtonElement | null;
        if(btn){
            btn.textContent = "In your cart"
            btn.addEventListener('click', () => navigate("/shopping_cart"))
        }
    }

    function MakeButton(product: Confectionery, productName: String) {
        var arrOfCookies = document.cookie.split("; ")
        var buttonCSS = "btn bg-purple-400 hover:bg-purple-500 w-full transition duration-300 rounded-xl text-2xl py-3 my-2 text-white"
        for (let i = 0; i < arrOfCookies.length; i++) {
            var element = arrOfCookies[i].split("=")
            if (element[0] === productName) {
                return (
                    <button
                        id="btn"
                        onClick={() => navigate("/shopping_cart")}
                        className={buttonCSS}>In your cart</button>
                )
            }
        }

        if (product.numberOfAvailableItems !== 0) {
            return (
                <button
                    id="btn"
                    onClick={() => {
                        Cookies.set(productName, `${typeOfProduct}=1`)
                        UpdateNumberOfProductsInCart()
                    }
                    }
                    className={buttonCSS}>Add to Cart</button>
            )
        }
        else {
            return (
                <button id="btn" disabled className={`${buttonCSS} opacity-75`}>Sold Out</button>
            )
        }
    }

    function RenderProductPage(product: Confectionery, productName: String) {
        return (
            <div className="web-page">
                <Navbar />
                <div className="container mx-auto xl:px-10">
                    <Breadcrumbs location={location} />
                    <div className="Item product flex grid-cols-2 gap-x-10 py-10">
                        <div className="left-side basis-7/12 px-20 ">
                            <div className="image-contaiter bg-pink-100 rounded-3xl">
                                <img className="product-image h-full w-full object-cover object-center transition duration-300 ease-in-out hover:scale-110" src={product.image} alt="" />
                            </div>
                        </div>
                        <div className="right-side basis-5/12 px-5">
                            <h1 className="product-title text-purple-400 text-4xl font-bold py-2">{product.name}</h1>
                            <p className="product-price text-gray-500 text-3xl py-2">${product.price.toFixed(2)}</p>
                            <p className="py-3 text-2xl text-black opacity-75 ">Description</p>
                            <p className="list-of-ingredients text-black opacity-75 text-lg font-sans font-light py-2 text-justify">{GetData(product.description)}</p>
                            <p className="py-3 text-2xl text-black opacity-75 ">Ingredients</p>
                            <p className="list-of-ingredients text-black opacity-75 text-lg font-sans font-light py-2 text-justify">{FormatIngredientsList(product.ingredients)}</p>
                            <p className="py-3 text-2xl text-black opacity-75 ">Characteristics</p>
                            <div className="product-properties py-2 flex">
                                {GetCharacteristics(product)}
                            </div>
                            {MakeButton(product, productName)}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const location = useLocation();
    const currentPageLink = location.pathname;

    var lastIndex = currentPageLink.lastIndexOf('/')
    var productName = currentPageLink.substring(lastIndex + 1)
    var firstIndex = currentPageLink.lastIndexOf('/', 1,)
    var typeOfProduct = currentPageLink.substring(firstIndex + 1, lastIndex)
    var navigate: NavigateFunction

    const { arrayOfProducts }: any = GetArrOfProductsOrMatchBoolean(typeOfProduct)
    const { matched } = GetArrOfProductsOrMatchBoolean(productName)

    for (let index = 0; index < arrayOfProducts.length; index++) {
        var formatedName = arrayOfProducts[index].name.toLocaleLowerCase().replaceAll(" ", "_")
        if (formatedName === productName) return RenderProductPage(arrayOfProducts[index], productName)
    }

    if (!matched) return (<WrongPage />)
    else return null
}

export default CurrentPageLink;