import React, { useState } from 'react';
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { NavbarAdministrador } from '../NavbarAdministrador';
import { Footer } from '../../generales/nav-foot/Footer';
import {
  MDBInput,
  MDBCol,
  MDBRow,
  MDBCheckbox,
  MDBBtn,
  MDBIcon
} from 'mdb-react-ui-kit';

export const AgregarInsumo = () => {

  const options = [
    {
      id: 1,
      label: "Litros",
      value: "litros",
    },
    {
      id: 2,
      label: "Gramos",
      value: "gramos",
    },
    {
      id: 3,
      label: "Kilogramos",
      value: "kilogramos",
    },
  ];


  const [data, setData] = useState({ denominacion: "", precio_compra: "", precio_venta: "", stock_actual: "", stock_minimo: "", unidad_medida: "", es_insumo: false })
  const [archivo, setArchivo] = useState(null)
  let navigate = useNavigate();


  const handleChange = ({ target }) => {
    if (target.files) {
      console.log("... cargando imagen", target.files)
      setArchivo(target.files)
    }
    console.log("Target value:", target.value)
    console.log("Target name:", target.name)
    setData({
      ...data,
      [target.name]: target.value
    })
    console.log("-----")
    console.log("Target value:", target.value)
    console.log("Target name:", target.name)
    console.log("data:", data)
  }

  let imagenUpload = ""
  const cargarImagen = async (e) => {
    const formData = new FormData()
    formData.append("file", archivo[0])
    formData.append("upload_preset", "sw2cxppo")
    const response = await axios.post("https://api.cloudinary.com/v1_1/dggpzhjo3/image/upload", formData)
    if (response) {
      imagenUpload = response.data.secure_url
      return imagenUpload
    } else {
      console.log("error al cargar la imagen",response)
      alert("error al cargar la imagen",response)
    }
    return archivo
  }

  const handleSubmit = async (e) => {
    // if (data.denominacion === '' || data.precio_compra  <= 0 || data.precio_compra <= 0) {
    //       alert('Todos los campos son obligatorios')
    //       return
    // }    
    e.preventDefault()

    const imagenUpload = await cargarImagen();
    console.log("imagenUpload:", imagenUpload)

    console.log(data)
    const articuloInsumo = {
      denominacion: data.denominacion,
      precio_compra: Number(data.precio_compra),
      precio_venta: Number(data.precio_venta),
      stock_actual: Number(data.stock_actual),
      stock_minimo: Number(data.stock_minimo),
      unidad_medida: data.unidad_medida,
      es_insumo: Boolean(data.es_insumo),
      imagen: imagenUpload
    }

    console.log("articuloInsumo:", articuloInsumo)

    const res = await axios.post('https://el-buen-sabor.herokuapp.com/articulo-insumo', articuloInsumo)
    if (res.status === 200) {
      alert('Articulo insumo creado con éxito')
      navigate("/agregar-insumo", { replace: true });
    } else {
      alert('Error al intentar crear un articulo insumo')
      navigate("/agregar-insumo", { replace: true });
    }
    console.log(res)
  }

  const handleReturn = () => {
    navigate("/login", { replace: true })
  }

  return (
    <><NavbarAdministrador />
      <div className="container">
        <h2>Añadir insumo</h2>
        <br />
        <form onSubmit={handleSubmit}>
          <MDBInput value={data.denominacion} onChange={handleChange} type='text' className='mb-4' name="denominacion" id='denominacion' label='denominacion' />
          <MDBInput value={data.precio_compra} onChange={handleChange} type='number' className='mb-4' name="precio_compra" id='precio_compra' label='precio_compra' />
          <MDBInput value={data.precio_venta} onChange={handleChange} name="precio_venta" className='mb-4' type='number' id='precio_venta' label='precio_venta' />
          <MDBInput value={data.stock_actual} onChange={handleChange} name="stock_actual" className='mb-4' type='number' id='stock_actual' label='stock_actual' />
          <MDBInput value={data.stock_minimo} onChange={handleChange} name="stock_minimo" className='mb-4' type='number' id='stock_minimo' label='stock_minimo' />
          <MDBInput onChange={handleChange} name="archivo" className='mb-4' type='file' id='archivo' />

          <label><b>unidad medida</b></label><select className="select-container" value={data.unidad_medida} onChange={handleChange} name="unidad_medida">
            {options.map(obj =>
              <option key={obj.id} value={obj.value} >{obj.label}</option>
            )}
          </select>

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

