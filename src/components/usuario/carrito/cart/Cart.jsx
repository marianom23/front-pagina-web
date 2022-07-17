import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../context/CartContext'
import { ItemCart } from '../itemCart/ItemCart'


import "./styles.css";

export const Cart = () => {

    const [cartOpen, setCartOpen] = useState(false)
    const [productsLength, setProductsLength] = useState(0)


    const { cartItems } = useContext(CartContext)

    async function pagar() {
        if (cartItems.length > 0) {
            const user = {
                id: Number(localStorage.getItem("id")),
                nombre: localStorage.getItem("nombre"),
                email: localStorage.getItem("email"),
                type_identification: localStorage.getItem("type_identification"),
                number_identification: localStorage.getItem("number_identification"),
            }
            const dataSendMP = {
                usuario: user,
                producto_mercado_pago: cartItems,
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


    useEffect(() => {
        setProductsLength(
            cartItems.reduce((previous, current) => previous + current.amount, 0)
        );
    }, [cartItems])

    const total = cartItems.reduce(
        (previous, current) => previous + current.amount * current.precio_venta, 0);

    return (
        <div className='cartContainer' id="cartContainer">
            <div onClick={() => setCartOpen(!cartOpen)}
                className='buttonCartContainer'
            >
                <div className='buttonCart'>
                    {!cartOpen ? (
                        <svg
                            className='open'
                            width={"31px"}
                            viewBox="0 0 30 27"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M29.733 6.64651C29.595 6.44711 29.4108 6.28414 29.196 6.17154C28.9813 6.05895 28.7425 6.00009 28.5 6.00001H7.9995L6.2685 1.84501C6.04153 1.29784 5.6572 0.830389 5.16424 0.501923C4.67127 0.173457 4.09187 -0.00123156 3.4995 6.53586e-06H0V3.00001H3.4995L10.6155 20.0775C10.7295 20.3507 10.9218 20.5841 11.1681 20.7483C11.4145 20.9125 11.7039 21 12 21H24C24.6255 21 25.185 20.6115 25.4055 20.028L29.9055 8.02801C29.9905 7.80094 30.0193 7.55664 29.9892 7.31603C29.9592 7.07543 29.8713 6.84569 29.733 6.64651V6.64651Z"
                                fill="#F0F0F0"
                            />
                            <path
                                d="M12.75 27C13.9926 27 15 25.9926 15 24.75C15 23.5074 13.9926 22.5 12.75 22.5C11.5074 22.5 10.5 23.5074 10.5 24.75C10.5 25.9926 11.5074 27 12.75 27Z"
                                fill="#F0F0F0"
                            />
                            <path
                                d="M23.25 27C24.4926 27 25.5 25.9926 25.5 24.75C25.5 23.5074 24.4926 22.5 23.25 22.5C22.0074 22.5 21 23.5074 21 24.75C21 25.9926 22.0074 27 23.25 27Z"
                                fill="#F0F0F0"
                            />
                        </svg>
                    ) : (
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M0.559099 0.559099C0.917199 0.201108 1.40282 0 1.90917 0C2.41553 0 2.90115 0.201108 3.25925 0.559099L10.0115 7.31138L16.7638 0.559099C17.124 0.211254 17.6063 0.0187787 18.107 0.0231296C18.6077 0.0274804 19.0866 0.228309 19.4407 0.582361C19.7947 0.936413 19.9956 1.41536 19.9999 1.91605C20.0043 2.41673 19.8118 2.8991 19.464 3.25925L12.7117 10.0115L19.464 16.7638C19.8118 17.124 20.0043 17.6063 19.9999 18.107C19.9956 18.6077 19.7947 19.0866 19.4407 19.4407C19.0866 19.7947 18.6077 19.9956 18.107 19.9999C17.6063 20.0043 17.124 19.8118 16.7638 19.464L10.0115 12.7117L3.25925 19.464C2.8991 19.8118 2.41673 20.0043 1.91605 19.9999C1.41536 19.9956 0.936413 19.7947 0.582361 19.4407C0.228309 19.0866 0.0274804 18.6077 0.0231296 18.107C0.0187787 17.6063 0.211254 17.124 0.559099 16.7638L7.31138 10.0115L0.559099 3.25925C0.201108 2.90115 0 2.41553 0 1.90917C0 1.40282 0.201108 0.917199 0.559099 0.559099Z"
                                fill="#F0F0F0"
                            />
                        </svg>
                    )}
                </div>
                {!cartOpen && (
                    <div className='productsNumber'>{productsLength}</div>
                )}
            </div>

            {cartItems && cartOpen && (
                <div className='cart'>
                    <h2>Tu carrito</h2>

                    {cartItems.length === 0 ? (
                        <p className='cartVacio'>Tu carrito esta vacio</p>
                    ) : (
                        <div className='productsContainer'>
                            {cartItems.map((item, i) => (
                                <ItemCart key={i} item={item} />
                            ))}
                        </div>
                    )}

                    <h2 className='total'>Total: ${total}</h2>
                    <button onClick={pagar}>pagar</button>
                </div>
            )}



        </div>


    )
}
