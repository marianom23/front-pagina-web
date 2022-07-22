import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { CartContext } from '../../context/CartContext'
import './productos.css'
import { Card } from 'react-bootstrap'

export const Productos = () => {

    const {addItemToCart} = useContext(CartContext) 
    const [data, setData] = useState([])
    // const [data2, setData2] = useState([])

    const getData = async () => {
    const response = await axios.get('https://el-buen-sabor.herokuapp.com/carrito-completo-getAll')
    console.log(response)
    return response
    }   

    // const getData2 = async () => {
    // const response = await axios.get('https://el-buen-sabor.herokuapp.com/articulo-insumo/getAll')
    // return response
    // }   
    
    useEffect(() => {
    getData().then((response) => {
        setData(response.data)
    })
    },[])

    // useEffect(() => {
    // getData2().then((response) => {
    //     setData2(response.data)
    // })
    // },[])

    return (
        <div className='wrapper'>
        <h1>Comidas:</h1>
        
        {         
            data.map(      
                (info)=>(          
                    (info.es_bebida ? 
                        ""
                    :
                    <div className="card" key={info.id}>
                        <img src={info.imagen} alt={info.denominacion} className="card__img" />
                        <div className="card__body">
                        <h2 className="card__title">{info.denominacion}</h2>
                        <p className="card__description">{info.tiempo_estimado_cocina} minutos</p>
                        <h3 className="card__price">{info.precio_venta}</h3>
                        <button onClick={() => addItemToCart(info)} className="card__btn">Add to Cart</button>
                        </div>
                    </div>   
                    )
                )
            )
            // Object.values(data).map(
            //     (info) => (
            //         info.map(
            //             (item)=>(
            //                 <div className="card" key={item.id}>
            //                     <div>{console.log(item)}</div>
            //                     <img src={info.imagen} alt={item.articulo_manufacturado} className="card__img" />
            //                     <div className="card__body">
            //                     <h2 className="card__title">{item.articulo_manufacturado}</h2>
            //                     <p className="card__description">{item.tiempo_estimado_cocina} minutos</p>
            //                     <h3 className="card__price">{item.precio_venta}</h3>
            //                     <button onClick={() => addItemToCart(item)} className="card__btn">Add to Cart</button>
            //                     </div>
            //                 </div>  
            //             )
            //         )                                  
            //     )
            // )
            // Object.values(data).map(
            //     (info) => (
            //         <div>{info}</div>                               
            //     )
            // )
        }     
        <h1>Bebidas:</h1>
  
        {
            data.map(      
                (info)=>(          
                    (info.es_bebida ? 
                    <div className="card" key={info.id}>
                        <img src={info.imagen} alt={info.denominacion} className="card__img" />
                        <div className="card__body">
                        <h2 className="card__title">{info.denominacion}</h2>
                        <p className="card__description">{info.tiempo_estimado_cocina} minutos</p>
                        <h3 className="card__price">{info.precio_venta}</h3>
                        <button onClick={() => addItemToCart(info)} className="card__btn">Add to Cart</button>
                        </div>
                    </div>   
                    :
                        " "
                    )
                )
            )

        }

        </div>
    )
}

