import React, { useContext } from "react";
import { CartContext } from '../../context/CartContext'
import "./styles.css";

export const ItemCart = ({ item }) => {
  /* Traemos del context las funciones para agregar y sacar productos del carrito */
  const { deleteItemToCart , addItemToCart} = useContext(CartContext);

  const { id } = item;

  return (
    <div className='cartItem'>
      <img src={item.imagen} alt={item.denominacion} />
      <div className='dataContainer'>
        <div className='left'>
          <p>{item.denominacion}</p>
          <div className='buttons'>
            <button onClick={() => addItemToCart(item)}>
              AGREGAR
            </button>
            <button onClick={() => deleteItemToCart(item)}>
              SACAR
            </button>
          </div>
        </div>
        <div className='right'>
          <div>{item.amount}</div>
          <p>Total: ${item.amount * item.precio_venta}</p>
        </div>
      </div>
    </div>
  );
};