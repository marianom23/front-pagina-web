import React, { useContext } from 'react'
import { UserContext } from './context/UserContext'
import { Carousel } from '../generales/Carousel'
import { Footer } from '../generales/Footer'
import { Navbar } from '../generales/Navbar'

import Cookies from 'universal-cookie'

export const InicioUsuario = () => {

  const {user} = useContext(UserContext);
  console.log(user,'Inicio Usuario')

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
      <Carousel/>

      <br />
      <Footer/>
    </>
  )
}
