import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../context/CartContext'
import { useNavigate } from 'react-router-dom';
import { NavbarUsuario } from '../../nav/NavbarUsuario'
import { ItemCart } from '../itemCart/ItemCart'
import { Form, Modal } from 'react-bootstrap';
import axios from 'axios'
import Swal from 'sweetalert2'
import Cookies from 'universal-cookie'
import { mercadopago } from '../mercadopago/mercadopago';
import "./carrito.css"


export const Carrito = () => { 

    const { cartItems } = useContext(CartContext)  
    const [productsLength, setProductsLength] = useState(0)
    const navigate = useNavigate()
    const [showModal, setShowModal] = useState(false)
    const [dataModal, setDataModal] = useState({})
    const handleCloseModal = () => {setShowModal(false)}
    const handleOpenModal = () => {setShowModal(true)}

    const options = [
        { value: true, label: 'Envio a domicilio' },
        { value: false, label: 'Retiro en el local' },
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
                es_bebida: info.es_bebida 
            }
        )
    )

    const handleSubmit = async (e) => {
        handleCloseModal()
        mercadopago()
        e.preventDefault()
        const pedido = {
            pedido: {
                estado: 1,
                hora_estimada_fin: "2021-02-18T21:54:42.123Z",
                detalle_envio: "efectivo",
                tipo_envio: 1,
                id_domicilio: 1,
                id_cliente: 1
            },
            detalle_pedido
        }
        const res = await axios.put('https://el-buen-sabor.herokuapp.com/generar-pedido', pedido)
        if (res.status === 200) {
            alert('Articulo pedido con exito')
        } else {
            alert('Error al intentar editar un articulo manufacturado')
        }
    }

    const handleChange = ({target}) => {
        setDataModal({
            ...dataModal,
            [target.name]: target.value
        })
    }

    const pago = () =>{
        Swal.fire({
            title: "10% de descuento pagando en efectivo",
            text: `¿Como deseas obtener tu pedido?`,
            icon: "warning",
            showDenyButton: true,
            denyButtonText: 'Retiro en el local (Efectivo o Mercado Pago)',
            confirmButtonText: 'Envio a domicilio (Solo Mercado Pago)',
        }).then(result => {
            if (result.isConfirmed) {
                Swal.fire('Proceda a rellenar sus datos').then(
                    handleOpenModal(),
                )
            } else if(result.isDenied){
                Swal.fire({
                    title: "10% de descuento pagando en efectivo",
                    text: `¿Como deseas pagar tu pedido?`,
                    icon: "warning",
                    showDenyButton: true,
                    denyButtonText: 'Mercado Pago',
                    confirmButtonText: 'Efectivo',
                }).then(result => {
                    if (result.isConfirmed){
                        Swal.fire('Lo esperamos').then(
                            handleSubmit()
                        )

                    } else if (result.isDenied){
                        Swal.fire('Proceda a pagar').then(
                            handleSubmit()
                        )
                    }
                })
            }
        })
    }
    
    return (
        <>
        <NavbarUsuario/>
        
        <br/>

        <h1>Shopping Cart</h1>

        <div class="shopping-cart">

        <div class="column-labels">
            <label class="product-image">Image</label>
            <label class="product-details">Product</label>
            <label class="product-price">Price</label>
            <label class="product-quantity">Quantity</label>
            <label class="product-removal">Remove</label>
            <label class="product-line-price">Total</label>
        </div>

        {cartItems.map((item, i) => (
            <ItemCart key={i} item={item} />
            ))}


        <div class="totals">
            <div class="totals-item">
            <label>Subtotal</label>
            <div class="totals-value" id="cart-subtotal">71.97</div>
            </div>
            <div class="totals-item">
            <label>Descuento (5%)</label>
            <div class="totals-value" id="cart-tax">3.60</div>
            </div>
            {/* <div class="totals-item">
            <label>Shipping</label>
            <div class="totals-value" id="cart-shipping">15.00</div>
            </div> */}
            <div class="totals-item totals-item-total">
            <label>Total</label>
            <div class="totals-value" id="cart-total">{total}</div>
            </div>
        </div>
            
            <button onClick={pago} class="checkout">Checkout</button>
        </div>

            <button onClick={handleReturn}>Regresar</button>


        <Modal show={showModal}>
                <Modal.Title>Ingresar datos de su pedido</Modal.Title>
                <Form>
                    <Modal.Body>
                        <div className="mb-3">
                            <label htmlFor="domicilio_envio" className="form-label">Ingrese el domicilio de su envío</label>
                            <input value={dataModal.domicilio_envio} name="domicilio_envio" onChange={handleChange} type="text" id="domicilio_envio" className="form-control"/>
                        </div>
                        
                        <div className="select">
                            <select onChange={handleChange} name="tipo_envio">
                                <option selected disabled>Forma de envío</option>
                                {options.map(obj =>
                                    <option key={obj.id} value={obj.id} >{obj.label}</option>
                                )}
                            </select>
                        </div>

                        <br/>

                        <div className="select">
                            <select onChange={handleChange} name="tipo_envio">
                                <option selected disabled>Metodo de pago</option>
                                {options2.map(obj =>
                                    <option key={obj.id} value={obj.id} >{obj.label}</option>
                                )}
                            </select>
                        </div>

                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-secondary" onClick={handleCloseModal}>
                            Cancelar
                        </button>
                        <button className="btn btn-succes" type="submit" onClick={handleSubmit}>
                            Guardar 
                        </button>
                    </Modal.Footer>
                </Form>
        </Modal>    
    </>
    )
}
