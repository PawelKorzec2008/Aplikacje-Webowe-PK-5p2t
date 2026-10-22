import Slot from './slot.jsx'

function Slots ({fruits}){
    return(
        <div className='d-flex flex-row align-items-center justify-content-center gap-3 fs-1'>
            <Slot fruit = {fruits[0]}/>
            <Slot fruit = {fruits[1]}/>
            <Slot fruit = {fruits[2]}/>
        </div>
    )
}
export default Slots