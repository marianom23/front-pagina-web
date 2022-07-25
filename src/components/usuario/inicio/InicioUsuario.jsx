import React, { useContext, useEffect } from 'react'
import { Carousel } from '../../generales/Carousel/Carousel'
import { Footer } from '../../generales/nav-foot/Footer'
import { NavbarUsuario } from '../nav/NavbarUsuario'
import { useNavigate } from 'react-router-dom'
import useUser from '../../hooks/useUser'

export const InicioUsuario = () => {

  let navigate = useNavigate();
  const {usuario} = useUser();

  useEffect(() => {
      if (usuario !== null) {
          if (usuario.rol === 100 || usuario.rol === 500) {
              alert('Bienvenido')
            }else{
              alert('Tienes que logearte como usuario para acceder')
              navigate("/login", { replace: true });
            }   
      }else{
          alert('Tienes que logearte como usuario para acceder')
          navigate("/login", { replace: true });
      }
  }, [])
  

  return (
    <>
      <NavbarUsuario/>
      <br />
      <h1>El Buen Sabor</h1>

      <br />

      <Carousel/>


      <br />
      <Footer/>
    </>
  )
}
