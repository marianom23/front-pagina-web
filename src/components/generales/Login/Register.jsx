import React, { useState } from 'react';
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import {
  MDBInput,
  MDBCol,
  MDBRow,
  MDBCheckbox,
  MDBBtn,
  MDBIcon
} from 'mdb-react-ui-kit';

export const Register = () => {
  const [data, setData] = useState({ nombre: "", apellido: "", email: "", usuario: "", hash: "" })
  let navigate = useNavigate();
  const handleChange = ({ target }) => {
    setData({
      ...data,
      [target.name]: target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (data.nombre === '' || data.apellido === '' || data.email === '' || data.usuario === '' || data.hash === '') {
      alert('Todos los campos son obligatorios')
      return
    }
    const response = await axios.post('https://el-buen-sabor.herokuapp.com/register', data)
    if (response) {
      alert('Usuario creado exitosamente')
      navigate("/login", { replace: true });
    } else {
      alert('no se ha podido crear el usuario')

    }

  }

  const handleReturn = () => {
    navigate("/login", { replace: true })
  }


  return (
    <div className="container">
      <br />
      <form onSubmit={handleSubmit}>
        <MDBRow className='mb-4'>
          <MDBCol>
            <MDBInput value={data.nombre} onChange={handleChange} type='text' name="nombre" id='nombre' label='Nombre' />
          </MDBCol>
          <MDBCol>
            <MDBInput value={data.apellido} onChange={handleChange} type='text' name="apellido" id='apellido' label='Apellido' />
          </MDBCol>
        </MDBRow>
        <MDBInput value={data.email} onChange={handleChange} name="email" className='mb-4' type='text' id='email' label='Email' />
        <MDBInput value={data.usuario} onChange={handleChange} name="usuario" className='mb-4' type='text' id='usuario' label='Nombre de usuario' />
        <MDBInput value={data.hash} onChange={handleChange} name="hash" className='mb-4' type='password' id='hash' label='Contraseña' />

        <MDBBtn type='submit' className='mb-4' block>
          Registrarse
        </MDBBtn>
        <MDBBtn type='submit' onClick={handleReturn} className='mb-4' block>
          Cancelar
        </MDBBtn>
        <div className='text-center'>
          <p>O registrate con:</p>

        </div>
      </form>
    </div>
  );
}