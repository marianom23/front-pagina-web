import React, { useState } from 'react';
import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBNavbarBrand,
  MDBCollapse,
} from 'mdb-react-ui-kit';

import { useNavigate } from 'react-router-dom';
import useUser from '../../hooks/useUser';


export const NavbarUsuario = () => {
  const [showNavColor, setShowNavColor] = useState(false);
  const {usuario, logout} = useUser()
  const navigate = useNavigate()

  return (   
    <>
      {(
        usuario === null ?
          <div>Sin logout</div>
        :
        <MDBNavbar expand='lg' dark bgColor='primary'>
        <MDBContainer fluid>
          <MDBNavbarBrand>Bienvenido {usuario.nombre}</MDBNavbarBrand>
          <MDBNavbarToggler
            type='button'
            data-target='#navbarColor02'
            aria-controls='navbarColor02'
            aria-expanded='false'
            aria-label='Toggle navigation'
            onClick={() => setShowNavColor(!showNavColor)}
          >
            <MDBIcon icon='bars' fas />
          </MDBNavbarToggler>
          <MDBCollapse show={showNavColor} navbar>
            <MDBNavbarNav className='me-auto mb-2 mb-lg-0'>
              <MDBNavbarItem className='active'>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href='/login' onClick={logout} >Logout</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href='/pedir'>Hacer mi pedido</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href='/domicilio'>Agregar domicilio</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                  <MDBNavbarLink onClick={() => navigate(`/mis-pedidos/${usuario.id}`, { replace: true })}>Mis pedidos</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href='/carritos'>Carrito</MDBNavbarLink>
              </MDBNavbarItem>
            </MDBNavbarNav>
            
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
      )}
    </>
  );
}