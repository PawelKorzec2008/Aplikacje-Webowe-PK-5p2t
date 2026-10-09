import { useState } from 'react'
import platformy from '../wariant22'
import './App.css'
import Platform from '../components/Platform'

function App() {

  const [name, setName] = useState('')
  const [number, setNumber] = useState('')

  function handleSubmit(event){
    event.preventDefault()
    
    console.log(name)

    const position = platformy[number - 1];
    if (position) {
      console.log(position);
    } else {
      console.log('Nieprawidłowy numer platformy streamingowej');
    }
  }


  return (
    <div className="container">
      <h1>Liczba platform streamingowych: {platformy.length}</h1>
      <ol>
        {platformy.map((platform, index)=><Platform key={index} name={platform}></Platform>)}
      </ol>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className='form-check-label' htmlFor="name">Imię i nazwisko</label><br />
          <input className='form-controls' type="text" name='name' value={name} onChange={(e)=>setName(e.target.value)}/> <br />
          <label className='form-check-label' htmlFor="number">Numer platformy streamingowej:</label><br />
          <input className='form-controls' type="number" name='number' value={number} onChange={(e)=>setNumber(e.target.value)}/> <br />
          <input className='btn btn-primary' type="submit" value="Zatwierdź wybór"/>
        </div>
      </form>
    </div>
  )
}

export default App
