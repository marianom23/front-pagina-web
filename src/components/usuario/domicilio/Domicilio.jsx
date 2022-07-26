import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { Footer } from '../../generales/nav-foot/Footer';
import { NavbarUsuario } from '../nav/NavbarUsuario';
import {
    MDBInput,
    MDBBtn,
} from 'mdb-react-ui-kit';
import useUser from '../../hooks/useUser';

export const Domicilio = () => {

    let navigate = useNavigate();
    const {usuario} = useUser()
    console.log(usuario)
  
  
    useEffect(() => {
      if (usuario !== null) {
          if (usuario.rol === 100 || usuario.rol === 500) {
              alert('Bienvenido')
            }else{
              alert('Tienes que logearte como usuario para acceder')
              navigate("/login", { replace: true });
            }   
      }else{
          alert('Tienes que logearte como usuario para acceder')
          navigate("/login", { replace: true });
      }
    }, [])

    const [data, setData] = useState({ calle: "", numero: "", localidad: ""})

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
        const domicilio = {
            calle: data.calle,
            numero: Number(data.numero),
            localidad: data.localidad
        }


        const res = await axios.post('https://el-buen-sabor.herokuapp.com/domicilio', domicilio)
        if (res.status === 200) {
            alert('Domicilio agregado con exito')
        } else {
            alert('Error al intentar agregar un domicilio')
        }
        console.log(res)
    }

    const handleReturn = () => {
        navigate(-1, { replace: true })
    }

    return (
        <>
            <NavbarUsuario />
            <div className="container">
                <h2>Añadir domicilio</h2>
                <br />
                <form onSubmit={handleSubmit}>
                    <MDBInput value={data.calle} onChange={handleChange} type='text' className='mb-4' name="calle" id='calle' label='calle' />
                    <MDBInput value={data.numero} onChange={handleChange} type='number' className='mb-4' name="numero" id='numero' label='numero' />
                    <MDBInput value={data.localidad} onChange={handleChange}  type='text' className='mb-4' name="localidad" id='localidad' label='localidad' />
                    <MDBBtn type='submit' className='mb-4' block>
                        Agregar domicilio
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

