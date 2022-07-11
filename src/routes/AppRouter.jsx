import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { InicioAdministrador } from '../components/administrador/InicioAdministrador'
import { AgregarInsumo } from '../components/administrador/insumos/AgregarInsumo'
import { Contactenos } from '../components/generales/Contactenos'
import { Inicio } from '../components/generales/Inicio'
import { InicioUsuario } from '../components/usuario/InicioUsuario'
import { Login } from '../components/generales/Login'
import { Register } from '../components/usuario/Register'
import { UserContext } from '../components/usuario/context/UserContext'
import { AgregarArticulo } from '../components/administrador/articulos/AgregarArticulo'

export const AppRouter = ({user}) => {
  console.log(user,'App Router')
  
  return (  
    <UserContext.Provider value={{
      user
    }}>
          <Routes>
              <Route path="/" element={<Inicio/>}/>
              <Route path="/inicio" element={<InicioUsuario/>}/>
              {/* <Route path="/" render={()=>{
                return user ? <Redirect to='/'/> : <Login />
                }}/> */}
              <Route path="/login" element={<Login/>}/>
              <Route path="/register" element={<Register/>}/>
              <Route path="/contacto" element={<Contactenos/>}/>
              <Route path="/admininicio" element={<InicioAdministrador/>}/>
              <Route path="/agregarinsumo" element={<AgregarInsumo/>}/>
              <Route path="/agregar-articulo-manufacturado" element={<AgregarArticulo/>}/>
          </Routes>  
    </UserContext.Provider> 
  )
}
