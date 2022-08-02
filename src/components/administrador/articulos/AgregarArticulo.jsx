import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { NavbarAdministrador } from '../NavbarAdministrador';
import { Footer } from '../../generales/nav-foot/Footer';
import {
    MDBInput,
    MDBCheckbox,
    MDBBtn,
} from 'mdb-react-ui-kit';
import './select.css'

export const AgregarArticulo = () => {
    const [categorias, setCategorias] = useState([])
    const [data, setData] = useState({ id_categoria: "", tiempo_estimado_cocina: "", denominacion: "", precio_venta: "", imagen: "" })
    const [archivo, setArchivo] = useState(null)
    let navigate = useNavigate();
    const handleChange = ({ target }) => {
        if (target.files) {
            console.log("...cargando imagen", target.files)
            setArchivo(target.files)
          }
        setData({
            ...data,
            [target.name]: target.value
        })

    }
    const getCategorias = async () => {
        const response = await axios.get('https://el-buen-sabor.herokuapp.com/categoria/getAll')
        return response
    }

    useEffect(() => {
        getCategorias().then((response) => {
            setCategorias(response.data)
        })
    }, [])

    let imagenUpload = ""
    const cargarImagen = async (e) => {
        const formData = new FormData()
        console.log("Archivooo:",archivo[0])
        formData.append("file", archivo[0])
        formData.append("upload_preset", "sw2cxppo")
        const response = await axios.post("https://api.cloudinary.com/v1_1/dggpzhjo3/image/upload", formData)
        if (response) {
            imagenUpload = response.data.secure_url
            return imagenUpload
        } else {
            console.log("error al cargar la imagen", response)
            alert("error al cargar la imagen", response)
        }
        console.log("archi", archivo[0])
        return archivo
    }

    const handleSubmit = async (e) => {

        // Completar los condicionales para no ingresar campos vacíos (a elección)
        e.preventDefault()
        const imagenUpload = await cargarImagen();
        console.log("cargando", imagenUpload)
        console.log(data)
        const articuloManufacturado = {
            id_categoria: Number(data.id_categoria),
            tiempo_estimado_cocina: Number(data.tiempo_estimado_cocina),
            denominacion: data.denominacion,
            precio_venta: Number(data.precio_venta),
            imagen: imagenUpload,
        }


        const res = await axios.post('https://el-buen-sabor.herokuapp.com/articulo-manufacturado', articuloManufacturado)
        if (res.status === 200) {
            alert('Articulo mufacturado creado con éxito')      
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
        <>
            <NavbarAdministrador />
            <div className="container">
                <h2>Añadir articulo manufacturado</h2>
                <br />
                <form onSubmit={handleSubmit}>
                    <div className="select">
                        <select onChange={handleChange} name="id_categoria">
                            <option selected disabled>Selecciona una categoria</option>
                            {categorias.map(obj =>
                                <option key={obj.id} value={obj.id}>{obj.nombre}</option>
                            )}
                        </select>
                    </div>

                    <br />
                    <MDBInput value={data.tiempo_estimado_cocina} onChange={handleChange} type='number' className='mb-4' name="tiempo_estimado_cocina" id='tiempo_estimado_cocina' label='tiempo_estimado_cocina' />
                    <MDBInput value={data.denominacion} onChange={handleChange} type='text' className='mb-4' name="denominacion" id='denominacion' label='denominacion' />
                    <MDBInput value={data.precio_venta} onChange={handleChange} name="precio_venta" className='mb-4' type='number' id='precio_venta' label='precio_venta' />
                    <MDBInput onChange={handleChange} name="archivo" className='mb-4' type='file' id='archivo' />
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

