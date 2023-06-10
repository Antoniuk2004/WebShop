import { SetStateAction, useEffect, useState } from "react";
import { Confectionery } from "../Confectionery";
import { FilterType, Props } from "../DataTypes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

function Dropdown(label: string, filterType: FilterType, products: Props, arrOfFilterTypes: Props) {
    const [isOpen, setIsOpen] = useState(true);
    const [arrOfLabels, setArrOfLabels] = useState(new Array);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        let mapOfFilterTypes = new Map<string | number, number>();
        var arr: (string | number | boolean)[][] = new Array
        switch (filterType) {
            case FilterType.Brand:
                products.data.forEach((element: Confectionery, index: number) => {
                    var num = mapOfFilterTypes.get(element.brand)
                    if (num != undefined) {
                        mapOfFilterTypes.set(element.brand, num += 1)
                    }
                    else {
                        mapOfFilterTypes.set(element.brand, 1)
                    }
                })
                arr = mergeArrays(mapOfFilterTypes)

                break;
            case FilterType.Country:
                products.data.forEach((element: Confectionery, index: number) => {
                    var num = mapOfFilterTypes.get(element.country)
                    if (num != undefined) {
                        mapOfFilterTypes.set(element.country, num += 1)
                    }
                    else {
                        mapOfFilterTypes.set(element.country, 1)
                    }
                })
                arr = mergeArrays(mapOfFilterTypes)
                break;
            case FilterType.Quantity:
                products.data.forEach((element: Confectionery, index: number) => {
                    var num = mapOfFilterTypes.get(element.packageQuantity)
                    if (num != undefined) {
                        mapOfFilterTypes.set(element.packageQuantity, num += 1)
                    }
                    else {
                        mapOfFilterTypes.set(element.packageQuantity, 1)
                    }
                })
                arr = mergeArrays(mapOfFilterTypes)
                break;
            case FilterType.Weigth:
                products.data.forEach((element: Confectionery, index: number) => {
                    var num = mapOfFilterTypes.get(element.weight)
                    if (num !== undefined) {
                        mapOfFilterTypes.set(element.weight, num += 1)
                    }
                    else {
                        mapOfFilterTypes.set(element.weight, 1)
                    }
                })
                arr = mergeArrays(mapOfFilterTypes)
                break;
            case FilterType.Availability:
                mapOfFilterTypes.set("In Stock", 0)
                mapOfFilterTypes.set("Out of Stock", 0)
                products.data.forEach((element: Confectionery, index: number) => {
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
                var num = mapOfFilterTypes.get("In Stock")
                if (num === 0) mapOfFilterTypes.delete("In Stock")
                arr = mergeArrays(mapOfFilterTypes)
                break;
        }
        setArrOfLabels(sortArrOfLabels(arr));
    }, [products.data, filterType]);


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

    function changeArrOfFilterTypes(newFilterType: string | number){
        var currentData = arrOfFilterTypes.data
        var newData = []
        currentData.forEach((element: string | number) => {
            newData.push(element)
        }); 
        newData.push(newFilterType)
        console.log(newData)
        arrOfFilterTypes.set(newData)
    }


    function renderMenu() {
        return (
            <div className="">
                {arrOfLabels.map((element, index) => (
                    <button
                        className="flex gap-x-2 items-center w-full text-left py-1 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
                        onClick={() => changeArrOfFilterTypes(element[0])}
                    >
                        <input
                            type="checkbox"
                            className="form-checkbox cursor-pointer h-4 w-4 text-purple-500 ring-0 focus:ring-0 focus:ring-offset-0 rounded-sm"
                            onChange={() => null}
                            checked={arrOfLabels[2]}
                        />
                        <label className="cursor-pointer">{`${element[0]}`}</label>
                        <p className="text-opacity-40 text-black">{`(${element[1]})`}</p>
                    </button>
                ))}
                <div className="py-1">{/* Rest of the code */}</div>
            </div>
        );
    }

    return (
        <div className="">
            <button type="button" className="py-2 flex justify-between w-full" onClick={handleToggle}>
                <span>{`${label} \0`}</span>
                <span className="text-opacity-40 text-black">{arrOfLabels.length}</span>
                <span className="flex items-center justify-center ml-auto">
                    <FontAwesomeIcon
                        className={`h-5 transform ${isOpen ? "rotate-180" : "rotate-0"} transition-transform duration-300`}
                        icon={faChevronDown}
                    />
                </span>
            </button>
            {isOpen ? renderMenu() : null}
        </div>
    );
}

export default Dropdown;
