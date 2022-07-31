import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'
import useUser from '../../hooks/useUser';
import { NavbarUsuario } from '../nav/NavbarUsuario'
export const DetallePedidoClientePago = () => {

    const { pedidoID } = useParams();
    const { usuario } = useUser();
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
    }, [])
    let total = 0;
    data.forEach(info => {
        total += info.subtotal * info.cantidad
    });



    const mercadopago = async () => {
        const dataArrayMP = []
        console.log("DATA ::::: ", data)
        if (data.length > 0) {
            data.forEach(d => {
                const dataMP = {
                    precio_venta: d.subtotal,
                    amount: d.cantidad,
                    denominacion: d.denominacion
                }
                dataArrayMP.push(dataMP)
            })
        }

        console.log("dataArrayMPdataArrayMPdataArrayMP::::", dataArrayMP)
        const user = {
            id: usuario.id,
            nombre: usuario.nombre,
            email: usuario.email,
        }
        const dataSendMP = {
            producto_mercado_pago: dataArrayMP,
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

            console.log(" :::::_____::::::",preference.id)
            script.dataset.preferenceId = preference.id;
            // console.log("preference.init_point", preference.init_point)
            // script.src = preference.init_point;
            // script.type = "text/html";
            // document.getElementById("cartContainer").innerHTML = `<button onclick="location.href='${script.src}'" type="button">
            // Pagar MercadoPago</button>`;

            document.getElementById("checkout").innerHTML = "";
            document.querySelector("#checkout").appendChild(script);

            console.log("Todo bien")
            console.log("Preference ID:", script.dataset.preferenceId)
        } catch {
            window.alert("Error al pagar. \nIntentelo nuevamente más tarde")
        }
    }

    return (
        <>
            <NavbarUsuario />

            <div className='wrapper'>
                {
                    data.map(
                        (info) => (
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
            <button id="checkout" className='checkout' name="checkout" onClick={mercadopago}>Pagar</button>
            <button onClick={handleReturn} className="btn btn-success">Regresar</button>
        </>
    )
}