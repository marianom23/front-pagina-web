import React from 'react'
import { Carousel } from './Carousel'
import { Footer } from './Footer'
import { LogoutGoogle } from './LogoutGoogle'
import { Navbar } from './Navbar'

export const Inicio = () => {
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
