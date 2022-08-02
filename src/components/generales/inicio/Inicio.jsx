import { MDBContainer } from 'mdb-react-ui-kit'
import React, { useEffect, useState } from 'react'
import { Footer } from '../nav-foot/Footer'
import { Navbar } from '../nav-foot/Navbar'
import './inicio.css'
import axios from 'axios'



export const Inicio = () => {

  const [data, setData] = useState([])

  const getData = async () => {
      const response = await axios.get('https://el-buen-sabor.herokuapp.com/carrito-completo-getAll')
      return response
  }   

  const goToTop = () => {
    window.scrollTo({
        top: 2250,
        behavior: "smooth",
    });
  };


  useEffect(() => {
    getData().then((response) => {
        setData(response.data)
    })
  },[])  

  return (
    <MDBContainer fluid>
      <Navbar/>
      <br />
        <section class="banner-area">
          <div class="banner-img"></div>
          <h3>Llevamos la comida a tu mesa</h3>
          <h1>El BUEN<span>SABOR</span></h1><a class="banner-btn" onClick={goToTop}>VER NUESTRO MENU</a>
        </section>
        <section class="about-area" id="about">
          <h3 class="section-title">Sobre <span>nosotros</span></h3>
          <ul class="about-content">
            <li class="about-left"></li>
            <li class="about-right">
              <h2>Somos un local de comidas TakeAway/Delivery </h2>
              <p>Una experiencia única donde se podrán degustar texturas y sabores diferentes en cada paso. Vení a conocer y degustar comidas y bebidas de la mayor calidad.</p>
              <p><i class="fa fa-arrow-right"></i> Velocidad</p>
              <p><i class="fa fa-arrow-right"></i> Comida de calidad</p>
              <p><i class="fa fa-arrow-right"></i> Buena atencion</p>
              <p><i class="fa fa-arrow-right"></i> Simplicidad </p>
            </li>
          </ul>
        </section>
        <section class="msg-area">
          <div class="msg-content">
            <h2>Amor por la gastronomía</h2>
            <p>El descubrimiento de un nuevo plato es de más provecho para la humanidad que el descubrimiento de una estrella.</p>
          </div>
        </section>
        <section class="services-area" id="services">
          <h3 class="section-title">Nuestros <span>Productos</span></h3>
          <ul class="services-content">
            {
              data.map(
                (info) => (
                  <li>
                    <img alt={info.denominacion} src={info.imagen}/>
                    <h4>{info.denominacion}</h4>
                    <p>{info.precio_venta}</p>
                  </li>
                )
              )
            } 
          </ul>
        </section>
        <section class="contact-area" id="contact">
          <h3 class="section-title">Our <span>Contact</span></h3>
          <ul class="contact-content">
          <li>
              <i class="fa fa-map-marker"></i>
              <p>129, Mendoza<br/>
              Argentina</p>
            </li>
            <li>
              <i class="fa fa-phone"></i>
              <p>+123 456 789<br/>
              +789 456 123</p>
            </li>
            <li>
              <i class="fa fa-envelope"></i>
              <p>info@bishop.com<br/>
              elbuensabor@administracion.com</p>
            </li>
          </ul>
        </section>

      <br />
      <Footer/>
    </MDBContainer>
  )
}
