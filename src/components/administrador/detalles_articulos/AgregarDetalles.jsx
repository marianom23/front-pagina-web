import React, { useState } from 'react';
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { NavbarAdministrador } from '../NavbarAdministrador';
import { Footer } from '../../generales/Footer';
import {
    MDBInput,
    MDBCol,
    MDBRow,
    MDBCheckbox,
    MDBBtn,
    MDBIcon
} from 'mdb-react-ui-kit';

export const AgregarDetalles = () => {

    const [articulos, setArticulos] = useState([])
    const [insumos, setInsumos] = useState([])

    const getArticulos = async () => {
        const data = await axios.get("https://el-buen-sabor.herokuapp.com/articulo-manufacturado/getAll")
        return data
    }

    const getInsumos = async () => {
        const data = await axios.get("https://el-buen-sabor.herokuapp.com/articulo-insumo/getAll")
        return data
    }

    React.useEffect(() => {
        getArticulos().then((response) => {
            setArticulos(response.data)
        })
        getInsumos().then((response) => {
            setInsumos(response.data)
        })
    }, [])

    const unidad_medida = [
        {
            id: 1,
            label: "Litros",
            value: "litros",
        },
        {
            id: 2,
            label: "Gramos",
            value: "gramos",
        },
        {
            id: 3,
            label: "Kilogramos",
            value: "kilogramos",
        },
    ];


    const [data, setData] = useState({ cantidad: "", unidad_medida: "", id_articulo_manufacturado: "", id_articulo_insumo: "" })
    let navigate = useNavigate();
    const handleChange = ({ target }) => {
        setData({
            ...data,
            [target.name]: target.value
        })
        console.log("Target value:", target.value)
        console.log("Target name:", target.name)
        console.log("data:", data)

    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        console.log("data:",data)
        const detalles = {
            unidad_medida: data.unidad_medida,
            cantidad: Number(data.cantidad),
            id_articulo_manufacturado: Number(data.id_articulo_manufacturado),
            id_articulo_insumo:  Number(data.id_articulo_insumo),
        }

        console.log("detalles:",detalles)

        const res = await axios.post('https://el-buen-sabor.herokuapp.com/articulo-manufacturado-detalle', detalles)
        if (res.status === 200) {
            alert('Articulo insumo creado con éxito')
            navigate("/agregar-detalle-articulo", { replace: true });
        } else {
            alert('Error al intentar crear un articulo insumo')
            navigate("/agregar-detalle-articulo", { replace: true });
        }
        console.log(res)
    }

    const handleReturn = () => {
        navigate("/login", { replace: true })
    }

    return (
        // :::  BUG :::: El formulario no toma los valores por defecto de los 'selects'.
        // :: el componente SI funciona.
        // :: si no se selecciona nada de las listas por defecto no agrega nada. 
        // :: el primer valor de la lista debería ser vacío por defecto.
        <><NavbarAdministrador />
            <div className="container">
                <h2>Añadir detalles del articulo</h2>
                <br />
                <form onSubmit={handleSubmit}>
                    <MDBInput value={data.cantidad} onChange={handleChange} type='number' className='mb-4' name="cantidad" id='cantidad' label='cantidad' />
                    <label><b>Unidad medida</b></label><select className="select-container" value={data.unidad_medida} onChange={handleChange} name="unidad_medida">
                        {unidad_medida.map(obj =>
                            <option key={obj.id} value={obj.value} >{obj.label}</option>
                        )}
                    </select>
                    <br />

                    <label><b>ID Articulo Manufacturado: </b></label><select className="select-container" value={articulos.denominacion} onChange={handleChange} name="id_articulo_manufacturado">
                        {articulos.map(obj =>
                            <option key={obj.id} value={obj.id} >{obj.denominacion}</option>
                        )}
                    </select>
                    <br />

                    <label><b>Insumos: </b></label><select className="select-container" value={insumos.denominacion} onChange={handleChange} name="id_articulo_insumo">
                        {insumos.map(obj =>
                            <option key={obj.id} value={obj.id} >{obj.denominacion}</option>
                        )}
                    </select>

                    <MDBBtn type='submit' className='mb-4' block>
                        Agregar detalles
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

