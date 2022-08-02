import React, { useContext, useEffect } from 'react'
import { Carousel } from '../../generales/Carousel/Carousel'
import { Footer } from '../../generales/nav-foot/Footer'
import { NavbarUsuario } from '../nav/NavbarUsuario'
import { useNavigate } from 'react-router-dom'
import useUser from '../../hooks/useUser'

export const InicioUsuario = () => {

  let navigate = useNavigate();
  const {usuario} = useUser();

  useEffect(() => {
      if (usuario !== null) {
          if (usuario.rol === 100 || usuario.rol === 500) {
            }else{
              alert('Tienes que logearte como usuario para acceder')
              navigate("/login", { replace: true });
            }   
      }else{
          alert('Tienes que logearte como usuario para acceder')
          navigate("/login", { replace: true });
      }
  }, [])
  

  return (
    <>
      <NavbarUsuario/>

      <br />
        <section class="banner-area">
          <div class="banner-img"></div>
          <h3>Llevamos la comida a tu mesa</h3>
          <h1>El BUEN<span>SABOR</span></h1><a class="banner-btn" onClick={() => navigate('/pedir')}>Pedir ahora</a>
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
    </>
  )
}
