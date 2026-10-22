import './App.css'
import Slots from '../components/Slots'

function App() {

  const fruitsList = ["🍓","🍏","🍌"]
  const fruits = []
  for (let i = 0; i<3; i++){
    fruits.push(fruitsList[Math.floor(Math.random()*fruitsList.length)])
  }
  //console.log(fruits)

  return (
    <div className='container min-vh-100 d-flex flex-column align-items-center justify-content-center'>
      <Slots fruits={fruits}/>
      {fruits[0]==fruits[1] && fruits[1]==fruits[2] ? <h1 className='mt-3'>You win!</h1> : <h1 className='mt-3'>Not today!</h1>}
    </div>
  )
}

export default App
