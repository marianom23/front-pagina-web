import React from 'react'
import { Productos } from '../carrito/productos/Productos'
import { NavbarUsuario } from '../nav/NavbarUsuario'
import { Cart } from '../carrito/cart/Cart';
import { Carousel } from 'react-bootstrap';




export const Catalogo = () => {

 
  return (
        <>
            <NavbarUsuario/>
            <br />

            <br />

            <Cart/>

            <br/>


            <br/>

            <Productos/>

        </>
  )
}

