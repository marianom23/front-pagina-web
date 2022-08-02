import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './productos.css'
import { Link, useNavigate, useParams } from 'react-router-dom'
import useUser from '../../hooks/useUser'
import { NavbarUsuario } from '../nav/NavbarUsuario'
import './grillaPedido.css'

export const PedidosCliente = () => {

    let navigate = useNavigate();
    const {usuario} = useUser()
    console.log(usuario)
  
  
    useEffect(() => {
      if (usuario !== null) {
          if (usuario.rol === 100 || usuario.rol === 500) {
              alert('Bienvenido')
            }else{
              alert('Tienes que logearte como usuario para acceder')
              navigate("/login", { replace: true });
            }   
      }else{
          alert('Tienes que logearte como usuario para acceder')
          navigate("/login", { replace: true });
      }
    }, [])


    const {idCliente} = useParams();
    const [data, setData] = useState([])
    const getData = async () => {
        const response = await axios.get(`https://el-buen-sabor.herokuapp.com/pedido/byCliente/${idCliente}`)
        console.log(response)
        return response
    }   

    useEffect(() => {
    getData().then((response) => {
        setData(response.data.map(function iterateItems(item) {
            return item;
          }).reverse())
    })
    },[])

    

    return (
        <>
            <NavbarUsuario/>

            <br />

            <h1>Grilla de Pedidos</h1>

            <table id="rwd-table-large">
            <thead>
                <tr>
                    <th>Pedido numero:</th>
                    <th>Estado</th>
                    <th>Hora estimada fin</th>
                    <th>Fecha del pedido</th>
                </tr>
            </thead>
            <tbody>
                {
                data.map(
    
                    (info)=>{
                        return(
                            <tr key={info.id}>
                                <td>{info.id}</td>
                                {info.estado === 1 ? 
                                    <td >En espera de aprobacion</td>
                                 : info.estado === 7 ?
                                    <td tyle={{ color: "rgb(158, 244, 5)"}}>Aprobado en falta de pago</td>
                                 : info.estado === 2 ?
                                    <td>Aprobado</td> 
                                 : info.estado === 3 ?
                                    <td>En cocina</td> 
                                 : info.estado === 4 ?
                                    <td>El delivery esta en camino</td>   
                                 : info.estado === 5 ?
                                    <td>El pedido esta terminado</td>
                                 :  info.estado === 6 ?
                                    <td>El pedido fue rechazado</td>  
                                 :
                                 ""    
                                }
                                {info.estado === 5 ?
                                    <td>-----------------</td>
                                 : info.estado === 6 ?
                                    <td>-----------------</td>
                                 : 
                                    <td>{info.hora_estimada_fin}</td>                                  
                                }
                                <td>{info.imagen}</td>
                                <td>
                                {
                                    info.estado === 7 ?
                                    <div className="mb-3">
                                    <button onClick={()=>navigate(`/detalle-pedido-cliente-pago/${info.id}`)} className="btn btn-warning">Ver detalle / Pagar</button>
                                    </div>
                                    : info.estado === 6 ?
                                    <div className="mb-3">
                                    <button onClick={()=>navigate(`/detalle-pedido-cliente/${info.id}`)} className="btn btn-danger">Ver detalle</button>
                                    </div>
                                    : info.estado === 5 ?
                                    <div className="mb-3">
                                    <button onClick={()=>navigate(`/factura/${info.id}`)} className="btn btn-success">Ver factura</button>
                                    </div>
                                    :
                                    <div className="mb-3">
                                    <button onClick={()=>navigate(`/detalle-pedido-cliente/${info.id}`)} className="btn btn-warning">Ver detalle</button>
                                    </div>
                                }   
                                </td>
                                
                            </tr>
                        )
                    }
                ) 
                }                   
            </tbody>
            </table>

            {/* <h1>Pedidos en curso</h1>
            
            <div className='wrapper'>
            {         
                data.map(      
                    (info)=>(          
                        (info.estado === 1 && info.estado === 2 && info.estado === 3 && info.estado === 4  ? 
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
            </div> */}
            

    </>
    )
}

