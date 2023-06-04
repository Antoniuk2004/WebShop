import { useState } from "react"
import { Props } from "../DataTypes"




function Slider({ dataProp, onDataChange }: Props) {
    const max: number = 25
    const [leftInputVal, setLeftInputVal] = useState(0)
    const [rigthInputVal, setRigthInputVal] = useState(max)
    const [leftVal, setLeftVal] = useState(leftInputVal)
    const [rightVal, setRightVal] = useState(rigthInputVal)

    function LeftInputValChange(event: any) {
        var value = Number(event.target.value)
        if (value >= 0 && value < Number(rightVal)) setLeftVal(value)
    }
    function RigthInputValChange(event: any) {
        var value = Number(event.target.value)
        if (value >= 0 && Number(leftVal) < value && value <= max) setRightVal(value)
    }


    function getBackgroundSize(inputVal: number) {
        return { backgroundSize: `${(inputVal * 100) / max}% 100%` }
    }


    function changePrice() {
        const arrOfNewData = [];
        if (dataProp) {
          for (let index = 0; index < dataProp.length; index++) {
            if (
              dataProp[index].price >= leftVal &&
              dataProp[index].price <= rightVal
            ) {
              arrOfNewData.push(dataProp[index]);
            }
          }
          onDataChange(arrOfNewData);
        }
      }

    
    var inputCSS: string = "mt-1 block px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm focus:outline-none focus:border-0 focus:ring-2 focus:ring-purple-500 w-1/3"

    return (
        <div id="drop-down-menu-price" className='py-2' >
            <div className="price-top flex items-center gap-2">
                <input type="text"
                    id="left-input"
                    value={leftVal}
                    onChange={LeftInputValChange}
                    className={inputCSS} />
                <span>—</span>
                <input type="text"
                    id="right-input"
                    value={rightVal}
                    onChange={RigthInputValChange}
                    className={inputCSS} />
                <button
                    onClick={changePrice}
                    className="rounded-full border-2 bg-white border-slate-300  px-5 py-2" >OK</button>
            </div>
            <div className="sliders_control relative mt-5" >
                <input
                    id="leftSlider"
                    className="leftSlider slider w-full"
                    type="range"
                    min="0"
                    max={max}
                    onChange={LeftInputValChange}
                    style={getBackgroundSize(leftVal)}
                    value={leftVal}
                />
                <input
                    id="rightSlider"
                    className="rightSlider slider w-full"
                    type="range"
                    min="0"
                    max={max}
                    onChange={RigthInputValChange}
                    style={getBackgroundSize(rightVal)}
                    value={rightVal}
                />
            </div>
        </div >
    )
}

export default Slider