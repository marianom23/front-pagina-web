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

            <MDBDropdown>
                <MDBDropdownToggle tag='a' className='btn btn-primary'>
                Categorías comida
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                    <MDBDropdownItem>
                        <MDBDropdownLink href="#">Action</MDBDropdownLink>
                    </MDBDropdownItem>
                    <MDBDropdownItem>
                        <MDBDropdownLink href="#">Another action</MDBDropdownLink>
                    </MDBDropdownItem>
                    <MDBDropdownItem>
                        <MDBDropdownLink href="#">Something else here</MDBDropdownLink>
                    </MDBDropdownItem>
                </MDBDropdownMenu>
            </MDBDropdown>

            <br/>

            <Productos/>

        </div>
  )
}

