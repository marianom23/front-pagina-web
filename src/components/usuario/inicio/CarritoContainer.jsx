import React from 'react'
import { Carrito } from '../carrito/cart2/Carrito'
import { CartProvider } from '../context/CartContext'

export const CarritoContainer = () => {
  return (
    <CartProvider>
        <Carrito/>
    </CartProvider>
  )
}
