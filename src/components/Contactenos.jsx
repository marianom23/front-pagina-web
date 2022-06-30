import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
// import emailjs from 'emailjs-com';
import {
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBContainer
} from 'mdb-react-ui-kit';

export const Contactenos = () => {

    const form = useRef();

    const sendEmail = (e) => {
      e.preventDefault();
  
      emailjs.sendForm('service_1qzf6cg', 'template_15r8074', e.target, 'IobS-NfK5M4AIhYND')
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
    };

  return (
    <div className="container">
        <br />
        <form onSubmit={sendEmail}>
        <MDBInput id='form4Example1' wrapperClass='mb-4' label='Name' name="Name" />
        <MDBInput type='email' id='form4Example2' wrapperClass='mb-4' name='Email' label='Email' />
        <MDBInput wrapperClass='mb-4'  id='form4Example3' rows={4} name='Message' label='Message' />

        <MDBBtn type='submit' className='mb-4' block>
            Enviar mensaje
        </MDBBtn>
        <MDBBtn hreftype='button' href='/inicio' className='mb-4' block>
            Volver
        </MDBBtn>
        </form>
    </div>
  );
}