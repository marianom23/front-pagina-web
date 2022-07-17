import React, { useEffect, useState } from 'react';
import { Navbar } from '../nav-foot/Navbar';
import { Footer } from '../nav-foot/Footer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie'
import { LoginGoogle } from '../google/LoginGoogle';
// import { gapi } from 'gapi-script';

import {
  MDBInput,
  MDBCol,
  MDBRow,
  MDBCheckbox,
  MDBBtn,
  MDBContainer
} from 'mdb-react-ui-kit';

const clientId = "664754626894-llp569b8q2er9gq0b11ib1j50529evju.apps.googleusercontent.com";


export const Login = () => {

  // useEffect(()=>{
  //   function start() {
  //     gapi.client.init({
  //       clientId: clientId,
  //       scope: ""
  //     })
  //   }
  //   gapi.load('client:auth2', start)
  // });


  const [data, setData] = useState({ email: "", hash: "" })


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
    console.log(res)
    if (res.status === 200) {
      const user = res.data
      console.log("user:", user)
      console.log("status:", res.status)

      const cookies = new Cookies();
      cookies.set('id', user.id, { path: '/' });
      cookies.set('email', user.email, { path: '/' });
      cookies.set('rol', user.rol, { path: '/' });
      cookies.set('nombre', user.nombre, { path: '/' });

      // localStorage.setItem('id', user.id)
      // localStorage.setItem('email', user.email)
      // localStorage.setItem('rol', user.rol)
      // localStorage.setItem('nombre', user.nombre)

    }


    alert('Has entrado exitosamente')
    navigate("/inicio", { replace: true });
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
            <p>o</p>

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