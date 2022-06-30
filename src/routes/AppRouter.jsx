import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Contactenos } from '../components/Contactenos'
import { Inicio } from '../components/Inicio'
import { Register } from '../components/Register'


export const AppRouter = () => {
  return (
    <>
        <Routes>
            <Route path="/" element={<Inicio/>}/>
            <Route path="/inicio" element={<Inicio/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/contacto" element={<Contactenos/>}/>
        </Routes>
    </>
  )
}
