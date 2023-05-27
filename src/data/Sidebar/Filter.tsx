import { Confectionery } from "../Confectionery"
import { DeleteProducts, AppendProducts, currentType } from "../Products"
import {FilterType, StockType} from "../Enums"

class Filter {
    type: FilterType
    name: string

    constructor(type: FilterType, name: string) {
        this.type = type
        this.name = name
    }

}



var typeOfFirst: FilterType

function SwitchElems(data: Array<Confectionery>, dataValue: any, type: FilterType) {
    var newData: Array<Confectionery> = []
    switch (type) {
        case FilterType.Brand:
            newData = data.filter((element) => element.brand === dataValue)
            break
        case FilterType.Country:
            newData = data.filter((element) => element.country === dataValue)
            break
        case FilterType.Quantity:
            newData = data.filter((element) => element.packageQuantity === dataValue)
            break
        case FilterType.Weigth:
            var newData = data.filter((element) => element.weight === dataValue)
            break
        case FilterType.Availability:
            if (dataValue === StockType.In) {
                newData = data.filter((element) => element.numberOfAvailableItems !== 0)
            }
            else {
                newData = data.filter((element) => element.numberOfAvailableItems === 0)
            }
            break
    }
    return newData
}

function FilterData(data: Array<Confectionery>, dataValue: any, type: FilterType, first: boolean) {
    var newData: Array<Confectionery> = []
    if (first) {
        typeOfFirst = type
        newData = SwitchElems(data, dataValue, type)
    }
    else {
        newData = SwitchElems(data, dataValue, type)
    }


    DeleteProducts()
    AppendProducts(newData, currentType)
    return newData
}

function RefreshProductsGrid(data: Array<Confectionery>) {
    DeleteProducts()
    AppendProducts(data, currentType)
}

export { RefreshProductsGrid, FilterData, Filter, FilterType, StockType }