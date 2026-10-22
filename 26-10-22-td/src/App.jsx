import './App.css'
import Slots from '../components/Slots'
import ColorGridCell from '../components/ColorGridCell'
import ColorGrid from '../components/ColorGrid'

function App() {

  const fruitsList = ["🍓","🍏","🍌"]
  const fruits = []
  for (let i = 0; i<3; i++){
    fruits.push(fruitsList[Math.floor(Math.random()*fruitsList.length)])
  }
  let isWinner =false
  if(fruits[0]==fruits[1] && fruits[1]==fruits[2]){
    isWinner=true
  }
  const colors = ["red","green","yellow","orange","blue","cyan","purple"];
  //console.log(fruits)

  return (
    <div className='container min-vh-100 d-flex flex-column align-items-center justify-content-center'>
      <Slots fruits={fruits}/>
      {isWinner ? <h1 className='mt-3'>You win!</h1>: <h1 className='mt-3'>Not today!</h1>}
      {isWinner ? <h3 className='mt-3'>Congrats</h3>: <></>}
      <ColorGrid colors={colors}/>
    </div>
  )
}

export default App
