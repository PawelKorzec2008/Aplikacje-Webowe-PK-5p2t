import { useState } from 'react'
import './App.css'

import Navbar from '../components/Navbar'
import CategoryBar from '../components/CategoryBar'
import Gallery from '../components/Gallery'
import Footer from '../components/Footer'
import AddPhotoModal from '../components/AddPhotoModal'
import FiltersOffcanvas from '../components/FiltersOffcanvas'
import photos from './data/photos.json'

function App() {
  const [zdjecia, setZdjecia] = useState(photos)
  const [aktywnaKategoria, setAktywnaKategoria] = useState('wszystkie')
  const widoczne = aktywnaKategoria === 'wszystkie' ? zdjecia : zdjecia.filter(z=>z.category === aktywnaKategoria)
  return (
    <>
      <Navbar></Navbar>
      <div className='container mt-4'>
        <header className='container py-4 py-lg-5'>
          <div className='container py-4 py-lg-5'>
            <div className='row align-items-center g-3'>
              <div className='col-12 col-lg-8'>
                <h1 className='mb-2'>Galeria zdjęć</h1>
                <p className='lead text-body-secondary mb-0'>
                  Zdjęcia z wypraw w góry, nad morze i po mieście. Wybierz kategorię, żeby zwęzić widok - albo powiększ zdjęcie, które Ci się spodoba.
                </p>
              </div>

              <div className='col-12 col-lg-4'>
                <div className='d-flex flex-wrap gap-2 justify-content-lg-end'>
                  <button type='button' className="btn btn-outline-secondary" data-bs-toggle="offcanvas" data-bs-target="#panelFiltrow">Filtry</button>
                  <button type='button' className='btn btn-primary' data-bs-toggle="modal" data-bs-target="#dodajZdjecie">Dodaj zdjęcie</button>
                </div>
              </div>
            </div>
          </div>
        </header>
        <main className='container'>
          <CategoryBar aktywna = {aktywnaKategoria} onWybierz = {setAktywnaKategoria}/>
          {widoczne.length === 0 && (
            <div className='alert alert-warning'>
                Nie znaleziono zdjęć w tej kategorii.
            </div>
          )}
          <Gallery zdjecia={widoczne}/>
        </main>
        <Footer/>
        <AddPhotoModal/>
        <FiltersOffcanvas/>
      </div>
    </>
  )
}

export default App