import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Container, Form, Modal } from 'react-bootstrap'
import { NavbarAdministrador } from '../NavbarAdministrador'

export const GrillaArticulos = () => {

    const getData = async () => {
        const response = axios.get('https://el-buen-sabor.herokuapp.com/articulo-manufacturado/getAll')
        return response
    }  
  
    const [data, setData] = useState([])
    const [updateList, setUpdateList] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [dataModal, setDataModal] = useState({})

    const handleCloseModal = () => {setShowModal(false)}
    const handleOpenModal = () => {setShowModal(true)}

    useEffect(() => {
      getData().then((response) => {
          setData(response.data)
      })
    },[updateList])


    const handleChange = ({target}) => {
        setDataModal({
            ...dataModal,
            [target.name]: target.value
        })
    }

    const handleDelete = async id => {
        await axios.delete(`https://el-buen-sabor.herokuapp.com/articulo-manufacturado/${id}`)
        setUpdateList(!updateList)
    }

    const handleEdit = async (info) => {
        setDataModal(info)
        handleOpenModal()
    }
    
    const handleSubmit = async (e) => {
        // if (dataModal.denominacion === '' || dataModal.imagen === '' || dataModal.precio_venta <= 0 || dataModal.tiempo_estimado_cocina <= 0) {
        //     alert('Todos los campos son obligatorios')
        //     return
        // }  
        console.log(dataModal.denominacion)
        e.preventDefault()
        const articuloManufacturado = {
            id: Number(dataModal.id),
            tiempo_estimado_cocina: Number(dataModal.tiempo_estimado_cocina),
            denominacion: dataModal.denominacion,
            precio_venta: Number(dataModal.precio_venta),
            imagen: dataModal.imagen
        }
        const res = await axios.put('https://el-buen-sabor.herokuapp.com/articulo-manufacturado', articuloManufacturado)
        if (res.status === 200) {
            alert('Articulo manufacturado editado con éxito')
        } else {
            alert('Error al intentar editar un articulo manufacturado')
        }
    }


    const DisplayData=data.map(
        
        (info)=>{
            return(
                <tr key={info.id}>
                    <td>{info.tiempo_estimado_cocina}</td>
                    <td>{info.denominacion}</td>
                    <td>{info.precio_venta}</td>
                    <td>{info.imagen}</td>
                    <td>
                        <div className="mb-3">
                            <button onClick={()=>handleDelete(info.id)} className="btn btn-danger">Delete</button>
                        </div>
                        <div className="mb-3">
                            <button onClick={()=>handleEdit(info)} className="btn btn-dark">Update</button>
                        </div>
                    </td>
                </tr>
            )
        }
    ) 

  return (

    <Container>
    <NavbarAdministrador/>
        <h1>Grilla de Articulos</h1>
        <table className="table table-striped">
        <thead>
            <tr>
                <th>Tiempo estimado</th>
                <th>Denominacion</th>
                <th>Precio venta</th>
                <th>Imagen</th>
            </tr>
        </thead>
        <tbody>
            {DisplayData}                   
        </tbody>
        </table>

        
        <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Title>Actualizar datos</Modal.Title>
                <Form>
                    <Modal.Body>
                        <div className="mb-3">
                            <label htmlFor="tiempo_estimado_cocina" className="form-label">tiempo_estimado_cocina</label>
                            <input value={dataModal.tiempo_estimado_cocina} name="tiempo_estimado_cocina" onChange={handleChange} type="number" id="tiempo_estimado_cocina" className="form-control"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="denominacion" className="form-label">denominacion</label>
                            <input value={dataModal.denominacion} name="denominacion" onChange={handleChange} type="text" id="denominacion" className="form-control"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="precio_venta" className="form-label">precio_venta</label>
                            <input value={dataModal.precio_venta} name="precio_venta" onChange={handleChange} type="number" id="precio_venta" className="form-control"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="imagen" className="form-label">imagen</label>
                            <input value={dataModal.imagen} name="imagen" onChange={handleChange} type="text" id="imagen" className="form-control"/>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-secondary" onClick={handleCloseModal}>
                            Cerrar
                        </button>
                        <button className="btn btn-succes" type="submit" onClick={handleSubmit}>
                            Guardar 
                        </button>
                    </Modal.Footer>
                </Form>
        </Modal>

    </Container>
  )

}
