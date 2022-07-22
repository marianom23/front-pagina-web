import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import './productos.css'
import { ItemPedido } from './ItemPedido'

export const PedidosPendientes = () => {

    const [data, setData] = useState([])

    const getData = async () => {
    const response = await axios.get('https://el-buen-sabor.herokuapp.com/pedido/getAll')
    console.log(response)
    return response
    }   

    useEffect(() => {
    getData().then((response) => {
        setData(response.data)
    })
    },[])

    const verDetalle = (id) => {

    }


    return (
        <>
        <h1>Pedidos de caja</h1>
        <div className='wrapper'>
        {         
            data.map(      
                (info)=>(          
                    (info.estado === 2 ? 
                        <div className="card" key={info.id}>
                            <img src="assets/pedidoDenegado.png" alt={info.denominacion} className="card__img" />
                            <div className="card__body">
                            <h2 className="card__title">{info.denominacion}</h2>
                            <p className="card__description">{info.tiempo_estimado_cocina} minutos</p>
                            <h3 className="card__price">{info.precio_venta}</h3>
                            <button className="card__btn" onClick={() => verDetalle(info.id)}>Ver detalle</button>
                            <button className="card__btn">Aprobar</button>
                            <button className="card__btn">No aprobar</button>
                            </div>
                        </div>      
                    :
                    info.estado === 1 ?
                    <div className="card" key={info.id}>
                        <img src="assets/pedidoAceptado.jpg" alt={info.denominacion} className="card__img" />
                        <div className="card__body">
                        <h2 className="card__title">{info.denominacion}</h2>
                        <p className="card__description">{info.tiempo_estimado_cocina} minutos</p>
                        <h3 className="card__price">{info.precio_venta}</h3>
                        <button className="card__btn" onClick={() => verDetalle(info.id)}>Ver detalle</button>
                        <button className="card__btn">Aprobar</button>
                        <button className="card__btn">No aprobar</button>
                        </div>
                    </div>    
                    :
                    <div className="card" key={info.id}>
                        <img src="assets/pedidoTerminado.jpg" alt={info.denominacion} className="card__img" />
                        <div className="card__body">
                        <h2 className="card__title">{info.denominacion}</h2>
                        <p className="card__description">{info.tiempo_estimado_cocina} minutos</p>
                        <h3 className="card__price">{info.precio_venta}</h3>
                        <button className="card__btn" onClick={() => verDetalle(info.id)}>Ver detalle</button>
                        <button className="card__btn">Aprobar</button>
                        <button className="card__btn">No aprobar</button>
                        </div>
                    </div>     
                    )

                )
            )
        }     

        </div>
    </>
    )
}

