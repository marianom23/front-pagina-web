import React, { useEffect, useState } from 'react'
import { NavbarUsuario } from '../nav/NavbarUsuario'
import './factura.css'
import jsPDF from 'jspdf'
import useUser from '../../hooks/useUser'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'

export const Factura = () => {
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
        <tbody>
            <tr>
            <td>1</td>
            <td>{info.denominacion}</td>
            <td>{info.precio}</td>
            <td>{info.cantidad}</td>
            <td>2000</td>
            <td>{info.cantidad * info.precio}</td>
            </tr>
        </tbody>
    )
)

console.log(productos)

  return (
        <>
        
        <NavbarUsuario/>

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
                            <td><b>{data.id}</b></td>
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
                        displayData
                    }
          
                    <tbody>
                        <tr>
                        <th colSpan="4">Total</th>
                        <th>8000</th>
                        <th>{data.total_venta}</th>
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
                        <thead>
                        <tr>
                            <td>Descuento</td>
                            <td>: <b>0</b></td>
                        </tr>
                        <tr>
                            <td>Total</td>
                            <td>: <b>{data.total_venta}</b></td>
                        </tr>
                        <tr>
                            <td>Monto pagado</td>
                            <td>: <b>{data.total_venta}</b></td>
                        </tr>
                        <tr>
                            <td>Saldo restante</td>
                            <td>: <b>0</b></td>
                        </tr>
                        </thead>
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
