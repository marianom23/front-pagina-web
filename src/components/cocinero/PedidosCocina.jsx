import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import './productos.css'
import { Link } from 'react-router-dom'


export const PedidosCocina = () => {

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
    <div className='wrapper'>
        {         
            data.map(      
                (info)=>(          
                    (info.estado === 2 ? 
                        <div className="card" key={info.id}>
                            <img src="assets/pedidoPendiente.png" alt={info.denominacion} className="card__img" />
                            <div className="card__body">
                            <h2 className="card__title">Pedido {info.id}</h2>
                            <p className="card__description">{info.tiempo_estimado_cocina} minutos</p>
                            <h3 className="card__price">{info.precio_venta}</h3>
                            <Link className="card__btn" to={`/detalle-pedido/${info.id}`}>
                                    Ver detalle    
                            </Link> 
                            <button className="card__btn" onClick={() => cambiarEstado(3,info.id)}>Terminar</button>
                            </div>
                        </div>      
                    :
                        ""
                    )

                )
            )
        }
    </div>
  )
}
