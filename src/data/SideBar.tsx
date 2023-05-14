import { valHooks } from "jquery"
import * as SideBarData from "../data/SidebarData"
import * as Dropdown from "./Dropdown"
import { Filter, FilterData, FilterType, RefreshProductsGrid, StockType } from "./Filter"
import {Confectionery} from "./Confectionery"



function SideBar(currentData: any) {
    var arrOfFilters: Array<Filter> = []
    var arrOfBrands = SideBarData.GetArrOfBrands(currentData)
    var arrOfCountries = SideBarData.GetArrOfUniqueCountryNames(currentData)
    var arrOfPackageQuantities = SideBarData.GetArrOfPackageQuantities(currentData)
    var arrOfWeigthValues = SideBarData.GetArrOfUniqueWeigthValues(currentData)
    var numberOfAvailableProducts = SideBarData.GetNumberOfAvaliableProducts(currentData)

    var tempData: Array<Confectionery> = []

    function testFunc(element: any, filterType: FilterType) {
        if (!Dropdown.checkVar) {
            arrOfFilters.push(new Filter(filterType, element))
        }
        else {
            var index: number = arrOfFilters.indexOf(new Filter(filterType, element))
            arrOfFilters.splice(index, 1)
            if(arrOfFilters.length === 0) RefreshProductsGrid(currentData)
        }


        if(arrOfFilters.length === 1){
            tempData = FilterData(currentData, element, filterType, true)
        }
        else if (arrOfFilters.length > 1) { 
            tempData = FilterData(tempData, element, filterType, false)
        }
    }

    function MakeArrayOfItems(arrOfLabels: any, filterType: FilterType) {
        const arrOfItems: Dropdown.DropdownItem[] = []
        arrOfLabels.forEach((element: Dropdown.DropdownItem) => {
            arrOfItems.push({ label: `${element}`, onClick: () => testFunc(element, filterType) })
        })
        return arrOfItems
    }



    return (
        <div className="sidebar basis-1/6 text-sm">
            <Dropdown.Dropdown
                label="Brand"
                number={arrOfBrands.length}
                items={MakeArrayOfItems(arrOfBrands, FilterType.Brand)}
                type={Dropdown.Type.normal}
            />
            <Dropdown.Dropdown
                label="Country"
                number={arrOfCountries.length}
                items={MakeArrayOfItems(arrOfCountries, FilterType.Country)}
                type={Dropdown.Type.normal}
            />
            <Dropdown.Dropdown
                label="Quantity in the package"
                number={arrOfPackageQuantities.length}
                items={MakeArrayOfItems(arrOfPackageQuantities, FilterType.Quantity)}
                type={Dropdown.Type.normal}
            />
            <Dropdown.Dropdown
                label="Weigth"
                number={arrOfWeigthValues.length}
                items={MakeArrayOfItems(arrOfWeigthValues, FilterType.Weigth)}
                type={Dropdown.Type.normal}
            />

            <Dropdown.Dropdown
                label="Price"
                number={0}
                items={[
                    { label: null, onClick: () => null },
                ]}
                type={Dropdown.Type.price}
            />
            <Dropdown.Dropdown
                label="Availability"
                number={2}
                items={[
                    { label: "In StockType", onClick: () => testFunc(StockType.In, FilterType.Availability) },
                    { label: "Out of StockType", onClick: () => testFunc(StockType.Out, FilterType.Availability) }
                ]}
                type={Dropdown.Type.normal}
            />
        </div>
    )
}
export { SideBar, FilterType }