import { useEffect, useState } from 'react'
import './App.css'
import './bootstrap.min.css'

function App() {
  const [typy, setTypy] = useState([])
  const [blad, setBlad] = useState('')
  const [wybranyTyp, setWybranyTyp] = useState('')
  const [maksCena, setMaksCena] = useState('')
  const [aktywnyTyp, setAktywnyTyp] = useState('')
  const [aktywnyLimitCeny, setAktywnyLimitCeny] = useState('')
  const [rowery, setRowery] = useState(
    [
      { id: 0, alt: "trek", filename: "gr1.png", category: 1, likes: 35, cena: 2000 },
      { id: 1, alt: "kellys", filename: "gr2.png", category: 1, likes: 43, cena: 2000 },
      { id: 2, alt: "trek", filename: "gr3.png", category: 1, likes: 2, cena: 3400 },
      { id: 3, alt: "trek", filename: "gr4.png", category: 1, likes: 53, cena: 1400 },
      { id: 4, alt: "romet", filename: "miej1.png", category: 2, likes: 43, cena: 4400 },
      { id: 5, alt: "focus", filename: "miej2.png", category: 2, likes: 11, cena: 4400 },
      { id: 6, alt: "ktm", filename: "miej3.png", category: 2, likes: 22, cena: 6400 },
      { id: 7, alt: "", filename: "mtb1.png", category: 3, likes: 33, cena: 1400 },
      { id: 8, alt: "giant", filename: "mtb2.png", category: 3, likes: 123, cena: 2400 },
      { id: 9, alt: "principia", filename: "mtb3.png", category: 3, likes: 22, cena: 2000 }
    ]
  )

  useEffect(() => {
    async function wczytaj() {
      try {
        const odpowiedz = await fetch('/bike_types.json')
        if (!odpowiedz.ok) {
          throw new Error(`Nie udało się pobrać typów rowerów (${odpowiedz.status})`)
        }
        const dane = await odpowiedz.json()
        setTypy(dane)
      } catch (e) {
        setBlad(e.message)
      }
    }

    wczytaj()
  }, [])

  const kategoriaDlaTypu = {
    gravel: 1,
    miejski: 2,
    mtb: 3,
  }

  function pokaz() {
    setAktywnyTyp(wybranyTyp)
    setAktywnyLimitCeny(maksCena)
  }

  function polub(rowerId) {
    setRowery(poprzednieRowery =>
      poprzednieRowery.map(rower =>
        rower.id === rowerId
          ? { ...rower, likes: rower.likes + 1 }
          : rower
      )
    )
  }

  const widoczne = rowery.filter(rower => {
    const zgadzaSieTyp = !aktywnyTyp ||
      rower.category === kategoriaDlaTypu[aktywnyTyp]
    const zgadzaSieCena = aktywnyLimitCeny === '' ||
      rower.cena <= Number(aktywnyLimitCeny)

    return zgadzaSieTyp && zgadzaSieCena
  })

  return (
    <>
      <div className='container mt-4'>
        <h1>Paweł Korzec</h1>
        <p>Wybierz interesujący Cię typ roweru.</p>

        {blad && <p className="alert alert-danger" role="alert">{blad}</p>}

        <select
          className="form-select"
          id="selectTyp"
          value={wybranyTyp}
          onChange={(event) => setWybranyTyp(event.target.value)}
        >
          <option value="">Wszystkie typy</option>
          {typy.map((typ) =>
            <option key={typ.id} value={typ.id}>{typ.name}</option>
          )}
        </select>

        <label htmlFor="cena">Cena maksymalna</label>
        <input
          type="number"
          name="cena"
          id="cena"
          min="0"
          value={maksCena}
          onChange={(event) => setMaksCena(event.target.value)}
        />
        <button
          type="button"
          className="btn btn-primary"
          onClick={pokaz}
        >
          Pokaż
        </button>


        <div className='row gap-1'>
          {widoczne.map(rower =>
            <div key={rower.id} className='col-3 bike-card border-3 border border-success'>
              <img src={rower.filename} alt={rower.alt} className='img' />
              <p>Cena: {rower.cena}</p>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => polub(rower.id)}
              >
                Polub
              </button>
              <p>{rower.likes}</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default App
