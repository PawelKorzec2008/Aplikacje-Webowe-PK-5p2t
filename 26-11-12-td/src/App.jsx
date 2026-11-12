import './App.css'

function App() {

  return (
    <div className='container'>
      <form action="" onSubmit={()=>{
        event.preventDefault();
        console.log("tytul: "+document.getElementById("tytul").value+", rodzaj: "+document.getElementById("rodzaj").value);
      }}>
        <div className='form-group mb-3'>
          <label htmlFor="tytul" className='form-label'>Tytuł filmu</label>
          <input className='form-control' type="text" name='tytul' id='tytul'/>
        </div>
        <div className='form-group mb-3'>
          <label htmlFor="rodzaj" className='form-label'>Rodzaj</label>
          <select className='form-control' name="rodzaj" id="rodzaj">
            <option value=""></option>
            <option value="1">Komedia</option>
            <option value="2">Obyczajowy</option>
            <option value="3">Sensacyjny</option>
            <option value="4">Horror</option>
          </select>
        </div>
        <div className='form-group mb-3'>
          <button className='btn btn-primary' type="submit">Dodaj</button>
        </div>
      </form>
    </div>
  )
}

export default App
