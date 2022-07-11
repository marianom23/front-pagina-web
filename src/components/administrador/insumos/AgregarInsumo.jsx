import React, { useState } from 'react';
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { Navbar } from '../../generales/Navbar';
import { Footer } from '../../generales/Footer';
import {
  MDBInput,
  MDBCol,
  MDBRow,
  MDBCheckbox,
  MDBBtn,
  MDBIcon
} from 'mdb-react-ui-kit';

export const AgregarInsumo = () => {

  const [data, setData] = useState({ denominacion: "", precio_compra: "", precio_venta: "", stock_actual: "", stock_minimo: "", unidad_medida: "", es_insumo: false })
  let navigate = useNavigate();
  const handleChange = ({ target }) => {
    setData({
      ...data,
      [target.name]: target.value
    })

  }

  const handleSubmit = async (e) => {
    // if (data.denominacion === '' || data.precio_compra  <= 0 || data.precio_compra <= 0) {
    //       alert('Todos los campos son obligatorios')
    //       return
    // }    
    e.preventDefault()
    console.log(data)
    const articuloInsumo = {
      denominacion: data.denominacion,
      precio_compra: Number(data.precio_compra),
      precio_venta: Number(data.precio_venta),
      stock_actual: Number(data.stock_actual),
      stock_minimo: Number(data.stock_minimo),
      unidad_medida: data.unidad_medida,
      es_insumo: Boolean(data.es_insumo)
    }
    
    console.log(articuloInsumo)

    const res = await axios.post('https://el-buen-sabor.herokuapp.com/articulo-insumo', articuloInsumo)
    if (res.status === 200) {
      alert('Articulo insumo creado con éxito')
      navigate("/agregarinsumo", { replace: true });
    } else {
      alert('Error al intentar crear un articulo insumo')
      navigate("/agregarinsumo", { replace: true });
    }
    console.log(res)
  }

  const handleReturn = () => {
    navigate("/login", { replace: true })
  }

  return (
    <><Navbar />
    <div className="container">
      <h2>Añadir insumo</h2>
      <br />
      <form onSubmit={handleSubmit}>
        <MDBInput value={data.denominacion} onChange={handleChange} type='text' className='mb-4' name="denominacion" id='denominacion' label='denominacion' />
        <MDBInput value={data.precio_compra} onChange={handleChange} type='number' className='mb-4' name="precio_compra" id='precio_compra' label='precio_compra' />
        <MDBInput value={data.precio_venta} onChange={handleChange} name="precio_venta" className='mb-4' type='number' id='precio_venta' label='precio_venta' />
        <MDBInput value={data.stock_actual} onChange={handleChange} name="stock_actual" className='mb-4' type='number' id='stock_actual' label='stock_actual' />
        <MDBInput value={data.stock_minimo} onChange={handleChange} name="stock_minimo" className='mb-4' type='number' id='stock_minimo' label='stock_minimo' />
        <MDBInput value={data.unidad_medida} onChange={handleChange} name="unidad_medida" className='mb-4' type='text' id='unidad_medida' label='unidad_medida' />
        <MDBCheckbox value={data.es_insumo} onChange={handleChange} name='es_insumo' id='es_insumo' type='checkbox' label='Insumo' />
        <MDBBtn type='submit' className='mb-4' block>
          Agregar Insumo
        </MDBBtn>
        <MDBBtn type='submit' onClick={handleReturn} className='mb-4' block>
          Cancelar
        </MDBBtn>
      </form>
    </div>
    <Footer />
    </>
  )
}

