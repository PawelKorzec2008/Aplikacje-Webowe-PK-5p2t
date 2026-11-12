import './App.css'
import { useRef } from 'react'

function App() {

  const imie = useRef();
  const kurs = useRef();
  const kursy = ["Programowanie w C#","Angular dla początkujących","Kurs Django"]

  return (
    <div className='container'>
        <h2>Liczba kursów: {kursy.length}</h2>
        <ol>
          {kursy.map((kurs,idx)=><li key={idx}>{kurs}</li>)}
        </ol>

        <form action="" onSubmit={()=>{
          event.preventDefault();
          console.log(imie.current.value);
          if(kurs.current.value <= kursy.length && kurs.current.value>0){
            console.log(kursy[kurs.current.value-1]);
          }else{
            console.log("Nieprawidłowy numer kursu")
          }
        }}>
          <div className='form-group mb-3'>
            <label htmlFor="imie" className='form-label'>Imię i nazwisko:</label>
            <input type="text" className='form-control' id='imie' ref={imie}/>
          </div>
          <div className='form-group mb-3'>
            <label htmlFor="nrKursu" className='form-label'>Numer kursu:</label>
            <input type="number" id="nrKursu" className='form-control' ref={kurs}/>
          </div>
          <div className='form-group mb-3'>
            <button type="submit" className='btn btn-submit btn-primary'>Zapisz do kursu</button>
          </div>
        </form>
    </div>
  )
}

export default App
