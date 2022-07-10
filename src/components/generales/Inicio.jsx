import React, { useState } from 'react'
import { Carousel } from './Carousel'
import { Footer } from './Footer'
import { Navbar } from './Navbar'

export const Inicio = () => {
  return (
    <>
      <Navbar/>
      <br />
      <h1>El Buen Sabor</h1>
      <h3>local storage</h3>
      <p>id {localStorage.getItem('id')}</p>
      <p>email {localStorage.getItem('email')}</p>
      <p>name {localStorage.getItem('name')}</p>
      <p>rol {localStorage.getItem('rol')}</p>
      <br />
      <Carousel/>

      <br />
      <Footer/>
    </>
  )
}
