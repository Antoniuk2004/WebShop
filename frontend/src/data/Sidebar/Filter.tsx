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

interface FilterPros {
    dataProp: Array<Confectionery>
    onDataChange: (data: Array<Confectionery>) => void
    dataValue: any 
    type: FilterType
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

function FilterData({dataProp, onDataChange, dataValue, type}: FilterPros) {
    var newData: Array<Confectionery> = []
    newData = SwitchElems(dataProp, dataValue, type)
    onDataChange(newData)
    return null
}

function RefreshProductsGrid({ dataProp, onDataChange }: FilterPros) {
    // SwitchElems(dataProp, filterType)
}

export { RefreshProductsGrid, FilterData, Filter, FilterType, StockType }
export type { FilterPros }
