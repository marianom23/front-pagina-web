import React, { useEffect, useState } from 'react'
import './factura.css'
import jsPDF from 'jspdf'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { NavbarCajero } from './NavbarCajero'
import useUser from '../hooks/useUser'

export const FacturaCajero = () => {
let navigate = useNavigate();
const {usuario} = useUser(); 
const {idPedido} = useParams();
const [data, setData] = useState({})
const [productos, setProductos] = useState([])

const getData = async () => {
    const response = await axios.get(`https://el-buen-sabor.herokuapp.com/factura/getByPedido/${idPedido}`)
    console.log(response.data)
    return response.data
}   

useEffect(() => {
    getData().then((response) => {
        setProductos(response.productos)
        setData(response)
    })
},[])
    
useEffect(() => {
    if (usuario !== null) {
        if (usuario.rol === 200 || usuario.rol === 500) {
          }else{
            alert('Tienes que logearte como cajero para acceder')
            navigate("/login", { replace: true });
          }   
    }else{
        alert('Tienes que logearte como cajero para acceder')
        navigate("/login", { replace: true });
    }
  }, [])


const generarPdf = () => {
    let doc = new jsPDF("p","pt","a1")
    doc.html(document.querySelector("#factura"), {
        callback: function(pdf){
            pdf.save("factura.pdf");
        }
    })
}    

const displayData = productos.map(
    (info) => (
        info.forma_pago === "efectivo" ?  
        <tbody>
            <tr>
            <td>1</td>
            <td>{info.denominacion}</td>
            <td>{info.precio}</td>
            <td>{info.cantidad}</td>
            <td>-</td>
            <td>{info.cantidad * info.precio}</td>
            </tr>
        </tbody>
        :
        <tbody>
            <tr>
            <td>1</td>
            <td>{info.denominacion}</td>
            <td>{info.precio}</td>
            <td>{info.cantidad}</td>
            <td>-</td>
            <td>{info.cantidad * info.precio}</td>
            </tr>
        </tbody>
    )
)

console.log(productos)

  return (
        <>
        
        <NavbarCajero/>

        <div className='container'>
        <div id="factura" className="invoice_container">
            <div className="invoice_header">
                <div className="logo_container">
                    <img src="../assets/factura.png"/>
                </div>
                <div className="company_address">
                    <h2>El Buen Sabor.</h2>
                    <p>
                        ATTN: Martin Pasini, Dueño <br/>
                        Buen Sabor. <br/>
                        273 Coronel Rodríguez. <br/>
                        Mendoza, TN 37011-5678
                    </p>
                </div>
            </div>
            <div className="customer_container">
                <div>
                    <h2>Para </h2>
                    <h4>{usuario.nombre} {usuario.apellido}</h4>
                    <p>
                        Direccion del cliente <br/>
                        Localidad: {data.localidad} <br/>
                        {data.calle} numero: {data.numero} <br/>
                        Provincia: Mendoza
                    </p>
                </div>
                <div className="in_details">
                    <h1 className="in_head">FACTURA B</h1>
                    <table>
                        <thead>
                            <tr>
                            <td>Factura N°</td>
                            <td>:</td>
                            <td><b>{data.id_factura}</b></td>
                            </tr>
                        </thead>
                        <thead>
                            <tr>
                            <td>Due Date</td>
                            <td>:</td>
                            <td><b>26 October 2022</b></td>
                            </tr>
                        </thead>
                        <thead>
                            <tr>
                            <td>Bill No</td>
                            <td>:</td>
                            <td><b>02500</b></td>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
            <div className="product_container">
                <table className="item_table" border="1" cellSpacing="0">
                    <thead>
                        <tr>
                        <td>Sl. No.</td>
                        <td>Item</td>
                        <td>Precio</td>
                        <td>Cantidad</td>
                        <td>Descuento</td>
                        <td>Total</td>
                        </tr>
                    </thead>
          
                    {
                        productos.map(
                            (info) => (
                                (data.forma_pago === "efectivo" ?  
                                <tbody>
                                    <tr>
                                    <td>Efectivo</td>
                                    <td>{info.denominacion}</td>
                                    <td>{info.precio + info.precio * 10 / 90}</td>
                                    <td>{info.cantidad}</td>
                                    <td>{info.precio * 10 / 90}</td>
                                    <td>{info.cantidad * info.precio + info.precio * 10 / 90}</td>
                                    </tr>
                                </tbody>
                                :
                                <tbody>
                                    <tr>
                                    <td>Mercado Pago</td>
                                    <td>{info.denominacion}</td>
                                    <td>{info.precio}</td>
                                    <td>{info.cantidad}</td>
                                    <td>-</td>
                                    <td>{info.cantidad * info.precio}</td>
                                    </tr>
                                </tbody>)
                                )
                            )
                    }
          
                    <tbody>
                        <tr>
                        <th colSpan="4">Total</th>
                        {   
                        (
                            data.forma_pago === "efectivo" ?
                            <th>{data.monto_descuento}</th>
                            :
                            <th>-</th>
                        )                      
                        }
                        {   
                        (
                            data.forma_pago === "efectivo" ?
                            <th>{data.total_venta + data.monto_descuento}</th>
                            :
                            <th>{data.total_venta}</th>
                        )                      
                        }
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="invoice_footer">
                <div className="note">
                    <h2>Gracias!</h2>
                    <p>
                        Esperamos que disfrutes tu comida, cualquier problema que te surga del pedido no dudes en consultarla.
                    </p>
                </div>
                <div className="invoice_footer_amount">
                    <table className="amount_table"   cellSpacing="0">
                        { (data.forma_pago === "efectivo" ?
                        <thead>
                        <tr>
                            <td>Subtotal</td>
                            <td>: <b>{data.total_venta + data.monto_descuento}</b></td>
                        </tr>
                        <tr>
                            <td>Descuento</td>
                            <td>: <b>{data.monto_descuento}</b></td>
                        </tr>
                        <tr>
                            <td>Total</td>
                            <td>: <b>{data.total_venta}</b></td>
                        </tr>
                        <tr>
                            <td>Pagado</td>
                            <td>: <b>{data.total_venta}</b></td>
                        </tr>
                        </thead>
                        :
                        <thead>
                        <tr>
                            <td>Subtotal</td>
                            <td>: <b>{data.total_venta}</b></td>
                        </tr>
                        <tr>
                            <td>Descuento</td>
                            <td>: <b>{data.monto_descuento}</b></td>
                        </tr>
                        <tr>
                            <td>Total</td>
                            <td>: <b>{data.total_venta}</b></td>
                        </tr>
                        <tr>
                            <td>Saldo restante</td>
                            <td>: <b>0</b></td>
                        </tr>
                        </thead>                       
                        )
                        }
                    </table>
                </div>
            </div>
        </div>
        </div>
        <br />
        <button onClick={() => generarPdf()} className='btn btn-primary'>Descargar factura</button>
        <br />
        <br />
        <button onClick={() => navigate(-1)} className='btn btn-success'>Volver</button>
    </>
  )
}
