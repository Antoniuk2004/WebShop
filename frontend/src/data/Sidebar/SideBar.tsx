import Dropdown from "./Dropdown"
import { FilterData, FilterType, StockType } from "./Filter"
import Slider from "./Slider"
import { Props } from "../DataTypes"
import { useEffect, useState } from "react"
import { Confectionery } from "../Confectionery"
import { findMaxPrice, findMinPrice } from "./FindValues"


function SideBar(products: Props, arrOfFilterTypes: Props, originalData: Array<Confectionery>) {
    const [productsInDropdowns, setProductsInDropdowns] = useState(products.data)
    const [leftVal, setLeftVal] = useState(findMinPrice(originalData))
    const [rightVal, setRightVal] = useState(findMaxPrice(originalData))    

    useEffect(() => {
        products.set(productsInDropdowns)
    }, [productsInDropdowns])

    useEffect(() => {
        var newData = FilterData(originalData, arrOfFilterTypes, leftVal, rightVal)
        setProductsInDropdowns(newData)
    }, [arrOfFilterTypes.data])


    return (
        <div className="sidebar basis-1/6 text-sm">
            {Dropdown("Brand", FilterType.Brand, { data: productsInDropdowns, set: setProductsInDropdowns }, arrOfFilterTypes)}
            {Dropdown("Country", FilterType.Country, { data: productsInDropdowns, set: setProductsInDropdowns }, arrOfFilterTypes)}
            {Dropdown("Quantity in the package", FilterType.Quantity, { data: productsInDropdowns, set: setProductsInDropdowns }, arrOfFilterTypes)}
            {Dropdown("Weigth", FilterType.Weigth, { data: productsInDropdowns, set: setProductsInDropdowns }, arrOfFilterTypes)}
            {Slider(productsInDropdowns, setProductsInDropdowns, arrOfFilterTypes, originalData, { data: leftVal, set: setLeftVal }, { data: rightVal, set: setRightVal })}
            {Dropdown("Availability", FilterType.Availability, { data: productsInDropdowns, set: setProductsInDropdowns }, arrOfFilterTypes)}
        </div>
    )
}
export { SideBar, FilterType }