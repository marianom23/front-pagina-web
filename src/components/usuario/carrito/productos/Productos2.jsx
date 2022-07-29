import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { CartContext } from '../../context/CartContext'
import './productos2.css'
import './productos.css'
import { Card } from 'react-bootstrap'
import { MDBBadge, MDBIcon, MDBNavbarItem, MDBNavbarLink } from 'mdb-react-ui-kit'


export const Productos2 = () => {

    // const { cartItems } = useContext(CartContext)  
    // const {addItemToCart} = useContext(CartContext) 
    const [data, setData] = useState([])

    // const [productsLength, setProductsLength] = useState(0)
    // useEffect(() => {
    //     setProductsLength(
    //         cartItems.reduce((previous, current) => previous + current.amount, 0)
    //     );
    // }, [cartItems])

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
        <title>Product Category</title>
            <section className="category">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3">
                            <div>
                                <aside className="side-area product-side side-shadow mt-5">
                                    <div className="side-title">
                                        <h3>Nuestros productos</h3>
                                    </div>
                            <div className="side-content">
                                <ul className="list">
                                    <p>Comidas</p>
                                    <li>
                                    <a href="">Ver todas</a></li>
                                    <li>
                                    <a href="">Apple</a></li>
                                    <li>
                                    <a href="">Rolex</a></li>
                                    <li>
                                    <a href="">Rado</a></li>
                                    <li>
                                    <a href="">Seiko</a></li>
                                    <li>
                                    <a href="">Samsung</a></li>                                               
                                </ul>
                                <ul className="list">
                                    <p>Bebidas</p>
                                    <li>
                                    <a href="">Ver todas</a></li>
                                    <li>
                                    <a href="">Black</a></li>
                                    <li>
                                    <a href="">Black Leather</a></li>
                                    <li>
                                    <a href="">Black with Red</a></li>
                                    <li>
                                    <a href="">Gold</a></li>
                                    <li>
                                    <a href="">Space grey</a></li>          
                                </ul>
                            </div>
                                </aside>
                            </div>
                        </div>
                        <div className="col-lg-9">
                            <div className="row">
                                <div class="col-lg-12">
                                    <div className="product-top d-flex justify-content-between align-items-center">
                                        <div className="product-sec product-item">
                                            <h2 className="my-5">Watches</h2>
                                        </div>
                                    </div>
                                </div>
                                
                                            {data.map(
                                                (info) => (
                                                    (
                                                        <div className="col-lg-4 col-sm-6">
                                                            <div className="product-cate">
                                                            <div>
                                                            <img src={info.imagen} alt=""/>
                                                            <div className="product-icon">
                                                            <ul>
                                                            <li><a href=""><i className="fas fa-heart"></i></a> </li>
                                                            <li><a href=""><i className="fas fa-shopping-cart"></i></a> </li>
                                                            
                                                            </ul>
                                                            </div>
                                                            <div className="product-des">
                                                            <h5>{info.denominacion}</h5>
                                                            <p>$ {info.precio_venta}</p>
                                                            </div>
                                                            </div>
                                                            </div> 
                                                        {/* <div className="card" key={info.id}>
                                                        <img src={info.imagen} alt={info.denominacion} className="card__img" />
                                                        <div className="card__body">
                                                        <h2 className="card__title">{info.denominacion}</h2>
                                                        <p className="card__description">{info.tiempo_estimado_cocina} minutos</p>
                                                        <h3 className="card__price">{info.precio_venta}</h3> */}
                                                        {/* <button onClick={() => addItemToCart(info)} className="card__btn">Add to Cart</button> */}
                                                        {/* </div> */}
                                                        {/* </div>    */}
                                                        </div>
                                                    )
                                                )
                                            )}                                        
                                
                                <div className="col-lg-12 text-center">
                                    <a href=""className="product-btn">More Items</a>
                                </div> 
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            </>
  )
}
