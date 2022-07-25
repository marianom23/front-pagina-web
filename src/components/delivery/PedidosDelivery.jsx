import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import './productos.css'
import { Link, useNavigate } from 'react-router-dom'
import useUser from '../hooks/useUser'

export const PedidosDelivery = () => {

    let navigate = useNavigate();
    const {usuario} = useUser();
  
    useEffect(() => {
        if (usuario !== null) {
            if (usuario.rol === 300 || usuario.rol === 500) {
                alert('Bienvenido')
              }else{
                alert('Tienes que logearte como delivery para acceder')
                navigate("/login", { replace: true });
              }   
        }else{
            alert('Tienes que logearte como delivery para acceder')
            navigate("/login", { replace: true });
        }
    }, [])

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


  

  return (
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
                            <button className="card__btn" onClick={() => cambiarEstado(5,info.id)}>Entregado</button>
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
