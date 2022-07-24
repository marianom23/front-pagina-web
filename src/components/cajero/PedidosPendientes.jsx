import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import './productos.css'
import { Link } from 'react-router-dom'


export const PedidosPendientes = () => {

    const [data, setData] = useState([])

    const getData = async () => {
        const response = await axios.get('https://el-buen-sabor.herokuapp.com/pedido/getAll')
        console.log(response)
        return response
    }   

    const cambiarEstado =  async (numero, id) => {
        const pedido = {
            "id_pedido":id,
            "estado":numero
        }
        const response = await axios.put('https://el-buen-sabor.herokuapp.com/pedido/update-estado', pedido)
        console.log(response)
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
        <h1>Pedidos pendiente de aprobacion</h1>
            <div className='wrapper'>
            {         
                data.map(      
                    (info)=>(          
                        (info.estado === 1 ? 
                            <div className="card" key={info.id}>
                                <img src="assets/pedidoPendiente.png" alt={info.denominacion} className="card__img" />
                                <div className="card__body">
                                <h2 className="card__title">Pedido {info.id}</h2>
                                <p className="card__description">{info.tiempo_estimado_cocina} minutos</p>
                                <h3 className="card__price">{info.precio_venta}</h3>
                                <Link className="card__btn" to={`/detalle-pedido/${info.id}`}>
                                    Ver detalle    
                                </Link> 
                                <button className="card__btn" onClick={() => cambiarEstado(2, info.id)}>Aprobar</button>
                                <button className="card__btn" onClick={() => cambiarEstado(6, info.id)}>No aprobar</button>
                                </div>
                            </div>      
                        :
                            ""
                        )

                    )
                )
            }
            </div>     
            <h1>Pedidos en Cocina</h1>
            <div className='wrapper'>
            {         
                data.map(      
                    (info)=>(          
                        (info.estado === 2 ? 
                            <div className="card" key={info.id}>
                                <img src="assets/pedidoCocinero.jpg" alt={info.denominacion} className="card__img" />
                                <div className="card__body">
                                <h2 className="card__title">Pedido {info.id}</h2>
                                <p className="card__description">{info.tiempo_estimado_cocina} minutos</p>
                                <h3 className="card__price">{info.precio_venta}</h3>
                                <Link className="card__btn" to={`/detalle-pedido/${info.id}`}>
                                    Ver detalle    
                                </Link> 
                                </div>
                            </div>      
                        :
                            ""
                        )

                    )
                )
            } 
            </div>     
            <h1>Pedidos en espera de entrega</h1>
            <div className='wrapper'>
            {         
                data.map(      
                    (info)=>(          
                        (info.estado === 3 ? 
                            //cambio
                            (info.tipo_envio === 2 ?
                             <div className="card" key={info.id}>
                                <img src="assets/pedidoAceptado.jpg" alt={info.denominacion} className="card__img" />
                                <div className="card__body">
                                <h2 className="card__title">Pedido {info.id}</h2>
                                <p className="card__description">{info.tiempo_estimado_cocina} minutos</p>
                                <h3 className="card__price">{info.precio_venta}</h3>
                                <Link className="card__btn" to={`/detalle-pedido/${info.id}`}>
                                    Ver detalle    
                                </Link> 
                                <button className="card__btn" onClick={() => cambiarEstado(4, info.id)}>Entregar al delivery</button>
                                </div>
                            </div> 
                            :
                            <div className="card" key={info.id}>
                                <img src="assets/pedidoAceptado.jpg" alt={info.denominacion} className="card__img" />
                                <div className="card__body">
                                <h2 className="card__title">Pedido {info.id}</h2>
                                <p className="card__description">{info.tiempo_estimado_cocina} minutos</p>
                                <h3 className="card__price">{info.precio_venta}</h3>
                                <Link className="card__btn" to={`/detalle-pedido/${info.id}`}>
                                    Ver detalle    
                                </Link> 
                                <button className="card__btn" onClick={() => cambiarEstado(5, info.id)}>Entregar al cliente</button>
                                </div>
                            </div>    
                            )
                        : 
                            ""
                        )

                    )
                )
            }
            </div>
            <h1>Pedidos en camino</h1>
            <div className='wrapper'>
            {         
                data.map(      
                    (info)=>(          
                        (info.estado === 4 ? 
                            <div className="card" key={info.id}>
                                <img src="assets/pedidoDelivery.jpg" alt={info.denominacion} className="card__img" />
                                <div className="card__body">
                                <h2 className="card__title">Pedido {info.id}</h2>
                                <p className="card__description">{info.tiempo_estimado_cocina} minutos</p>
                                <h3 className="card__price">{info.precio_venta}</h3>
                                <Link className="card__btn" to={`/detalle-pedido/${info.id}`}>
                                    Ver detalle    
                                </Link> 
                                </div>
                            </div>      
                        :
                            ""
                        )

                    )
                )
            } 
            </div>
            <h1>Pedidos facturados</h1>
            <div className='wrapper'>
            {         
                data.map(      
                    (info)=>(          
                        (info.estado === 5 ? 
                            <div className="card" key={info.id}>
                                <img src="assets/pedidoTerminado.jpg" alt={info.denominacion} className="card__img" />
                                <div className="card__body">
                                <h2 className="card__title">Pedido {info.id}</h2>
                                <p className="card__description">{info.tiempo_estimado_cocina} minutos</p>
                                <h3 className="card__price">{info.precio_venta}</h3>
                                <Link className="card__btn" to={`/detalle-pedido/${info.id}`}>
                                    Ver detalle    
                                </Link> 
                                </div>
                            </div>      
                        :
                            ""
                        )

                    )
                )
            }       
            </div>
            <h1>Pedidos Denegados</h1>
            <div className='wrapper'>
            {         
                data.map(      
                    (info)=>(          
                        (info.estado === 6 ? 
                            <div className="card" key={info.id}>
                                <img src="assets/pedidoDenegado.png" alt={info.denominacion} className="card__img" />
                                <div className="card__body">
                                <h2 className="card__title">Pedido {info.id}</h2>
                                <p className="card__description">{info.tiempo_estimado_cocina} minutos</p>
                                <h3 className="card__price">{info.precio_venta}</h3>
                                <Link className="card__btn" to={`/detalle-pedido/${info.id}`}>
                                    Ver detalle    
                                </Link> 
                                </div>
                            </div>      
                        :
                            ""
                        )

                    )
                )
            }       
            </div>
            
    </>
    )
}

