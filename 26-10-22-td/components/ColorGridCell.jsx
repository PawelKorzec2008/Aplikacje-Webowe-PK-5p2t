import { useState } from "react"

function ColorGridCell({colorsParam}){
    console.log(colorsParam)
    const [color, setColor] = colorsParam[Math.floor(Math.random()*colorsParam.length)]
    return(
        <div className="cell" style={{backgroundColor: color}} onClick={()=>setColor(colorsParam[Math.floor(Math.random()*colorsParam.length)])}></div>
    )
}

export default ColorGridCell