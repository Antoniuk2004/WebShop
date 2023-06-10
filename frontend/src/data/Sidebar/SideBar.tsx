import * as SideBarData from "./SidebarData"
import Dropdown from "./Dropdown"
import { FilterData, FilterType, StockType } from "./Filter"
import Slider from "./Slider"
import { Props } from "../DataTypes"
import * as Data from "../Data"
import { useEffect, useState } from "react"
import { Confectionery } from "../Confectionery"


function SideBar(products: Props, arrOfFilterTypes: Props, originalData:Array<Confectionery>) {
    

    const [productsInDropdowns, setProductsInDropdowns] = useState(products.data)

    // function doFilter(dataValue: any, type: FilterType) {
    //     var newArrOfFilterTypes: Array<any> = arrOfFilterTypes.data
    //     if (Dropdown.checkVar) {
    //         newArrOfFilterTypes.push([dataValue, type])
    //         arrOfFilterTypes.set(newArrOfFilterTypes)
    //         var newData = FilterData(products.data, arrOfFilterTypes)
    //         products.set(newData)
    //     }
    //     else {
    //         newArrOfFilterTypes = removeElement(newArrOfFilterTypes, dataValue)
    //         var newData = FilterData(originalData, arrOfFilterTypes)
    //         products.set(newData)
    //     }
    //     return null
    // }

    useEffect(() => { 
        products.set(productsInDropdowns)
    }, [productsInDropdowns]);


    





    function removeElement(newArrOfFilterTypes: Array<any>, dataValue: any) {
        newArrOfFilterTypes.forEach((element, index) => {
            if (element[0] === dataValue) {
                newArrOfFilterTypes.splice(index, 1)
                // return newArrOfFilterTypes
            }
        })
        return newArrOfFilterTypes
    }

    const arrOfDropdowns = [
        Dropdown("Brand", FilterType.Brand, { data: productsInDropdowns, set: setProductsInDropdowns }, arrOfFilterTypes),
        Dropdown("Country", FilterType.Country, { data: productsInDropdowns, set: setProductsInDropdowns }, arrOfFilterTypes),
        Dropdown("Quantity in the package", FilterType.Quantity, { data: productsInDropdowns, set: setProductsInDropdowns }, arrOfFilterTypes),
        Dropdown("Weigth", FilterType.Weigth, { data: productsInDropdowns, set: setProductsInDropdowns }, arrOfFilterTypes),
        Dropdown("Availability", FilterType.Availability, { data: productsInDropdowns, set: setProductsInDropdowns }, arrOfFilterTypes)
    ]

    return (
        // <div>
        //     {productsInDropdowns.map((element: any) => (
        //         <p>{element.name}</p>
        //     ))}
        //     <Slider data={originalData} set={setProductsInDropdowns} />
        // </div>
        <div className="sidebar basis-1/6 text-sm">
            {arrOfDropdowns[0]}
            {arrOfDropdowns[1]}
            {arrOfDropdowns[2]}
            {arrOfDropdowns[3]}
            {Slider(productsInDropdowns , setProductsInDropdowns, arrOfFilterTypes, originalData)}
            {arrOfDropdowns[4]}
        </div>
    )
}
export { SideBar, FilterType }