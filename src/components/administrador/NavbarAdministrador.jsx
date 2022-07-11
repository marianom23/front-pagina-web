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

export const NavbarAdministrador = () => {
  const [showNavColor, setShowNavColor] = useState(false);

  return (   
    <MDBNavbar expand='lg' dark bgColor='primary'>
      <MDBContainer fluid>
        <MDBNavbarBrand href='/'>El Buen Sabor</MDBNavbarBrand>
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
              <MDBNavbarLink href='/agregar-insumo'>Agregar Insumos</MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink href='/agregar-articulo-manufacturado'>Agregar Articulo Manufacturado</MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink href='/agregar-detalle-articulo'>Agregar Detalles del Articulo</MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink href='/agregar-detalle-articulo'>Agregar Detalles del Articulo</MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink href='/grilla-articulo'>Grilla Articulos</MDBNavbarLink>
            </MDBNavbarItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>

  );
}