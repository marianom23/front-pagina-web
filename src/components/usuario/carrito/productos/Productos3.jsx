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

  
        <div class = "main-container">
            <h2>Categorías</h2>
            {/* <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut, velit.</p> */}
            <div class = "filter-container">
                <div class = "category-head">
                    <ul>
                        <div class = "category-title active" id = "all">
                            <li>All</li>
                            <span><i class = "fas fa-border-all"></i></span>
                        </div>
                        <div class = "category-title" id = "culture">
                            <li>Culture</li>
                            <span><i class = "fas fa-theater-masks"></i></span>
                        </div>
                        <div class = "category-title" id = "politics">
                            <li>Politics</li>
                            <span><i class = "fas fa-landmark"></i></span>
                        </div>
                        <div class = "category-title" id = "finance">
                            <li>Finance</li>
                            <span><i class = "fas fa-chart-area"></i></span>
                        </div>
                        <div class = "category-title" id = "business">
                            <li>Business</li>
                            <span><i class = "fas fa-coins"></i></span>
                        </div>
                        <div class = "category-title" id = "sports">
                            <li>Sports</li>
                            <span><i class = "fas fa-running"></i></span>
                        </div>
                    </ul>
                </div>
                <div class = "posts-collect">
                    <div class = "posts-main-container">
                        {data.map(
                            (info) => (
                                (
                                <div class = "all business">
                                    <div class = "post-img">
                                        <img src = {info.imagen} alt = {info.denominacion}/>
                                        <span class = "category-name">Comida</span>
                                    </div>
        
                                    <div class = "post-content">
                                        <div class = "post-content-top">
                                            <span><i class = "fas fa"></i>$ {info.precio_venta}</span>
                                            <span>
                                                <i class = "fas fa"></i>Tiempo: {info.tiempo_estimado_cocina}
                                            </span>
                                        </div>
                                        <h2>{info.denominacion}</h2>
                                        {/* <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusamus recusandae aspernatur possimus illum, repellat ad quasi earum, illo voluptatibus minima fugiat saepe magni corporis vero eius accusantium quidem, consectetur nesciunt!</p> */}
                                    </div>
                                    <button type = "button" class = "read-btn" onClick={() => addItemToCart(info)}>Añadir al carro</button>
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
