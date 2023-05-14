import { Confectionery } from "../data/Confectionery";
import { Sort } from "./Sort"
import { useNavigate, useLocation, NavigateFunction } from 'react-router-dom';
import {OpenProductPage, locationVar, navigateVar} from "../pages/PagesFunc"

var currentType = 0


function SortProducts(currentData: Array<Confectionery>, indexOfSort: number) {
    currentType = indexOfSort
    AppendProducts(currentData, indexOfSort)
    return null
}

function DeleteProducts() {
    var productContent = document.getElementById("products-content")
    while (productContent?.lastElementChild) {
        productContent.removeChild(productContent.lastElementChild);
    }
}


function AppendProducts(currentData: Array<Confectionery>, indexOfSort: number) {
    var location: Location = locationVar
    var navigate: NavigateFunction = navigateVar

    DeleteProducts()
    currentData = Sort(currentData, indexOfSort)
    var cardClassName = "aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7"
    var productNameClassName = "mt-4 text-sm text-gray-700 h-10"
    var priceClassName = "mt-1 text-lg font-medium text-gray-900"
    var imgClassName = "h-full w-full object-cover object-center transition duration-300 ease-in-out hover:scale-110"
    var productContent = document.getElementById("products-content")
    currentData.forEach(product => {
        var btn = document.createElement("button")
        if (product.numberOfAvailableItems === 0) {
            var soldOut = document.createElement("span")
            soldOut.textContent = "Sold Out"
            soldOut.className = "sold-out-text bg-stone-600 absolute px-5 left-3 top-3 text-white flex justify-center border-1 rounded-full py-2"
            btn.appendChild(soldOut)
        }
        btn.className = "group relative"
        btn.onclick = () => OpenProductPage(product.name, navigate, location)
        var divElem = document.createElement("div")
        divElem.className = cardClassName
        var productImg = document.createElement("img")
        productImg.src = product.image
        if (product.numberOfAvailableItems === 0) {
            productImg.className = "h-full w-full"
        }
        else productImg.className = imgClassName
        var productName = document.createElement("h3")
        productName.className = productNameClassName
        productName.textContent = product.name
        var productPrice = document.createElement("p")
        productPrice.className = priceClassName
        productPrice.textContent = `$${product.price.toFixed(2)}`
        divElem.appendChild(productImg)
        btn.appendChild(divElem)
        btn.appendChild(productName)
        btn.appendChild(productPrice)
        productContent?.appendChild(btn)

    });
    return null
}


function ChangePrice(minPrice: number, maxPrice: number, currentData: Array<Confectionery>) {
    DeleteProducts()
    var arrOfNewData = []
    for (let index = 0; index < currentData.length; index++) {
        if (currentData[index].price >= minPrice && currentData[index].price <= maxPrice) {
            arrOfNewData.push(currentData[index])
        }
    }
    AppendProducts(arrOfNewData, currentType)
    return null
}


export { SortProducts, DeleteProducts, AppendProducts, ChangePrice, currentType }