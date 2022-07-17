import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import {data} from "./data"
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardText, MDBCardTitle } from 'mdb-react-ui-kit';

import './Carousel.css'

export const Carousel = () => {
const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
        {
        breakpoint: 1024,
        settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
        }
        },
        {
        breakpoint: 600,
        settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
        }
        },
        {
        breakpoint: 480,
        settings: {
            slidesToShow: 1,
            slidesToScroll: 1
        }
        }
    ]
    };  

  return (
    <div className="carousel">
        <Slider {...settings}>
            {data.map((item) =>(
                <MDBCard style={{ maxWidth: '22rem' }} key={item.id}>
                <MDBCardImage src={item.img} position='top' alt={item.titulo} />
                <MDBCardBody>
                    <MDBCardTitle>{item.titulo}</MDBCardTitle>
                    <MDBCardText>
                    $ {item.precio}
                    </MDBCardText>
                </MDBCardBody>
                </MDBCard>
            ))}
        </Slider>
    </div>
  )
}

{/* <div className="carousel">
<Slider {...settings}>
    {data.map((item) =>(
        <div className="card">
            <div className="card-top">
                <img src={item.img} alt={item.titulo} />
                <h1>{item.titulo}</h1>
            </div>
            <div className="card-bottom">
                <h3>{item.precio}</h3>
                <span className="category">{item.categoria}</span>
            </div>
        </div>
    ))}
</Slider>
</div> */}