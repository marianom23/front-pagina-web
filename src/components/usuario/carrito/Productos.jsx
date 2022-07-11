import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { MDBCard, MDBCardImage, MDBCardBody, MDBBtn, MDBCardTitle, MDBCardText, MDBRow, MDBCol } from 'mdb-react-ui-kit';


export const Productos = () => {
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
            <MDBRow className='row-cols-1 row-cols-md-3 g-4'>{
                    data.map(
                
                        (info)=>(                 
                                    <MDBCard key={info.id} className='h-100'>
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
                                        <MDBBtn onClick={() => console.log(info)}>Añadir</MDBBtn>
                                    </MDBCard>                                             
                        )
                    )    
                }
            </MDBRow>     
  )

}
