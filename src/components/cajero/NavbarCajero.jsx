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
  MDBCollapse
} from 'mdb-react-ui-kit';
import useUser from '../hooks/useUser';

export const NavbarCajero = () => {
  const [showNavColor, setShowNavColor] = useState(false);
  const {usuario, logout} = useUser();


  return (   
    <MDBNavbar expand='lg' dark bgColor='primary'>
      <MDBContainer fluid>
        <MDBNavbarBrand href='/login'>Bienvenido {usuario.nombre}</MDBNavbarBrand>
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
              <MDBNavbarLink href='/' onClick={logout}>Logout</MDBNavbarLink>
            </MDBNavbarItem>
            {(usuario.rol === 500 ?
                <MDBNavbarItem>
                  <MDBNavbarLink href='/admin-inicio'>Volver a administracion</MDBNavbarLink>
                </MDBNavbarItem>
                : ""
              )
              }
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>

  );
}