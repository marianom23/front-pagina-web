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
  MDBDropdownLink,
  MDBDropdownItem,
  MDBDropdownMenu,
  MDBDropdown,
  MDBDropdownToggle
} from 'mdb-react-ui-kit';
import useUser from '../hooks/useUser';

export const NavbarAdministrador = () => {
  const [showNavColor, setShowNavColor] = useState(false);
  const {usuario, logout} = useUser()

  return (   
    <MDBNavbar expand='lg' dark bgColor='primary'>
      <MDBContainer fluid>
        <MDBNavbarBrand href='/'>Bienvenido {usuario.nombre}</MDBNavbarBrand>
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
            <MDBNavbarItem className='active'> </MDBNavbarItem>

            <MDBNavbarItem>
              <MDBDropdown>               
                <MDBDropdownToggle tag='a' className='nav-link'>
                  Grillas <MDBIcon fas icon="file-excel" />
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <MDBDropdownItem>
                    <MDBDropdownLink href='/grilla-articulo'>Grilla Articulos</MDBDropdownLink>
                  </MDBDropdownItem>
                  <MDBDropdownItem>
                    <MDBDropdownLink href='/grilla-insumo'>Grilla Insumos</MDBDropdownLink>
                  </MDBDropdownItem>
                  <MDBDropdownItem>
                    <MDBDropdownLink href='/grilla-usuario'>Grilla Usuarios</MDBDropdownLink>
                  </MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavbarItem>

            <MDBNavbarItem>
              <MDBDropdown>
                <MDBDropdownToggle tag='a' className='nav-link'>
                  Agregar <MDBIcon fas icon="plus" />
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <MDBDropdownItem>
                    <MDBDropdownLink href='/agregar-insumo'>Agregar Insumos</MDBDropdownLink>
                  </MDBDropdownItem>
                  <MDBDropdownItem>
                    <MDBDropdownLink href='/agregar-articulo-manufacturado'>Agregar Articulo Manufacturado</MDBDropdownLink>
                  </MDBDropdownItem>
                  <MDBDropdownItem>
                    <MDBDropdownLink href='/agregar-detalle-articulo'>Agregar Detalles del Articulo</MDBDropdownLink>
                  </MDBDropdownItem>
                  <MDBDropdownItem>
                    <MDBDropdownLink href='/agregar-categoria'>Agregar Categoría</MDBDropdownLink>
                  </MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavbarItem>

            <MDBNavbarItem>
              <MDBDropdown>
                <MDBDropdownToggle tag='a' className='nav-link'>
                  Ver metricas <MDBIcon fas icon="chart-area" />
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <MDBDropdownItem>
                    <MDBDropdownLink href='/metricas-pedidos'>Pedidos</MDBDropdownLink>
                  </MDBDropdownItem>
                  <MDBDropdownItem>
                    <MDBDropdownLink href='/metricas-ranking'>Ranking</MDBDropdownLink>
                  </MDBDropdownItem>
                  <MDBDropdownItem>
                    <MDBDropdownLink href='/metricas-ganancias'>Ganancias</MDBDropdownLink>
                  </MDBDropdownItem>
                  <MDBDropdownItem>
                    <MDBDropdownLink href='/metricas-recaudaciones'>Recaudaciones</MDBDropdownLink>
                  </MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavbarItem>
            <MDBNavbarItem>
                <MDBNavbarLink href='/' onClick={logout}>Logout <MDBIcon fas icon="door-open" /></MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
                <MDBNavbarLink href='/pedidos-pendientes'>Ir a caja</MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
                <MDBNavbarLink href='/pedidos-cajero'>Ir a cocina</MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
                <MDBNavbarLink href='/inicio'>Ir a inicio </MDBNavbarLink>
            </MDBNavbarItem>

          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>

  );
}