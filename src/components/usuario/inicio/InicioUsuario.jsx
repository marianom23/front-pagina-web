import React, { useEffect, useState } from 'react'
import { Carousel } from '../../generales/Carousel/Carousel'
import { Footer } from '../../generales/nav-foot/Footer'
import Cookies from 'universal-cookie'
import { NavbarUsuario } from '../nav/NavbarUsuario'
import { useNavigate } from 'react-router-dom'

export const InicioUsuario = () => {

  const cookies = new Cookies();
  let navigate = useNavigate();

  // useEffect(() => {
  //   if (cookies === null) {
  //     alert('Tienes que logearte')
  //     navigate("/")
  //   }
  // }, [])
  return (
    <>
      <NavbarUsuario/>
      <br />
      <h1>El Buen Sabor</h1>
      {/* <h2>Bienvenidx usuarix.</h2>
      <h3>Nombre: {cookies.get('nombre')}</h3>
      <h3>Id: {cookies.get('id')}</h3>
      <h3>Email: {cookies.get('email')}</h3>
      <h3>Rol: {cookies.get('rol')}</h3> */}
      <br />
      <Carousel/>


      <br />
      <Footer/>
    </>
  )
}
