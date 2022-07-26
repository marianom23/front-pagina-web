import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import useUser from '../../hooks/useUser';
import { Carrito } from '../carrito/cart2/Carrito'
import { CartProvider } from '../context/CartContext'

export const CarritoContainer = () => {

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
        <Carrito/>
    </CartProvider>
  )
}
