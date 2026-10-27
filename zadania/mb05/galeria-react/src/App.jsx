import { useState, useEffect } from 'react'
import './App.css'

import { Routes, Route } from 'react-router-dom'
import Layout from '../components/Layout'
import GaleriaPage from './pages/GaleriaPage'
import ZdjeciePage from './pages/ZdjeciePage'
import DodajPage from './pages/DodajPage'
import NotFoundPage from './pages/NotFoundPage'

import Navbar from '../components/Navbar'
import CategoryBar from '../components/CategoryBar'
import Gallery from '../components/Gallery'
import Footer from '../components/Footer'
import AddPhotoModal from '../components/AddPhotoModal'
import FiltersOffcanvas from '../components/FiltersOffcanvas'
import ZdjecieDnia from '../components/ZdjecieDnia'

function App() {
    return(
      <Routes>
        <Route element={<Layout/>}>
          <Route path='/' element={<GaleriaPage/>}/>
          <Route path='/zdjecie/:id' element={<ZdjeciePage/>}/>
          <Route path='/dodaj' element={<DodajPage/>}/>
          <Route path='*' element={<NotFoundPage/>}/>
        </Route>
      </Routes>
    )
}

export default App