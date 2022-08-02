import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Container, Form, Modal } from 'react-bootstrap'
import { NavbarAdministrador } from '../NavbarAdministrador'
import "./grilla.css"
import { useNavigate } from 'react-router-dom'
import useUser from '../../hooks/useUser'

export const GrillaInsumo = () => {

    let navigate = useNavigate();
    const {usuario} = useUser();
  
    useEffect(() => {
        if (usuario !== null) {
            if (usuario.rol === 100 || usuario.rol === 500) {
              }else{
                alert('Tienes que logearte como administrador para acceder')
                navigate("/login", { replace: true });
              }   
        }else{
            alert('Tienes que logearte como administrador para acceder')
            navigate("/login", { replace: true });
        }
    }, [])

    const getData = async () => {
        const response = axios.get('https://el-buen-sabor.herokuapp.com/articulo-insumo/getAll')
        return response
    }  
  
    const [data, setData] = useState([])
    const [updateList, setUpdateList] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [showModal2, setShowModal2] = useState(false)
    const [dataModal, setDataModal] = useState({})
    const [dataModal2, setDataModal2] = useState({})
    const handleCloseModal = () => {setShowModal(false)}
    const handleOpenModal = () => {setShowModal(true)}
    const handleCloseModal2 = () => {setShowModal2(false)}
    const handleOpenModal2 = () => {setShowModal2(true)}
    const [numero, setNumero] = useState()

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
    const handleChange2 = ({target}) => {
        setDataModal2({
            ...dataModal2,
            [target.name]: target.value
        })
        setNumero(target.value)

    }


    const handleDelete = async id => {
        await axios.delete(`https://el-buen-sabor.herokuapp.com/articulo-insumo/${id}`)
        setUpdateList(!updateList)
    }

    const handleEdit = async (info) => {
        setDataModal(info)
        handleOpenModal()
    }
    const handleEdit2 = async (info) => {
        setDataModal2(info)
        handleOpenModal2()
    }
    
    const handleSubmit = async (e) => {
        // if (dataModal.denominacion === '' || dataModal.imagen === '' || dataModal.precio_venta <= 0 || dataModal.tiempo_estimado_cocina <= 0) {
        //     alert('Todos los campos son obligatorios')
        //     return
        // }  
        // console.log(dataModal.denominacion)
        e.preventDefault()
        const insumo = {
            id: Number(dataModal.id),
            precio_compra: Number(dataModal.precio_compra),
            precio_venta: Number(dataModal.precio_venta),
            stock_actual: Number(dataModal.stock_actual),
            stock_minimo: Number(dataModal.stock_minimo),
            unidad_medida: Number(dataModal.unidad_medida),
            es_insumo: Boolean(dataModal.es_insumo),
        }
        const res = await axios.put('https://el-buen-sabor.herokuapp.com/articulo-insumo', insumo)
        if (res.status === 200) {
            alert('Insumo editado con éxito')
        } else {
            alert('Error al intentar editar un insumo')
        }
    }

    const handleAgregar = async (e) => {
        // if (dataModal.denominacion === '' || dataModal.imagen === '' || dataModal.precio_venta <= 0 || dataModal.tiempo_estimado_cocina <= 0) {
        //     alert('Todos los campos son obligatorios')
        //     return
        // }  
        // console.log(dataModal.denominacion)
        e.preventDefault()
        const insumo = {
            id_articulo_insumo: Number(dataModal2.id),
            cantidad: Number(dataModal2.stock_actual)
        }
        const res = await axios.put('https://el-buen-sabor.herokuapp.com/articulo-insumo/agregar-stock-insumo', insumo)
        if (res.status === 200) {
            alert('Insumo agregado con éxito')
        } else {
            alert('Error al intentar editar un insumo')
        }
    }


    const DisplayData=data.map(
        
        (info)=>{
            return(
                <tr key={info.id}>
                    <td>{info.denominacion}</td>
                    <td>{info.precio_compra}</td>
                    <td>{info.precio_venta}</td>
                    <td>{info.stock_actual}</td>
                    <td>{info.stock_minimo}</td>
                    <td>{info.unidad_medida}</td>
                    <td>{info.es_insumo ? "si" : "no"} </td>
                    <td>
                        <div className="mb-3">
                            <button onClick={()=>handleDelete(info.id)} className="btn btn-danger">Delete</button>
                        </div>
                        <div className="mb-3">
                            <button onClick={()=>handleEdit(info)} className="btn btn-dark">Update</button>
                        </div>
                        <div className="mb-3">
                            <button onClick={()=>handleEdit2(info)} className="btn btn-success">Agregar</button>
                        </div>
                    </td>
                </tr>
            )
        }
    ) 

  return (

    <>
    <NavbarAdministrador/>
        <h1>Grilla de Insumos</h1>
        <table id="rwd-table-large">
        <thead>
            <tr>
                <th>Nombre</th>
                <th>precio_compra</th>
                <th>precio_venta</th>
                <th>stock_actual</th>
                <th>stock_minimo</th>
                <th>unidad_medida</th>
                <th>es_insumo</th>
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
                            <label htmlFor="precio_compra" className="form-label">precio_compra</label>
                            <input value={dataModal.precio_compra} name="precio_compra" onChange={handleChange} type="number" id="precio_compra" className="form-control"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="precio_venta" className="form-label">precio_venta</label>
                            <input value={dataModal.precio_venta} name="precio_venta" onChange={handleChange} type="text" id="precio_venta" className="form-control"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="stock_actual" className="form-label">stock_actual</label>
                            <input value={dataModal.stock_actual} name="stock_actual" onChange={handleChange} type="number" id="stock_actual" className="form-control"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="stock_minimo" className="form-label">stock_minimo</label>
                            <input value={dataModal.stock_minimo} name="stock_minimo" onChange={handleChange} type="text" id="stock_minimo" className="form-control"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="unidad_medida" className="form-label">unidad_medida</label>
                            <input value={dataModal.unidad_medida} name="unidad_medida" onChange={handleChange} type="text" id="unidad_medida" className="form-control"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="es_insumo" className="form-label">es_insumo</label>
                            <input value={dataModal.es_insumo} name="es_insumo" onChange={handleChange} type="text" id="es_insumo" className="form-control"/>
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

        <Modal show={showModal2} onHide={handleCloseModal2}>
                <Modal.Title>Actualizar datos</Modal.Title>
                <Form>
                    <Modal.Body>
                        <div className="mb-3">
                            <label htmlFor="stock_actual" className="form-label">¿Cuanto quiere agregar?</label>
                            <input value={dataModal2.stock_actual} name="stock_actual" onChange={handleChange2} type="number" id="stock_actual" className="form-control"/>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-secondary" onClick={handleCloseModal2}>
                            Cerrar
                        </button>
                        <button className="btn btn-succes" type="submit" onClick={handleAgregar}>
                            Guardar 
                        </button>
                    </Modal.Footer>
                </Form>
        </Modal>

    </>
  )

}
