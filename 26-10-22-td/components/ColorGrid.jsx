import ColorGridCell from "./ColorGridCell";

function ColorGrid(colors){

    return(
        <div>
            <div>
                <ColorGridCell colorsParam={colors.colors}/>
            </div>
        </div>
    )
}

export default ColorGrid