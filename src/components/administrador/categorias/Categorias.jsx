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

export const Categorias = () => {

    const [data, setData] = useState({nombre: "", es_insumo:""})
    let navigate = useNavigate();

    const handleChange = ({ target }) => {
        setData({
            ...data,
            [target.name]: target.value
        })
    }

    const handleSubmit = async (e) => {
        if (data.nombre === "") {
            alert('El campo nombre es obligatorio')
            return
        }
        // Completar los condicionales para no ingresar campos vacíos (a elección)
        e.preventDefault()
        console.log(data)
        const categoria = {
            nombre: data.nombre,
            es_insumo: Boolean(data.es_insumo),
        }


        const res = await axios.post('https://el-buen-sabor.herokuapp.com/categoria', categoria)
        if (res.status === 200) {
            alert('Categoria creada con éxito')
        } else {
            alert('Error al intentar crear una categoria')
            navigate("/agregarcategoria", { replace: true });
        }
        console.log(res)
    }

    const handleReturn = () => {
        navigate("/login", { replace: true })
    }

    return (
        <>
            <NavbarAdministrador />

            <br />
            <br />
            
            <div className="container">
                <h2>Añadir categoría</h2>
                <br />
                <form onSubmit={handleSubmit}>

                    <MDBInput value={data.nombre} onChange={handleChange} type='text' className='mb-4' name="nombre" id='nombre' label='nombre' />
                    <MDBCheckbox value={data.es_insumo} onChange={handleChange} name='es_insumo' id='es_insumo' type='checkbox' label='Insumo' />

                <br />

                    <MDBBtn type='submit' className='mb-4' block>
                        Agregar categoria
                    </MDBBtn>
                    <MDBBtn type='submit' onClick={handleReturn} className='mb-4' block>
                        Cancelar
                    </MDBBtn>
                </form>
            </div>


          
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <Footer />
        </>
    )
}

