import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { CartContext } from '../../context/CartContext'
import './productos.css'
import './button.css'
import { Card } from 'react-bootstrap'
import { MDBBadge, MDBIcon, MDBNavbarItem, MDBNavbarLink } from 'mdb-react-ui-kit'

export const Productos = () => {

    const { cartItems } = useContext(CartContext)  
    const {addItemToCart} = useContext(CartContext) 
    const [data, setData] = useState([])

    const [productsLength, setProductsLength] = useState(0)
    useEffect(() => {
        setProductsLength(
            cartItems.reduce((previous, current) => previous + current.amount, 0)
        );
    }, [cartItems])

    const getData = async () => {
    const response = await axios.get('https://el-buen-sabor.herokuapp.com/carrito-completo-getAll')
    return response
    }   

    
    useEffect(() => {
    getData().then((response) => {
        setData(response.data)
    })
    },[])


    return (
        <>
            <MDBNavbarLink href='/carritos' className='btn-flotante'>
                <MDBBadge pill color='danger'>{productsLength}</MDBBadge>
                <span>
                <MDBIcon fas icon='shopping-cart'></MDBIcon>
                </span>
            </MDBNavbarLink>
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
    </>
    )
}

