import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'

export const DetallePedido = () => {

const {pedidoID} = useParams();
const navigate = useNavigate()
const [data, setData] = useState([])

const handleReturn = () => {
    navigate(-1)
}

const getData = async () => {
const response = await axios.get(`https://el-buen-sabor.herokuapp.com/detalle-pedido/${pedidoID}`)
console.log(response)
return response
}   

useEffect(() => {
    getData().then((response) => {
    setData(response.data)
    })
},[])
let total = 0;
data.forEach(info => {
    total += info.subtotal * info.cantidad
});




  return (
    <>
        <div className='wrapper'>
            {         
                data.map(      
                    (info)=>(          
                        <div className="card" key={info.id}>
                            <img src={info.imagen} alt={info.denominacion} className="card__img" />
                            <div className="card__body">
                            <h2 className="card__title"> {info.denominacion}</h2>
                            <p className="card__description">Cantidad: {info.cantidad}</p>
                            <p className="card__description">precio por unidad: {info.subtotal}</p>
                            <h3 className="card__price">total: {info.subtotal * info.cantidad}</h3>
                            </div>
                        </div>      
                    )
                )
            }
        </div>
        <h1>El total del pedido es de: {total}</h1>
        <button onClick={handleReturn}>Regresar</button>
    </>
  )
}