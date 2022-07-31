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
  MDBDropdownToggle,
  MDBDropdown,
  MDBDropdownItem,
  MDBDropdownLink,
  MDBDropdownMenu
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
              <MDBNavbarLink href='/grilla-articulo'>Grilla Articulos</MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink href='/grilla-insumo'>Grilla Insumos</MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink href='/grilla-usuario'>Grilla Usuarios</MDBNavbarLink>
            </MDBNavbarItem>

            <MDBNavbarItem>
              <MDBDropdown>
                <MDBDropdownToggle tag='a' className='nav-link'>
                  Ver metricas
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <MDBDropdownItem>
                    <MDBDropdownLink href='/metricas-pedidos'>Pedidos</MDBDropdownLink>
                  </MDBDropdownItem>
                  <MDBDropdownItem>
                    <MDBDropdownLink href='/metricas-ranking'>Ranking</MDBDropdownLink>
                  </MDBDropdownItem>
                  <MDBDropdownItem>
                    <MDBDropdownLink href='metricas-ganancias'>Ganancias</MDBDropdownLink>
                  </MDBDropdownItem>
                  <MDBDropdownItem>
                    <MDBDropdownLink href='metricas-recaudaciones'>Recaudaciones</MDBDropdownLink>
                  </MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavbarItem>


          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>

  );
}