import React, { useContext } from 'react'
import { UserContext } from './context/UserContext'
import { Carousel } from '../generales/Carousel'
import { Footer } from '../generales/Footer'
import { LogoutGoogle } from './LogoutGoogle'
import { Navbar } from '../generales/Navbar'

export const InicioUsuario = () => {

  const {user} = useContext(UserContext);
  console.log(user,'Inicio Usuario')

  return (
    <>
      <Navbar/>
      <br />
      <h1>El Buen Sabor</h1>
       <LogoutGoogle/> 
      <br />
      <Carousel/>

      <br />
      <Footer/>
    </>
  )
}
