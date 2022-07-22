import React from 'react'
import './productos.css'

export const ItemPedido = (info, estado) => {



  return (

        {estado} (
        <div className="card" key={info.id}>
            <img src="assets/cocinero.jpg" alt={info.denominacion} className="card__img" />
            <div className="card__body">
            <h2 className="card__title">{info.denominacion}</h2>
            <p className="card__description">{info.tiempo_estimado_cocina} minutos</p>
            <h3 className="card__price">{info.precio_venta}</h3>
            <button className="card__btn">Aprobar</button>
            <button className="card__btn">No aprobar</button>
            </div>
        </div>      
        )
       
  )
}
