
import * as Confectionery from "./Confectionery";

function GetArrOfBrands(currentData: Array<Confectionery.Chocolate>) {
    return Array.from(new Set(currentData.map(item => item.brand)))
}

function GetArrOfPackageQuantities(currentData: Array<Confectionery.Chocolate>) {
    return Array.from(new Set(currentData.map(item => item.packageQuantity)))
}

function GetArrOfUniqueWeigthValues(currentData: Array<Confectionery.Chocolate>) {
    return Array.from(new Set(currentData.map(item => item.weight)))
}

function GetArrOfUniqueCountryNames(currentData: Array<Confectionery.Chocolate>) {
    return Array.from(new Set(currentData.map(item => item.country)))
}

function GetNumberOfAvaliableProducts(currentData: Array<Confectionery.Chocolate>) {
    var numOfAvaliableItems = 0
    currentData.forEach(element => {
        if (element.numberOfAvailableItems !== 0) {
            numOfAvaliableItems++
        }
    });
    return numOfAvaliableItems
}



export {GetArrOfBrands, GetArrOfUniqueWeigthValues, GetArrOfUniqueCountryNames, GetArrOfPackageQuantities, GetNumberOfAvaliableProducts}