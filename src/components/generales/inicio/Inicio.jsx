import { MDBContainer } from 'mdb-react-ui-kit'
import React, { useState } from 'react'
import { Carousel } from '../Carousel/Carousel'
import { Footer } from '../nav-foot/Footer'
import { Navbar } from '../nav-foot/Navbar'


export const Inicio = () => {
  return (
    <MDBContainer fluid>
      <Navbar/>
      <br />
      <h1><img
        src="assets/cocinero.jpg"
        alt='cocinero'
        width="180"
        height="180"
      /> El Buen Sabor </h1>

      {/* <h3>local storage</h3>
      <p>id {localStorage.getItem('id')}</p>
      <p>email {localStorage.getItem('email')}</p>
      <p>name {localStorage.getItem('name')}</p>
      <p>rol {localStorage.getItem('rol')}</p> */}
      <br />
      <Carousel/>

      <br />
      <Footer/>
    </MDBContainer>
  )
}
