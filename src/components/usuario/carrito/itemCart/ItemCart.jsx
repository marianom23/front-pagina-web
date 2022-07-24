import React, { useContext } from "react";
import { CartContext } from '../../context/CartContext'
import "./carrito.css";

export const ItemCart = ({ item }) => {
  /* Traemos del context las funciones para agregar y sacar productos del carrito */
  const { deleteItemToCart , addItemToCart} = useContext(CartContext);

  const { id } = item;

  return (
    <div class="product">
      <div>
        <div class="product-image">
        <img src={item.imagen}/>
        </div>
        <div class="product-details">
        <div class="product-title">{item.denominacion}</div>
        <p class="product-description">Productos de calidad</p>
        </div>
        <div class="product-price">{item.precio_venta}</div>
        <div class="product-quantity">
        <input type="number" value={item.amount} min="1"/>
        </div>
        <div class="product-removal">
        <button onClick={() => deleteItemToCart(item)} class="remove-product">
            Remove
        </button>
        </div>
        <div class="product-line-price">{item.amount * item.precio_venta}</div>
      </div>
    </div>
  );
};