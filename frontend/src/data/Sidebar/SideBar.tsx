import * as SideBarData from "./SidebarData"
import Dropdown from "./Dropdown"
import { FilterData, FilterType, StockType } from "./Filter"
import Slider from "./Slider"
import { Props } from "../DataTypes"
import * as Data from "../Data"
import { useEffect, useState } from "react"
import { Confectionery } from "../Confectionery"


function SideBar(products: Props, arrOfFilterTypes: Props, originalData: Array<Confectionery>) {


    const [productsInDropdowns, setProductsInDropdowns] = useState(products.data)
    const [leftVal, setLeftVal] = useState(0)
    const [rightVal, setRightVal] = useState(25)

    useEffect(() => {
        products.set(productsInDropdowns)
    }, [productsInDropdowns]);

    useEffect(() => {
        var newData = FilterData(originalData, arrOfFilterTypes, leftVal, rightVal)
        setProductsInDropdowns(newData)

    }, [arrOfFilterTypes.data])


    const arrOfDropdowns = [
        Dropdown("Brand", FilterType.Brand, { data: productsInDropdowns, set: setProductsInDropdowns }, arrOfFilterTypes),
        Dropdown("Country", FilterType.Country, { data: productsInDropdowns, set: setProductsInDropdowns }, arrOfFilterTypes),
        Dropdown("Quantity in the package", FilterType.Quantity, { data: productsInDropdowns, set: setProductsInDropdowns }, arrOfFilterTypes),
        Dropdown("Weigth", FilterType.Weigth, { data: productsInDropdowns, set: setProductsInDropdowns }, arrOfFilterTypes),
        Dropdown("Availability", FilterType.Availability, { data: productsInDropdowns, set: setProductsInDropdowns }, arrOfFilterTypes)
    ]

    return (
        <div className="sidebar basis-1/6 text-sm">
            {arrOfDropdowns[0]}
            {arrOfDropdowns[1]}
            {arrOfDropdowns[2]}
            {arrOfDropdowns[3]}
            {Slider(productsInDropdowns, setProductsInDropdowns, arrOfFilterTypes, originalData, { data: leftVal, set: setLeftVal }, { data: rightVal, set: setRightVal })}
            {arrOfDropdowns[4]}
        </div>
    )
}
export { SideBar, FilterType }