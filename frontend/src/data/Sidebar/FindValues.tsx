import { Confectionery } from "../Confectionery"

function findMaxPrice(originalData: Array<Confectionery>) {
    var maxPrice = 0
    originalData.forEach(element => {
        if (element.price > maxPrice) maxPrice = element.price
    })
    return maxPrice
}

function findMinPrice(originalData: Array<Confectionery>){
    var minPrice = Number.MAX_SAFE_INTEGER
    originalData.forEach(element => {
        if (element.price < minPrice) minPrice = element.price
    })
    return minPrice
}

export {findMaxPrice, findMinPrice}