import React from 'react'
import { Productos } from '../carrito/productos/Productos'
import { NavbarUsuario } from '../nav/NavbarUsuario'
import { MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem, MDBDropdownLink } from 'mdb-react-ui-kit';
import { Cart } from '../carrito/cart/Cart';




export const Catalogo = () => {

 
  return (
        <div>
            <NavbarUsuario/>
            <br />

            <Cart/>

            <br/>


            <br/>

            <Productos/>

        </div>
  )
}

