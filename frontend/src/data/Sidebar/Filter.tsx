import { Confectionery } from "../Confectionery"
import { FilterType, Props, StockType } from "../DataTypes"




function UseOneFilter(products: Array<Confectionery>, dataValue: any, type: FilterType) {
    var newData: Array<Confectionery> = []
    switch (type) {
        case FilterType.Brand:
            newData = products.filter((element) => element.brand === dataValue)
            break
        case FilterType.Country:
            newData = products.filter((element) => element.country === dataValue)
            break
        case FilterType.Quantity:
            newData = products.filter((element) => element.packageQuantity === dataValue)
            break
        case FilterType.Weigth:
            var newData = products.filter((element) => element.weight === dataValue)
            break
        case FilterType.Availability:
            console.log(dataValue)
            if (dataValue === "In Stock") {
                newData = products.filter((element) => element.numberOfAvailableItems !== 0)
            }
            else {
                newData = products.filter((element) => element.numberOfAvailableItems === 0)
            }
            break
    }
    return newData
}


function usePriceFilter(oldData: Array<Confectionery>, leftVal: number, rightVal: number){
    const arrOfNewData = [];
    for (let index = 0; index < oldData.length; index++) {
        if (
            oldData[index].price >= leftVal &&
            oldData[index].price <= rightVal
        ) {
            arrOfNewData.push(oldData[index]);
        }
    }
    return arrOfNewData
}


function FilterData(products: Array<Confectionery>, arrOfFilterTypes: Props, leftVal: number, rightVal:number) {
    arrOfFilterTypes.data.forEach((element: any, index: number) => {
        products = UseOneFilter(products, element[0], element[1])
    })
    return usePriceFilter(products, leftVal, rightVal)
}

export { FilterData, FilterType, StockType, usePriceFilter }

