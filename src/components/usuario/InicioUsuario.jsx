import React from 'react'
import { Carousel } from '../generales/Carousel'
import { Footer } from '../generales/Footer'
import { Navbar } from '../generales/Navbar'

import Cookies from 'universal-cookie'

export const InicioUsuario = () => {

  const logout = (e) => {
    console.log(e)
    cookies.remove('id')
    cookies.remove('email')
    cookies.remove('rol')
  }
  const cookies = new Cookies();

  return (
    <>
      <Navbar/>
      <br />
      <h1>El Buen Sabor</h1>
      <h2>Bienvenidx usuarix.</h2>
      <h3>Id: {cookies.get('id')}</h3>
      <h3>Email: {cookies.get('email')}</h3>
      <h3>Rol: {cookies.get('rol')}</h3>
      <br />
      <button onClick={logout()}>Logout</button>
      <Carousel/>


      <br />
      <Footer/>
    </>
  )
}