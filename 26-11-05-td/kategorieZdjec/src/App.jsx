import { useState } from 'react'
import './App.css'

const zdjecia = [
    {id: 0, alt: "Mak", filename: "obraz1.jpg", category:1, downloads: 35},
    {id: 1, alt:"Bukiet", filename: "obraz2.jpg", category: 1, downloads: 43},
    {id: 2, alt:"Dalmatyńczyk", filename: "obraz3.jpg", category:2, downloads: 2},
    {id: 3, alt:"Świnka morska", filename: "obraz4.jpg", category:2, downloads: 53},
    {id: 4, alt:"Rotwailer", filename: "obraz5.jpg", category:2, downloads: 43},
    {id: 5, alt:"Audi", filename: "obraz6.jpg", category:3, downloads: 11},
    {id: 6, alt:"kotki", filename: "obraz7.jpg", category:2, downloads: 22},
    {id: 7, alt:"Róża", filename: "obraz8.jpg", category:1, downloads: 33},
    {id: 8, alt:"Świnka morska", filename: "obraz9.jpg", category:2, downloads: 123},
    {id: 9, alt:"Foksterier", filename: "obraz10.jpg", category:2, downloads: 22},
    {id: 10, alt:"Szczeniak", filename: "obraz11.jpg", category:2, downloads: 12},
    {id: 11, alt:"Garbus", filename: "obraz12.jpg", category:3, downloads: 321}
  ]

var kategorie = [0,1,2,3];

function odwrocKategorie(kategoria){
  if(kategorie[kategoria]==0){
      kategorie[kategoria] = kategoria
    }else{
      kategorie[kategoria] = 0
    }
}

function App() {
  
  const [pokazywanaGaleria,setPokazywanaGaleria] = useState(zdjecia)

  function zmienKategorie(kategoria){
    odwrocKategorie(kategoria)
    //console.log(kategorie)

    setPokazywanaGaleria(zdjecia.filter(zdjecie => kategorie[zdjecie.category]))
  }

  function dodajPobranie(id){
    const tymczasowaGaleria = pokazywanaGaleria.map((zdjecie) => {
      if(zdjecie.id == id){
        zdjecie.downloads ++;
      }
      return zdjecie
    })
    setPokazywanaGaleria(tymczasowaGaleria);
  }

  return (
    <>
      <h1>Kategorie zdjęć</h1>
      <div>
        <div className='form-check form-check-inline form-switch'>
          <input type='checkbox' className='form-check-input' id='kwiaty' defaultChecked onChange={()=>zmienKategorie(1)}/>
          <label className='form-check-label' htmlFor="kwiaty">Kwiaty</label>
        </div>

        <div className='form-check form-check-inline form-switch'>
          <input type='checkbox' className='form-check-input' id='zwierzeta' defaultChecked onChange={()=>zmienKategorie(2)}/>
          <label className='form-check-label' htmlFor="zwierzeta">Zwierzęta</label>
        </div>

        <div className='form-check form-check-inline form-switch'>
          <input type='checkbox' className='form-check-input' id='samochody' defaultChecked onChange={()=>zmienKategorie(3)}/>
          <label className='form-check-label' htmlFor="samochody">Samochody</label>
        </div>
      </div>

      <div className='container-fluid'>
        <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3'>
      {pokazywanaGaleria.map(zdjecie=>
          <div className='col' key={zdjecie.id}>
            <div>
            <img className='img-fluid zdjecie' src={"src/assets/"+zdjecie.filename} alt={zdjecie.alt}/>
            <h4>Pobrań: {zdjecie.downloads}</h4>
            <button type="button" className="btn btn-success" onClick={() => dodajPobranie(zdjecie.id)}>Pobierz</button>
            </div>
          </div>
      )}
        </div>
      </div>
    </>
  )
}

export default App