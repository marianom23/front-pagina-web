import React, { useContext } from "react";
import { CartContext } from '../../context/CartContext'
import styles from "./styles.module.scss";

export const ItemCart = ({ item }) => {
  /* Traemos del context las funciones para agregar y sacar productos del carrito */
  const { deleteItemToCart , addItemToCart} = useContext(CartContext);

  const { id } = item;

  return (
    <div className={styles.cartItem}>
      <img src={item.imagen} alt={item.denominacion} />
      <div className={styles.dataContainer}>
        <div className={styles.left}>
          <p>{item.denominacion}</p>
          <div className={styles.buttons}>
            <button onClick={() => addItemToCart(item)}>
              AGREGAR
            </button>
            <button onClick={() => deleteItemToCart(item)}>
              SACAR
            </button>
          </div>
        </div>
        <div className={styles.right}>
          <div>{item.amount}</div>
          <p>Total: ${item.amount * item.precio_venta}</p>
        </div>
      </div>
    </div>
  );
};