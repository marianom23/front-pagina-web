import React from 'react'
import { Productos } from '../carrito/productos/Productos'
import { NavbarUsuario } from '../nav/NavbarUsuario'
import { MDBContainer } from 'mdb-react-ui-kit';
import { Cart } from '../carrito/cart/Cart';




export const Catalogo = () => {

 
  return (
        <>
            <NavbarUsuario/>
            <br />

            <Cart/>

            <br/>


            <br/>

            <Productos/>

        </>
  )
}

