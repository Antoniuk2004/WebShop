import * as SideBarData from "./SidebarData"
import * as Dropdown from "./Dropdown"
import { Filter, FilterData, FilterType, FilterPros, StockType } from "./Filter"
import { Confectionery } from "../Confectionery"
import Slider from "./Slider"
import { useState } from "react"
import { Props } from "../DataTypes"



function SideBar({ dataProp, onDataChange }: Props) {
    var arrOfFilters: Array<Filter> = []
    var arrOfBrands = SideBarData.GetArrOfBrands(dataProp)
    var arrOfCountries = SideBarData.GetArrOfUniqueCountryNames(dataProp)
    var arrOfPackageQuantities = SideBarData.GetArrOfPackageQuantities(dataProp)
    var arrOfWeigthValues = SideBarData.GetArrOfUniqueWeigthValues(dataProp)
    var numberOfAvailableProducts = SideBarData.GetNumberOfAvaliableProducts(dataProp)

    var tempData: Array<Confectionery> = dataProp

    function stockFunc(dataValue: any, type: FilterType) {
        FilterData({dataProp, onDataChange, dataValue, type})
        return null
    }


    function MakeArrayOfItems(arrOfLabels: any, filterType: FilterType) {
        const arrOfItems: Dropdown.DropdownItem[] = []
        arrOfLabels.forEach((element: Dropdown.DropdownItem) => {
            arrOfItems.push({ label: `${element}`, onClick: () => stockFunc(element, filterType) })
        })
        return arrOfItems
    }


    return (
        <div className="sidebar basis-1/6 text-sm">
            <Dropdown.Dropdown
                label="Brand"
                number={arrOfBrands.length}
                items={MakeArrayOfItems(arrOfBrands, FilterType.Brand)}
            />
            <Dropdown.Dropdown
                label="Country"
                number={arrOfCountries.length}
                items={MakeArrayOfItems(arrOfCountries, FilterType.Country)}
            />
            <Dropdown.Dropdown
                label="Quantity in the package"
                number={arrOfPackageQuantities.length}
                items={MakeArrayOfItems(arrOfPackageQuantities, FilterType.Quantity)}
            />
            <Dropdown.Dropdown
                label="Weigth"
                number={arrOfWeigthValues.length}
                items={MakeArrayOfItems(arrOfWeigthValues, FilterType.Weigth)}
            />
            <Slider dataProp={dataProp} onDataChange={onDataChange} />

            <Dropdown.Dropdown
                label="Availability"
                number={2}
                items={[
                    { label: "In Stock", onClick: () => stockFunc(StockType.In, FilterType.Availability) },
                    { label: "Out of Stock", onClick: () => stockFunc(StockType.Out, FilterType.Availability) }
                ]}
            />
        </div>
    )
}
export { SideBar, FilterType }