import React from 'react'
import { CartProvider } from '../context/CartContext'
import { Catalogo } from './Catalogo'

export const Conjunto = () => {
  return (
    <CartProvider>
        <Catalogo/>
    </CartProvider>
  )
}
