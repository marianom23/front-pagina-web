import React, { useContext } from "react";
import { CartContext } from '../../context/CartContext'
import "./carrito.css";

export const ItemCart = ({ item }) => {
  /* Traemos del context las funciones para agregar y sacar productos del carrito */
  const { deleteItemToCart , addItemToCart} = useContext(CartContext);

  const { id } = item;

  return (
    <div className="product">
      <div>
        <div className="product-image">
        <img src={item.imagen}/>
        </div>
        <div className="product-details">
        <div className="product-title">{item.denominacion}</div>
        <p className="product-description">Productos de calidad</p>
        </div>
        <div className="product-price">{item.precio_venta}</div>
        <div className="product-quantity">
        <input type="number" value={item.amount} min="1"/>
        </div>
        <div>
        <button onClick={() => addItemToCart(item)} className="add-product">
            Agregar
        </button>
        </div>
        <div className="product-removal">
        <button onClick={() => deleteItemToCart(item)} className="remove-product">
            Quitar
        </button>
        </div>
        <div className="product-line-price">{item.amount * item.precio_venta}</div>
      </div>
    </div>
  );
};