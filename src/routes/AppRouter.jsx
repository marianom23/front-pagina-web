import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { InicioAdministrador } from '../components/administrador/InicioAdministrador'
import { AgregarInsumo } from '../components/administrador/insumos/AgregarInsumo'
import { Contactenos } from '../components/generales/inicio/Contactenos'
import { Inicio } from '../components/generales/inicio/Inicio'
import { InicioUsuario } from '../components/usuario/inicio/InicioUsuario'
import { Login } from '../components/generales/Login/Login'
import { Register } from '../components/generales/Login/Register'
import { AgregarArticulo } from '../components/administrador/articulos/AgregarArticulo'
import { AgregarDetalles } from '../components/administrador/detalles_articulos/AgregarDetalles'
import { GrillaArticulos } from '../components/administrador/articulos/GrillaArticulos'
import { Conjunto } from '../components/usuario/inicio/Conjunto'
import { GrillaInsumo } from '../components/administrador/insumos/GrillaInsumo'
import { PedidosPendientes } from '../components/cajero/PedidosPendientes'

export const AppRouter = ({user}) => {

  
  return (  
    <Routes>
        <Route path="/" element={<Inicio/>}/>
        <Route path="/inicio" element={<InicioUsuario/>}/>
        {/* <Route path="/" render={()=>{
          return user ? <Redirect to='/'/> : <Login />
          }}/> */}
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/contacto" element={<Contactenos/>}/>
        <Route path="/admin-inicio" element={<InicioAdministrador/>}/>
        <Route path="/agregar-insumo" element={<AgregarInsumo/>}/>
        <Route path="/agregar-articulo-manufacturado" element={<AgregarArticulo/>}/>
        <Route path="/agregar-detalle-articulo" element={<AgregarDetalles/>}/>
        <Route path="/grilla-articulo" element={<GrillaArticulos/>}/>
        <Route path="/grilla-insumo" element={<GrillaInsumo/>}/>              
        <Route path="/pedir" element={<Conjunto/>}/>
        <Route path="/pedidos-pendientes" element={<PedidosPendientes/>}/>
    </Routes>  
  )
}
