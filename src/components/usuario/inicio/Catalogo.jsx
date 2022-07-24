import React from 'react'
import { Productos } from '../carrito/productos/Productos'
import { NavbarUsuario } from '../nav/NavbarUsuario'
import { Carousel } from 'react-bootstrap';
import { Carrito } from '../carrito/cart2/Carrito';
import { MDBBadge, MDBIcon, MDBNavbarLink } from 'mdb-react-ui-kit';



export const Catalogo = () => {

 
  return (
        <>
            <NavbarUsuario/>
            <br />
            <br/>

            <Productos/>

        </>
  )
}

