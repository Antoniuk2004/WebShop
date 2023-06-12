import { useState } from "react"
import { Props } from "../DataTypes"
import { arrOfChocolates } from "../Data"
import { Confectionery } from "../Confectionery"
import { FilterData, usePriceFilter } from "./Filter"
import { findMaxPrice, findMinPrice } from "./FindValues"


function Slider(dataProp: any, set: (data: any) => void, arrOfFilters: Props, originalData: Array<Confectionery>, leftValUseState : Props, rightValUseState: Props) {
    const max: number = findMaxPrice(originalData)
    const min: number = findMinPrice(originalData)
    const [leftInputVal, setLeftInputVal] = useState(min)
    const [rigthInputVal, setRigthInputVal] = useState(max)
    

    function LeftInputValChange(event: any) {
        var value = Number(event.target.value)
        if (value >= 0 && value < Number(rightValUseState.data)) leftValUseState.set(value)
    }
    function RigthInputValChange(event: any) {
        var value = Number(event.target.value)
        if (value >= 0 && Number(leftValUseState.data) < value && value <= max) rightValUseState.set(value)
    }


    function getBackgroundSize(inputVal: number) {
        return { backgroundSize: `${(inputVal * 100) / max}% 100%` }
    }



    function ChangePrice() {
        var oldData: Array<Confectionery> = FilterData(originalData, arrOfFilters, leftValUseState.data, rightValUseState.data)
        const arrOfNewData = usePriceFilter(oldData, leftValUseState.data, rightValUseState.data)
        set(arrOfNewData);
    }


    var inputCSS: string = "mt-1 block px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm focus:outline-none focus:border-0 focus:ring-2 focus:ring-purple-500 w-1/3"

    return (
        <div id="drop-down-menu-price" className='py-2' >
            <div className="price-top flex items-center gap-2">
                <input type="text"
                    id="left-input"
                    value={leftValUseState.data}
                    onChange={LeftInputValChange}
                    className={inputCSS} />
                <span>—</span>
                <input type="text"
                    id="right-input"
                    value={rightValUseState.data}
                    onChange={RigthInputValChange}
                    className={inputCSS} />
                <button
                    onClick={ChangePrice}
                    className="rounded-full border-2 bg-white border-slate-300  px-5 py-2" >OK</button>
            </div>
            <div className="sliders_control relative mt-5" >
                <input
                    id="leftSlider"
                    className="leftSlider slider w-full"
                    type="range"
                    min={min}
                    max={max}
                    onChange={LeftInputValChange}
                    style={getBackgroundSize(leftValUseState.data)}
                    value={leftValUseState.data}
                />
                <input
                    id="rightSlider"
                    className="rightSlider slider w-full"
                    type="range"
                    min={min}
                    max={max}
                    onChange={RigthInputValChange}
                    style={getBackgroundSize(rightValUseState.data)}
                    value={rightValUseState.data}
                />
            </div>
        </div >
    )
}

export default Slider