import React, { useEffect, useState } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LoginGoogle } from './LoginGoogle';
import { LogoutGoogle } from './LogoutGoogle';
import {gapi} from 'gapi-script';
import {
  MDBInput,
  MDBCol,
  MDBRow,
  MDBCheckbox,
  MDBBtn,
  MDBIcon,
  MDBContainer
} from 'mdb-react-ui-kit';

  export const Inicio = () => {
    const clientId="664754626894-llp569b8q2er9gq0b11ib1j50529evju.apps.googleusercontent.com"
    const [data, setData] = useState({email:"",hash:""})
    let navigate = useNavigate();
    const handleChange = ({target})=> {
        setData({
            ...data,
            [target.name]: target.value
        })
    }
  
    const handleSubmit = async (e) =>{
        if (data.email === '' || data.hash === '') {
              alert('Todos los campos son obligatorios')
              return
        }    
        e.preventDefault()
        await axios.post('https://el-buen-sabor.herokuapp.com/login', data)
          alert('Ha entrado exitosamente')
          navigate("/inicio", { replace: true });
    }

    useEffect(() => {
      function start() {
        gapi.client.init({
          clientId: clientId,
          scope: ""
        })
      }
      gapi.load('client:auth2', start)
    })

  return (
    <MDBContainer fluid>
    <Navbar/>
    <br />
    <div className="container">
          <form onSubmit={handleSubmit}>
          <MDBInput value={data.email} onChange={handleChange} name="email" className='mb-4' type='text' id='email' label='Email' />
            <MDBInput value={data.hash} onChange={handleChange} name="hash" className='mb-4' type='text' id='hash' label='Contraseña' />

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
              <p>o entra con:</p>

              {/* <MDBBtn floating className='mx-1'>
                <MDBIcon fab icon='google' />
              </MDBBtn>    */}

              <LoginGoogle/>
          </div>
        </form>
    </div>
    <br />
    <Footer/>
    </MDBContainer>
  );
}