import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { MDBCard, MDBCardImage, MDBCardBody, MDBBtn, MDBCardTitle, MDBCardText, MDBRow } from 'mdb-react-ui-kit';
import { CartContext } from '../../context/CartContext'
import styles from "./styles.module.scss";


export const Productos = () => {

    
    const {addItemToCart} = useContext(CartContext) 

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

  return (    
            <MDBRow className={productsContainer}>{
                    data.map(      
                        (info)=>(                 
                            <MDBCard key={info.id} className={product}>
                                <MDBCardImage
                                src={info.imagen}
                                alt={info.denominacion}
                                position='top'
                                />
                                <MDBCardBody>
                                <MDBCardTitle>{info.denominacion}</MDBCardTitle>
                                <MDBCardText>
                                    ${info.precio_venta} - Tiempo estimado: {info.tiempo_estimado_cocina} minutos
                                </MDBCardText>
                                </MDBCardBody>
                                <MDBBtn onClick={() => addItemToCart(info)}>Añadir al carrito</MDBBtn>
                            </MDBCard>                                             
                        )
                    )    
                }
            </MDBRow>     
  )

}
