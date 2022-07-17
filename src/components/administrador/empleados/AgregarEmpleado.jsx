import React, { useState } from 'react';
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { NavbarAdministrador } from '../NavbarAdministrador';
import { Footer } from '../../generales/nav-foot/Footer';
import {
    MDBInput,
    MDBCheckbox,
    MDBBtn,
} from 'mdb-react-ui-kit';

export const AgregarArticulo = () => {

    const [data, setData] = useState({ tiempo_estimado_cocina: "", denominacion: "", precio_venta: "", imagen: "" })
    let navigate = useNavigate();
    const handleChange = ({ target }) => {
        setData({
            ...data,
            [target.name]: target.value
        })

    }

    const handleSubmit = async (e) => {
        // Completar los condicionales para no ingresar campos vacíos (a elección)
        e.preventDefault()
        console.log(data)
        const articuloManufacturado = {
            tiempo_estimado_cocina: Number(data.tiempo_estimado_cocina),
            denominacion: data.denominacion,
            precio_venta: Number(data.precio_venta),
            imagen: data.imagen,
        }

        console.log(articuloManufacturado)

        const res = await axios.post('https://el-buen-sabor.herokuapp.com/articulo-manufacturado', articuloManufacturado)
        if (res.status === 200) {
            alert('Articulo manufacturado creado con éxito')
            navigate("/agregar-articulo-manufacturado", { replace: true });
        } else {
            alert('Error al intentar crear un articulo manufacturado')
            navigate("/agregar-articulo-manufacturado", { replace: true });
        }
        console.log(res)
    }

    const handleReturn = () => {
        navigate("/login", { replace: true })
    }

    return (
        <><NavbarAdministrador />
            <div className="container">
                <h2>Añadir articulo manufacturado</h2>
                <br />
                <form onSubmit={handleSubmit}>
                    <MDBInput value={data.tiempo_estimado_cocina} onChange={handleChange} type='number' className='mb-4' name="tiempo_estimado_cocina" id='tiempo_estimado_cocina' label='tiempo_estimado_cocina' />
                    <MDBInput value={data.denominacion} onChange={handleChange} type='text' className='mb-4' name="denominacion" id='denominacion' label='denominacion' />
                    <MDBInput value={data.precio_venta} onChange={handleChange} name="precio_venta" className='mb-4' type='number' id='precio_venta' label='precio_venta' />
                    <MDBInput value={data.imagen} onChange={handleChange} name="imagen" className='mb-4' type='text' id='imagen' label='imagen' />
                    <MDBBtn type='submit' className='mb-4' block>
                        Agregar articulo manufacturado
                    </MDBBtn>
                    <MDBBtn type='submit' onClick={handleReturn} className='mb-4' block>
                        Cancelar
                    </MDBBtn>
                </form>
            </div>
            <Footer />
        </>
    )
}

