import React, { useContext } from "react";
import { CartContext } from '../context/CartContext'


export const ItemCart = ({ item }) => {
  /* Traemos del context las funciones para agregar y sacar productos del carrito */
  const { deleteItemToCart , addItemToCart} = useContext(CartContext);

  const { id } = item;

  return (
    <div>
      <img src={item.imagen} alt={item.denominacion} />
      <div>
        <div>
          <p>{item.denominacion}</p>
          <div>
            <button onClick={() => addItemToCart(item)}>
              AGREGAR
            </button>
            <button onClick={() => deleteItemToCart(item)}>
              SACAR
            </button>
          </div>
        </div>
        <div>
          <div>{item.amount}</div>
          <p>Total: ${item.amount * item.precio_venta}</p>
        </div>
      </div>
    </div>
  );
};