import React, { useContext, useState } from 'react'
import { Carousel } from './Carousel'
import { Footer } from './Footer'
import { Navbar } from './Navbar'
import { UserContext } from '../usuario/context/UserContext'

export const Inicio = () => {
  const {user} = useContext(UserContext);
  console.log(user)
  return (
    <>
      <Navbar/>
      <br />
      <h1>El Buen Sabor</h1>

      <br />
      <Carousel/>

      <br />
      <Footer/>
    </>
  )
}
