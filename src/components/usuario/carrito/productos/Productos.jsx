// import React, { useContext, useEffect, useState } from 'react'
// import axios from 'axios'
// import { MDBCard, MDBCardImage, MDBCardBody, MDBBtn, MDBCardTitle, MDBCardText, MDBRow } from 'mdb-react-ui-kit';
// import { CartContext } from '../../context/CartContext'
// import "./styles.css";

// export const Productos = () => {

    
//     const {addItemToCart} = useContext(CartContext) 

//     const getData = async () => {
//         const response = axios.get('https://el-buen-sabor.herokuapp.com/articulo-manufacturado/getAll')
//         return response
//     }  
//     const [data, setData] = useState([])

//     useEffect(() => {
//       getData().then((response) => {
//           setData(response.data)
//       })
//     },[])

//   return (    
//             <MDBRow className="productsContainer">{
//                     data.map(      
//                         (info)=>(                 
//                             <MDBCard key={info.id} className="product">
//                                 <MDBCardImage
//                                 src={info.imagen}
//                                 alt={info.denominacion}
//                                 position='top'
//                                 />
//                                 <MDBCardBody>
//                                 <MDBCardTitle>{info.denominacion}</MDBCardTitle>
//                                 <MDBCardText>
//                                     ${info.precio_venta} - Tiempo estimado: {info.tiempo_estimado_cocina} minutos
//                                 </MDBCardText>
//                                 </MDBCardBody>
//                                 <MDBBtn onClick={() => addItemToCart(info)}>Añadir al carrito</MDBBtn>
//                             </MDBCard>                                             
//                         )
//                     )    
//                 }
//             </MDBRow>     
//   )

// }

import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { CartContext } from '../../context/CartContext'
import './productos.css'

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
        <div className='wrapper'>
        {
            data.map(      
                (info)=>(                 
                    // </div>                   
                    <div className="card">
                    <img src={info.imagen} alt={info.denominacion} className="card__img" />
                    <div className="card__body">
                      <h2 className="card__title">{info.denominacion}</h2>
                      <p className="card__description">{info.tiempo_estimado_cocina} minutos</p>
                      <h3 className="card__price">{info.precio_venta}</h3>
                      <button onClick={() => addItemToCart(info)} className="card__btn">Add to Cart</button>
                    </div>
                    </div>            
                )
            )
        }        
        </div>
    )
}

