import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import Select from 'react-select';
import './select.css'

import {
    MDBInput,
    MDBBtn,
} from 'mdb-react-ui-kit';
import { NavbarCocinero } from './NavbarCocinero';
import { Footer } from '../generales/nav-foot/Footer';
import useUser from '../hooks/useUser';

export const DetalleArticuloCodinero = () => {

    const [isActive, setIsActive] = useState(false)
    const [articulos, setArticulos] = useState([])
    const [insumos, setInsumos] = useState([])

    const insumostrue =  insumos.filter(insumos => insumos.es_insumo === true);


    const getArticulos = async () => {
        const data = await axios.get("https://el-buen-sabor.herokuapp.com/articulo-manufacturado/getAll")
        return data
    }

    const {usuario} = useUser()
    console.log(usuario)


    useEffect(() => {
        if (usuario !== null) {
            if (usuario.rol === 500) {
            }else{
                alert('Tienes que logearte como cocinero para acceder')
                navigate("/login", { replace: true });
            }   
        }else{
            alert('Tienes que logearte como cocinero para acceder')
            navigate("/login", { replace: true });
        }
    }, [])


    const getInsumos = async () => {
        const data = await axios.get("https://el-buen-sabor.herokuapp.com/articulo-insumo/getAll")
        return data;
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
            label: "Unidades",
            value: "unidades",
        },
    ];

    const recargar = () =>{
        navigate("/agregar-articulo-manufacturado", { replace: true });
    }


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
            Swal.fire({
                title: "Agregado",
                text: `¿Deseas agregar otro insumo a este producto?`,
                icon: "warning",
                showDenyButton: true,
                denyButtonText: 'No',
                confirmButtonText: 'Si',
            }).then(result => {
                if (result.isConfirmed) {
                    Swal.fire('Proceda');
                } else if(result.isDenied){
                    Swal.fire('Limpiando pantalla').then(
                        function(){
                            // navigate("/agregar-detalle-articulo", { replace: true })
                            window.location.href = "/agregar-detalle-articulo";
                        }
                    )
                }
            })
        } 
    }


    const handleReturn = () => {
        navigate("/login", { replace: true })
    }

    // document.getElementById("cantidad").hidden = true;

    return (
        // :::  BUG :::: El formulario no toma los valores por defecto de los 'selects'.
        // :: el componente SI funciona.
        // :: si no se selecciona nada de las listas por defecto no agrega nada. 
        // :: el primer valor de la lista debería ser vacío por defecto.
        <><NavbarCocinero />
            <div className="container">

                <h2>Añadir detalles del articulo</h2>

                <br />

                <form onSubmit={handleSubmit}>


                    <div className="select">
                        <select value={articulos.denominacion} onChange={handleChange} name="id_articulo_manufacturado">
                            <option selected disabled>Selecciona un articulo</option>
                            {articulos.map(obj =>
                                <option key={obj.id} value={obj.id} >{obj.denominacion}</option>
                            )}
                        </select>
                    </div>

                    <hr/>

                    <div className="select">
                        <select value={insumos.denominacion} onChange={handleChange} name="id_articulo_insumo">
                            <option selected disabled>Selecciona un insumo</option>
                            {insumostrue.map(obj =>
                                <option key={obj.id} value={obj.id} >{obj.denominacion}</option>
                            )}
                        </select>
                    </div>
                    
                    <hr />

                    <div className="select">
                        <select value={data.unidad_medida} onChange={handleChange} name="unidad_medida">
                            <option selected disabled>Selecciona una unidad de medida</option>
                            {unidad_medida.map(obj =>
                                <option key={obj.id} value={obj.value}>{obj.label}</option>
                            )}
                        </select>
                    </div>

                    <hr />

                    <MDBInput value={data.cantidad} onChange={handleChange} type='number' className='mb-4' name="cantidad" id='cantidad' label='cantidad' />

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

