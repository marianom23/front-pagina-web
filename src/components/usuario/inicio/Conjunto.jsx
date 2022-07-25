import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import useUser from '../../hooks/useUser';
import { CartProvider } from '../context/CartContext'
import { Catalogo } from './Catalogo'

export const Conjunto = () => {

  let navigate = useNavigate();
  const {usuario} = useUser()
  console.log(usuario)


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
    <CartProvider>
        <Catalogo/>
    </CartProvider>
  )
}
