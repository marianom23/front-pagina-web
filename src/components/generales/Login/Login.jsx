import React, { useContext, useEffect, useState } from 'react';
import { Navbar } from '../nav-foot/Navbar';
import { Footer } from '../nav-foot/Footer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { userContext } from '../../user-redirect/UserContextProvider';
// import Cookies from 'universal-cookie'
import { LoginGoogle } from '../google/LoginGoogle';

import {
  MDBInput,
  MDBCol,
  MDBRow,
  MDBCheckbox,
  MDBBtn,
  MDBContainer
} from 'mdb-react-ui-kit';
import useUser from '../../hooks/useUser';


const clientId = "664754626894-llp569b8q2er9gq0b11ib1j50529evju.apps.googleusercontent.com";


export const Login = () => {

  const {user} = useContext(userContext)
  const [data, setData] = useState({ email: "", hash: "" })
  const {login} = useUser()

  let navigate = useNavigate();
  const handleChange = ({ target }) => {
    setData({
      ...data,
      [target.name]: target.value
    })
  }

  const handleSubmit = async (e) => {
    if (data.email === '' || data.hash === '') {
      alert('Todos los campos son obligatorios')
      return
    }
    e.preventDefault()
    const res = await axios.post('https://el-buen-sabor.herokuapp.com/login', data)
    if (res.status === 200) {
    console.log(res.data)
    window.localStorage.setItem('user',JSON.stringify(res.data))
    alert('Has entrado exitosamente')
    login()
    }
  }

  return (
    <MDBContainer fluid>
      <Navbar />
      <br />
      <div className="container">
        <form onSubmit={handleSubmit}>
          <MDBInput value={data.email} onChange={handleChange} name="email" className='mb-4' type='text' id='email' label='Email' />
          <MDBInput value={data.hash} onChange={handleChange} name="hash" className='mb-4' type='password' id='hash' label='Contraseña' />

          <MDBRow className='mb-4'>
            <MDBCol className='d-flex justify-content-center'>
              <MDBCheckbox id='form2Example3' label='Recuerdame' defaultChecked />
            </MDBCol>
            <MDBCol>
              <a href='#!'>Olvidaste tu contraseña?</a>
            </MDBCol>
          </MDBRow>

          <MDBBtn type='submit' className='mb-4' block>
            Entrar
          </MDBBtn>

          <div className='text-center'>
            <p>
              No sos miembro? <a href='/register'>Registrate</a>
            </p>
            <p>o entra con: </p>

              <LoginGoogle/>

            <br />

          </div>
        </form>
      </div>
      <br />
      <Footer />
    </MDBContainer>
  );
}
