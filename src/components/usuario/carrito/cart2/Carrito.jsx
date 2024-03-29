import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../context/CartContext'
import { useNavigate } from 'react-router-dom';
import { NavbarUsuario } from '../../nav/NavbarUsuario'
import { ItemCart } from '../itemCart/ItemCart'
import './select.css'
import { Form, Modal } from 'react-bootstrap';
import axios from 'axios'
import Swal from 'sweetalert2'
import Cookies from 'universal-cookie'
import "./carrito.css"
import useUser from '../../../hooks/useUser';


export const Carrito = () => { 

    const {usuario} = useUser()
    const id = usuario.id
    const { cartItems } = useContext(CartContext)  
    const [productsLength, setProductsLength] = useState(0)
    const navigate = useNavigate()
    const [showModal, setShowModal] = useState(false)
    const [showDomicilio, setShowDomicilio] = useState(false)
    const [showMetodoPago, setShowMetodoPago] = useState(false)
    const [first, setfirst] = useState()
    const handleCloseModal = () => {setShowModal(false)}
    const handleOpenModal = () => {setShowModal(true)}
    const [domicilio, setDomicilio] = useState()
    const [dataPedido, SetDataPedido] = useState({ 
        estado: 1,
        hora_estimada_fin: "",
        detalle_envio: "mercadopago",
        tipo_envio: "",
        id_domicilio: "",
        id_cliente: {id}
    })

    const handleChange = ({target}) => {
        if (target.value === "1") {
            setShowMetodoPago(true)
            setShowDomicilio(false)
        }else if (target.value === "2"){
            setShowMetodoPago(false)
            setShowDomicilio(true)
        }

        SetDataPedido({
            ...dataPedido,
            [target.name]: target.value,
        })
    }
    
    const getDomicilio = async () => {
        const data = await axios.get(`https://el-buen-sabor.herokuapp.com/domicilio/${usuario.id}`)
        return data;
    }

    React.useEffect(() => {
        getDomicilio().then((response) => {
            setDomicilio(response.data)
        })
    }, [])

    const options = [
        { value: 2, label: 'Envio a domicilio' },
        { value: 1, label: 'Retiro en el local' },
      ]
    const options2 = [
        { value: 'efectivo', label: 'Efectivo' },
        { value: 'mercadopago', label: 'Mercado Pago' },
      ]

    useEffect(() => {
    setProductsLength(
        cartItems.reduce((previous, current) => previous + current.amount, 0)
    );
    }, [cartItems])

    const total = cartItems.reduce(
    (previous, current) => previous + current.amount * current.precio_venta, 0);

    const handleReturn = () => {
        navigate(-1)
    }

    const detallesPruebas = JSON.parse(localStorage.getItem("cartProducts"));


    const detalle_pedido = detallesPruebas.map(
        (info) => (
            {
                cantidad: info.amount,
                subtotal: info.precio_venta,
                id: info.id,
                es_bebida: info.es_bebida,
                tiempo_estimado: info.tiempo_estimado 
            }
        )
    )

    const handleSubmit = async (e) => {

        handleCloseModal()
        e.preventDefault()
        const pedidos = {
            pedido: {
                estado: 1,
                hora_estimada_fin: "2021-02-18T21:54:42.123Z",
                detalle_envio: dataPedido.detalle_envio,
                tipo_envio: Number(dataPedido.tipo_envio),
                id_domicilio: Number(dataPedido.id_domicilio),
                id_cliente: id
            },
            detalle_pedido
        }
        try {
            const res = await axios.put('https://el-buen-sabor.herokuapp.com/generar-pedido', pedidos)
            alert('Articulo pedido con exito')
        } catch (error) {
            alert('Lo siento, nuestro horario de atencion es de 20:00 a 00:00 horas')
        }
    }

    
    return (
        <>
        <NavbarUsuario/>
        
        <br/>

        <h1>Shopping Cart</h1>

        <div className="shopping-cart">

        <div className="column-labels">
            <label className="product-image">Image</label>
            <label className="product-details">Product</label>
            <label className="product-price">Price</label>
            <label className="product-quantity">Quantity</label>
            <label className="product-removal">Remove</label>
            <label className="product-line-price">Total</label>
        </div>

        {cartItems.map((item, i) => (
            <ItemCart key={i} item={item} />
            ))}
      
        <div className="totals">
            <div className="totals-item totals-item-total">
            <label>Total</label>
            <div className="totals-value" id="cart-total">{total}</div>
            </div>
        </div>
            {
                (cartItems.length > 0 ? 
                    <button onClick={() => handleOpenModal()} id="checkout" className="checkout">Checkout</button> 
                    :
                    ""      
                )
            }
        </div>

            <button onClick={handleReturn} className="btn btn-success">Regresar</button>


        <Modal show={showModal}>
                <Modal.Title>--------¿Como desea obtener su pedido?---------</Modal.Title>
                <Form>
                    <Modal.Body>
                        

                                                
                        <p>Envios a domicilio solo acepta mercado pago, pago con efectivo tiene 10% de descuento.</p>

                        <p>Elegir forma de envío:</p>
                        <div className="select">
                            <select onChange={handleChange} name="tipo_envio">
                                <option selected disabled>Forma de envío</option>
                                {options.map(obj =>
                                    <option key={obj.id} value={obj.value} >{obj.label}</option>
                                )}
                            </select>
                        </div>
                      

                        {
                            
                            (showMetodoPago ?
                            <>
                                <br/>
                                <div className="select">
                                    <select onChange={handleChange} name="detalle_envio">
                                        <option selected disabled>Metodo de pago</option>
                                        {options2.map(obj =>
                                            <option key={obj.id} value={obj.value} >{obj.label}</option>
                                        )}
                                    </select>
                                </div>
                            </>
                            :
                            ""
                            )
                        }

                        <br/>

                        {
                            (showDomicilio ?
                            <>
                                <p>Forma de pago</p>
                                <div className="select">
                                    <select value="mercadopago" onChange={handleChange} name="detalle_envio">
                                        <option value="mercadopago" selected>Mercado Pago</option>
                                    </select>
                                </div>      

                                <br/>  

                                <p>Elija su domicilio</p>
                                <div className="select">
                                    <select onChange={handleChange} name="id_domcilio">
                                        <option selected disabled>Elegir domicilio</option>
                                        {domicilio.map(obj =>
                                            <option key={obj.id} value={obj.id} >{obj.calle} {obj.numero} {obj.localidad}</option>
                                        )}
                                    </select>
                                </div>
                            </>    
                            :
                            ""
                            )
                        }
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-danger" onClick={handleCloseModal}>
                            Cancelar
                        </button>
                        <button className="btn btn-success" type="submit" onClick={handleSubmit}>
                            Pedir 
                        </button>
                    </Modal.Footer>
                </Form>
        </Modal>    
    </>
    )
}
