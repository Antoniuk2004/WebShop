import { Confectionery } from "../Confectionery"
import { FilterType, Props, StockType } from "../DataTypes"

class Filter {
    type: FilterType
    name: string

    constructor(type: FilterType, name: string) {
        this.type = type
        this.name = name
    }

}



var typeOfFirst: FilterType

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
            if (dataValue === StockType.In) {
                newData = products.filter((element) => element.numberOfAvailableItems !== 0)
            }
            else {
                newData = products.filter((element) => element.numberOfAvailableItems === 0)
            }
            break
    }
    return newData
}

function FilterData(products: Array<Confectionery>, arrOfFilterTypes: Props) {
    arrOfFilterTypes.data.forEach((element: any, index: number) => {
        products = UseOneFilter(products, element[0], element[1])
    })
    return products
}

export { FilterData, Filter, FilterType, StockType }
