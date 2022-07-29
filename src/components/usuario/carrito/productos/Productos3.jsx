import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { CartContext } from '../../context/CartContext'
import './productos3.css'
import './productos.css'
import { Card } from 'react-bootstrap'
import { MDBBadge, MDBIcon, MDBNavbarItem, MDBNavbarLink } from 'mdb-react-ui-kit'


export const Productos3 = () => {

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

  
        <div className = "main-container">
            <h2>Categorías</h2>
            {/* <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut, velit.</p> */}
            <div className = "filter-container">
                <div className = "category-head">
                    <ul>
                        <div className = "category-title active" id = "all">
                            <li>All</li>
                            <span><i className = "fas fa-border-all"></i></span>
                        </div>
                        <div className = "category-title" id = "culture">
                            <li>Culture</li>
                            <span><i className = "fas fa-theater-masks"></i></span>
                        </div>
                        <div className = "category-title" id = "politics">
                            <li>Politics</li>
                            <span><i className = "fas fa-landmark"></i></span>
                        </div>
                        <div className = "category-title" id = "finance">
                            <li>Finance</li>
                            <span><i className = "fas fa-chart-area"></i></span>
                        </div>
                        <div className = "category-title" id = "business">
                            <li>Business</li>
                            <span><i className = "fas fa-coins"></i></span>
                        </div>
                        <div className = "category-title" id = "sports">
                            <li>Sports</li>
                            <span><i className = "fas fa-running"></i></span>
                        </div>
                    </ul>
                </div>
                <div className = "posts-collect">
                    <div className = "posts-main-container">
                        {data.map(
                            (info) => (
                                (
                                <div className = "all business">
                                    <div className = "post-img">
                                        <img src = {info.imagen} alt = {info.denominacion}/>
                                        <span className = "category-name">Comida</span>
                                    </div>
        
                                    <div className = "post-content">
                                        <div className = "post-content-top">
                                            <span><i className = "fas fa"></i>$ {info.precio_venta}</span>
                                            <span>
                                                <i className = "fas fa"></i>Tiempo: {info.tiempo_estimado_cocina}
                                            </span>
                                        </div>
                                        <h2>{info.denominacion}</h2>
                                        {/* <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusamus recusandae aspernatur possimus illum, repellat ad quasi earum, illo voluptatibus minima fugiat saepe magni corporis vero eius accusantium quidem, consectetur nesciunt!</p> */}
                                    </div>
                                    <button type = "button" className = "read-btn" onClick={() => addItemToCart(info)}>Añadir al carro</button>
                                </div>                              
                                )
                            )
                        )}  
                     </div>    
                </div>
            </div>
        </div>
        
         </>
  )
}
