import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import useUser from '../hooks/useUser';
import { NavbarAdministrador } from './NavbarAdministrador'

export const InicioAdministrador = () => {

  let navigate = useNavigate();
  const {usuario} = useUser();

  useEffect(() => {
      if (usuario !== null) {
          if (usuario.rol === 500) {
            }else{
              alert('Tienes que logearte como administrador para acceder')
              navigate("/login", { replace: true });
            }   
      }else{
          alert('Tienes que logearte como administrador para acceder')
          navigate("/login", { replace: true });
      }
  }, [])



  return (
    <>
        <NavbarAdministrador/>
        <br />
        <h1>Bienvenido, usa la barra para desplazarte por administracion</h1>
    </>
  )
}
