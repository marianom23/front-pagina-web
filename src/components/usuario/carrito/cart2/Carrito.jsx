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


export const Carrito = () => { 

    const { cartItems } = useContext(CartContext)  
    const [productsLength, setProductsLength] = useState(0)
    const navigate = useNavigate()
    const [showModal, setShowModal] = useState(false)
    const [showDomicilio, setShowDomicilio] = useState(false)
    const [first, setfirst] = useState()
    const handleCloseModal = () => {setShowModal(false)}
    const handleOpenModal = () => {setShowModal(true)}
    const [dataPedido, SetDataPedido] = useState({ 
        estado: 1,
        hora_estimada_fin: "",
        detalle_envio: "",
        tipo_envio: "",
        id_domicilio: "",
        id_cliente: ""})

    const handleChange = ({target}) => {
        if (target.value === "2") {
            setShowDomicilio(true)
        }else{
            setShowDomicilio(false)
        }
        SetDataPedido({
            ...dataPedido,
            [target.name]: target.value,
        })
    }
    

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

    
    async function mercadopago() {
    if (cartItems.length > 0) {
        const user = {
            id: Number(localStorage.getItem("id")),
            nombre: localStorage.getItem("nombre"),
            email: localStorage.getItem("email"),
            type_identification: localStorage.getItem("type_identification"),
            number_identification: localStorage.getItem("number_identification"),
        }
        const dataSendMP = {
            producto_mercado_pago: cartItems,
            usuario: user,
        }
        console.log(dataSendMP)
        try {
            const resp = await fetch("https://el-buen-sabor.herokuapp.com/mercado-pago/pagar", {
                method: "POST",
                body: JSON.stringify(dataSendMP),
                headers: {
                    "Content-Type": "application/json"
                }
            })

            if (resp.status !== 200) {
                window.alert("Error al pagar. \nIntentelo nuevamente más tarde")
            }
            const preference = await resp.json();


            // Esto es lo que necesitamos hacer :: Llamar a la api de mercadopago
            // npm install mercadopago
            // luego importarla para poder utilizarla y enviar una preference.

            // const responseMP = await mercadopago.preferences.create(preference)
            // console.log("responseMP", responseMP)
            // const respMP = await mercadopago.preferences
            
            var script = document.createElement("script");
            console.log("preference:", preference)
            console.log("script", script)
            console.log("script.dataset", script.dataset)
            
            // The source domain must be completed according to the site for which you are integrating.
            // For example: for Argentina ".com.ar" or for Brazil ".com.br".
            script.src = "https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js";
            script.type = "text/javascript";


            script.dataset.preferenceId = preference.id;
            // console.log("preference.init_point", preference.init_point)
            // script.src = preference.init_point;
            // script.type = "text/html";
            // document.getElementById("cartContainer").innerHTML = `<button onclick="location.href='${script.src}'" type="button">
            // Pagar MercadoPago</button>`;

            document.getElementById("cartContainer").innerHTML = "";
            
            document.querySelector("#cartContainer").appendChild(script);

            console.log("Todo bien")
            console.log("Preference ID:", script.dataset.preferenceId)
        } catch {
            window.alert("Error al pagar. \nIntentelo nuevamente más tarde")
        }
    } else {
        window.alert("No se encontraron artículos en el carrito.")

    }


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


    let metodoPago=null;
    const modoPago = (valor) => {
        metodoPago = valor;
    } 

    const handleSubmit = async (e) => {
        // handleCloseModal()
        e.preventDefault()
        mercadopago()

    
        const pedidos = {
            pedido: {
                estado: 1,
                hora_estimada_fin: "",
                detalle_envio: dataPedido.detalle_envio,
                tipo_envio: 1,
                id_domicilio: 1,
                id_cliente: 1
            },
            detalle_pedido
        }
        const res = await axios.put('https://el-buen-sabor.herokuapp.com/generar-pedido', pedidos)
        if (res.status === 200) {
            alert('Articulo pedido con exito')
        } else {
            alert('Error al intentar editar un articulo manufacturado')
        }
    }


    const pago = () =>{
        // Swal.fire({
        //     title: "10% de descuento pagando en efectivo",
        //     text: `¿Como deseas obtener tu pedido?`,
        //     icon: "warning",
        //     showDenyButton: true,
        //     denyButtonText: 'Retiro en el local (Efectivo o Mercado Pago)',
        //     confirmButtonText: 'Envio a domicilio (Solo Mercado Pago)',
        // }).then(result => {
        //     if (result.isConfirmed) {
        //         Swal.fire('Proceda a rellenar sus datos').then(
        //             handleOpenModal(),
        //             handleSubmit()
        //         )
        //     } else if(result.isDenied){
        //         Swal.fire({
        //             title: "10% de descuento pagando en efectivo",
        //             text: `¿Como deseas pagar tu pedido?`,
        //             icon: "warning",
        //             showDenyButton: true,
        //             denyButtonText: 'Mercado Pago',
        //             confirmButtonText: 'Efectivo',
        //         }).then(result => {
        //             if (result.isConfirmed){
        //                 Swal.fire('Lo esperamos').then(
        //                     handleSubmit(false)
        //                 )
        //             } else if (result.isDenied){
        //                 Swal.fire('Proceda a pagar').then(
        //                     handleSubmit()
        //                 )
        //             }
        //         })
        //     }
        // })
        handleOpenModal()
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
            {/* <div class="totals-item">
            <label>Subtotal</label>
            <div class="totals-value" id="cart-subtotal">71.97</div>
            </div>
            <div class="totals-item">
            <label>Descuento (10%)</label>
            <div class="totals-value" id="cart-tax">3.60</div>
            </div> */}
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
                        
                        <p>Pago con efectivo 10% de descuento</p>
                        <div className="select">
                            <select onChange={handleChange} name="detalle_envio">
                                <option selected disabled>Metodo de pago</option>
                                {options2.map(obj =>
                                    <option key={obj.id} value={obj.value} >{obj.label}</option>
                                )}
                            </select>
                        </div>

                        <br/>
                        
                        <p>Envios a domicilio solo se acepta mercado pago</p>
                        <div className="select">
                            <select onChange={handleChange} name="tipo_envio">
                                <option selected disabled>Forma de envío</option>
                                {options.map(obj =>
                                    <option key={obj.id} value={obj.value} >{obj.label}</option>
                                )}
                            </select>
                        </div>

                        <br/>

                        {
                            (showDomicilio ?
                            <>
                                <p>Elija su domicilio</p>
                                <div className="select">
                                    <select onChange={handleChange} name="tipo_envio">
                                        <option selected disabled>Elegir domicilio</option>
                                        {options.map(obj =>
                                            <option key={obj.id} value={obj.value} >{obj.label}</option>
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
