import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardText, MDBCardTitle } from 'mdb-react-ui-kit';
import axios from 'axios'

import './Carousel.css'

export const Carousel = () => {

const getData = async () => {
    const response = axios.get('https://el-buen-sabor.herokuapp.com/articulo-manufacturado/getAll')
    return response
}  
const [data, setData] = useState([])

useEffect(() => {
    getData().then((response) => {
        setData(response.data)
    })
},[])

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    autoplay: true,
    autoplaySpeed: 2000,
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
                <MDBCardImage src={item.imagen} position='top' alt={item.denominacion} />
                <MDBCardBody>
                    <MDBCardTitle>{item.denominacion}</MDBCardTitle>
                </MDBCardBody>
                </MDBCard>
            ))}
        </Slider>
    </div>
  )
}
