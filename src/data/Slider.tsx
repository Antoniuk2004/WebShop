import { useState } from "react"
import * as Products from "./Products"
import * as Data from "../data/Data"

function Slider() {
    var currentData = Data.arrOfChocolates
    const LeftInputValChange = (event: any) => {
        LeftInputSetVal(event.target.value)
    }
    const RigthInputValChange = (event: any) => {
        RightInputSetVal(event.target.value)
    }

    const max = 20
    const getBackgroundSize = (inputVal: any) => {
        return { backgroundSize: `${(inputVal * 100) / max}% 100%` }
    }

    const [leftInputVal, LeftInputSetVal] = useState(0)
    const [rigthInputVal, RightInputSetVal] = useState(max)

    return (
        <div id="drop-down-menu-price" className='py-2' >
            <div className="price-top flex items-center gap-2">
                <input type="text"
                    id="left-input"
                    value={leftInputVal}
                    onChange={LeftInputValChange}
                    className="mt-1 block px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
invalid:border-pink-500 invalid:text-pink-600
focus:invalid:border-pink-500 focus:invalid:ring-pink-500 w-1/3
"/>
                <span>—</span>
                <input type="text"
                    id="right-input"
                    value={rigthInputVal}
                    onChange={RigthInputValChange}
                    className="mt-1 block px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
invalid:border-pink-500 invalid:text-pink-600
focus:invalid:border-pink-500 focus:invalid:ring-pink-500 w-1/3
"/>
                <button
                    onClick={() => Products.ChangePrice(leftInputVal, rigthInputVal, currentData)}
                    className="rounded-full border-2 bg-white border-slate-300  px-5 py-2">OK</button>
            </div>
            <div className="sliders_control relative mt-5">
                <input
                    id="leftSlider"
                    className="leftSlider slider w-full"
                    type="range"
                    min="0"
                    max={max}
                    onChange={(e: any) => LeftInputSetVal(e.target.value)}
                    style={getBackgroundSize(leftInputVal)}
                    value={leftInputVal}
                />
                <input
                    id="rightSlider"
                    className="rightSlider slider w-full"
                    type="range"
                    min="0"
                    max={max}
                    onChange={(e: any) => RightInputSetVal(e.target.value)}
                    style={getBackgroundSize(rigthInputVal)}
                    value={rigthInputVal}
                />
            </div>
        </div >
    )
}

export default Slider