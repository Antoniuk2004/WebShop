import { useEffect, useState } from "react";
import { Confectionery } from "../Confectionery";
import { FilterType, Props } from "../DataTypes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";

function Dropdown(label: string, filterType: FilterType, products: Props, arrOfFilterTypes: Props) {
    const [isOpen, setIsOpen] = useState(true);
    const [arrOfLabels, setArrOfLabels] = useState(new Array);

    const navigate = useNavigate()

    const handleToggle = () => {
        setIsOpen(!isOpen);
    }

    useEffect(() => {
        let mapOfFilterTypes = new Map<string | number, number>();
        var arrofLabelsToInput: (string | number | boolean)[][] = new Array
        switch (filterType) {
            case FilterType.Brand:
                arrofLabelsToInput = getArrOfLabelsWithBrands(mapOfFilterTypes)
                break;
            case FilterType.Country:
                arrofLabelsToInput = getArrOfLabelsWithCountries(mapOfFilterTypes)
                break;
            case FilterType.Quantity:
                arrofLabelsToInput = getArrOfLabelsWithQuantities(mapOfFilterTypes)
                break;
            case FilterType.Weigth:
                arrofLabelsToInput = getArrOfLabelsWithWeights(mapOfFilterTypes)
                break;
            case FilterType.Availability:
                arrofLabelsToInput = getArrOfLabelsWithAvailabilities(mapOfFilterTypes)
                break;
        }
        arrofLabelsToInput = addFiltersToMap(arrofLabelsToInput)
        setArrOfLabels(sortArrOfLabels(arrofLabelsToInput))
    }, [products.data, filterType])

    function getArrOfLabelsWithBrands(mapOfFilterTypes: Map<string | number, number>) {
        products.data.forEach((element: Confectionery) => {
            var num = mapOfFilterTypes.get(element.brand)
            if (num !== undefined) {
                mapOfFilterTypes.set(element.brand, num += 1)
            }
            else {
                mapOfFilterTypes.set(element.brand, 1)
            }
        })
        return mergeArrays(mapOfFilterTypes)
    }

    function getArrOfLabelsWithCountries(mapOfFilterTypes: Map<string | number, number>) {
        products.data.forEach((element: Confectionery, index: number) => {
            var num = mapOfFilterTypes.get(element.country)
            if (num !== undefined) {
                mapOfFilterTypes.set(element.country, num += 1)
            }
            else {
                mapOfFilterTypes.set(element.country, 1)
            }
        })
        return mergeArrays(mapOfFilterTypes)
    }

    function getArrOfLabelsWithWeights(mapOfFilterTypes: Map<string | number, number>) {
        products.data.forEach((element: Confectionery, index: number) => {
            var num = mapOfFilterTypes.get(element.weight)
            if (num !== undefined) {
                mapOfFilterTypes.set(element.weight, num += 1)
            }
            else {
                mapOfFilterTypes.set(element.weight, 1)
            }
        })
        return mergeArrays(mapOfFilterTypes)
    }

    function getArrOfLabelsWithQuantities(mapOfFilterTypes: Map<string | number, number>) {
        products.data.forEach((element: Confectionery, index: number) => {
            var num = mapOfFilterTypes.get(element.packageQuantity)
            if (num !== undefined) {
                mapOfFilterTypes.set(element.packageQuantity, num += 1)
            }
            else {
                mapOfFilterTypes.set(element.packageQuantity, 1)
            }
        })
        return mergeArrays(mapOfFilterTypes)
    }

    function addFiltersToMap(arrofLabelsToInput: (string | number | boolean)[][]) {
        arrOfFilterTypes.data.forEach((element: Array<any>) => {
            if (filterType === element[1]) {
                const index = findIndex(arrofLabelsToInput, element[0])
                try {
                    arrofLabelsToInput[index][2] = true
                } catch (error) {
                    navigate(`/`)
                }
            }
        })
        return arrofLabelsToInput
    }

    function getArrOfLabelsWithAvailabilities(mapOfFilterTypes: Map<string | number, number>) {
        mapOfFilterTypes.set("In Stock", 0)
        mapOfFilterTypes.set("Out of Stock", 0)
        products.data.forEach((element: Confectionery) => {
            if (element.numberOfAvailableItems === 0) {
                var num = mapOfFilterTypes.get("Out of Stock")
                if (num !== undefined) mapOfFilterTypes.set("Out of Stock", num + 1)
            }
            else {
                var num = mapOfFilterTypes.get("In Stock")
                if (num !== undefined) mapOfFilterTypes.set("In Stock", num + 1)
            }
        })
        var num = mapOfFilterTypes.get("Out of Stock")
        if (num === 0) mapOfFilterTypes.delete("Out of Stock")
        num = mapOfFilterTypes.get("In Stock")
        if (num === 0) mapOfFilterTypes.delete("In Stock")
        return mergeArrays(mapOfFilterTypes)
    }

    function findIndex(arrofLabelsToInput: (string | number | boolean)[][], label: string) {
        var indexOfLabel = -1
        arrofLabelsToInput.forEach((element, index) => {
            if (element[0] === label) indexOfLabel = index
        })
        return indexOfLabel
    }

    useEffect(() => {
        if (arrOfFilterTypes.data.length > 0) {
            changeCheckboxValue(true)
        }
    }, [arrOfFilterTypes.data])

    function changeCheckboxValue(value: boolean) {
        var oldArrOfLables = arrOfLabels
        var newArrOfLables: Array<Array<any>> = []
        arrOfFilterTypes.data.forEach((element: Array<any>) => {
            if (filterType === element[1]) {
                const index = findIndex(oldArrOfLables, element[0])
                oldArrOfLables[index][2] = value
            }
        })
        oldArrOfLables.forEach((element) => (
            newArrOfLables.push(element)
        ))
        setArrOfLabels(newArrOfLables)
    }

    function sortArrOfLabels(arr: (string | number | boolean)[][]) {
        for (let i = 0; i < arr.length - 1; i++) {
            for (let j = 0; j < arr.length - 1; j++) {
                if (arr[j][0] > arr[j + 1][0]) {
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                }
            }
        }
        return arr
    }

    function mergeArrays(mapOfFilterTypes: Map<string | number | boolean, number>) {
        var keys = Array.from(mapOfFilterTypes.keys())
        var values = Array.from(mapOfFilterTypes.values())
        var arr = keys.map((item, index) => ([item, values[index], false]));
        return arr
    }

    function changeArrOfFilterTypes(newFilterValue: string | number, index: number) {
        var currentData = arrOfFilterTypes.data
        var newData = []
        if (!checkIfContains(currentData, newFilterValue)) {
            currentData.forEach((element: string | number) => {
                newData.push(element)
            })
            newData.push([newFilterValue, filterType, index])
        }
        else {
            changeCheckboxValue(false)
            currentData.forEach((element: Array<any>) => {
                if (element[0] !== newFilterValue)
                    newData.push(element)
            })
        }
        arrOfFilterTypes.set(newData)
    }

    function checkIfContains(currentData: Array<any>, newFilterValue: string | number) {
        var contains = false
        currentData.forEach(element => {
            if (element[0] === newFilterValue) contains = true
        })
        return contains
    }

    function renderMenu() {
        return (
            <div className="menu-of-filter-labes">
                {arrOfLabels.map((element, index) => (
                    <button
                        className="flex gap-x-2 items-center w-full text-left py-1 text-sm text-gray-700 
                        hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
                        onClick={() => changeArrOfFilterTypes(element[0], index)}
                    >
                        <input
                            type="checkbox"
                            className="form-checkbox cursor-pointer h-4 w-4 text-purple-500 ring-0 
                            focus:ring-0 focus:ring-offset-0 rounded-sm"
                            onChange={() => null}
                            checked={element[2]}
                        />
                        <label className="cursor-pointer">{`${element[0]}`}</label>
                        <p className="text-opacity-40 text-black">{`(${element[1]})`}</p>
                    </button>
                ))}
            </div>
        )
    }

    return (
        <div className="filter-block">
            <button className="py-2 flex justify-between w-full" onClick={handleToggle}>
                <span>{`${label} \0`}</span>
                <span className="text-opacity-40 text-black">{arrOfLabels.length}</span>
                <span className="flex items-center justify-center ml-auto">
                    <FontAwesomeIcon
                        className={`h-5 transform ${isOpen ? "rotate-180" : "rotate-0"} 
                        transition-transform duration-300`}
                        icon={faChevronDown}
                    />
                </span>
            </button>
            {isOpen ? renderMenu() : null}
        </div>
    )
}

export default Dropdown