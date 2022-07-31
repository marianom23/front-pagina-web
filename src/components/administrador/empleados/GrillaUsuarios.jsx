import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Container, Form, Modal } from 'react-bootstrap'
import { NavbarAdministrador } from '../NavbarAdministrador'
import './grillaUsuario.css'
import './select.css'

export const GrillaUsuarios = () => {

    const getData = async () => {
        const response = axios.get('https://el-buen-sabor.herokuapp.com/usuarios')
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

    const rol = [
        {
            id: 1,
            label: "Usuario",
            value: "100",
        },
        {
            id: 2,
            label: "Cajero",
            value: "200",
        },
        {
            id: 3,
            label: "Cocinero",
            value: "300",
        },
        {
            id: 4,
            label: "Delivery",
            value: "400",
        },
        {
            id: 5,
            label: "Administrador",
            value: "500",
        }
    ];


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
        console.log(dataModal.denominacion)
        e.preventDefault()
        const cambio = {
            id: Number(dataModal.id),
            rol: Number(dataModal.rol)
        }
        const res = await axios.put(`https://el-buen-sabor.herokuapp.com/usuarios`, cambio)
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
                    <td>{info.nombre}</td>
                    <td>{info.apellido}</td>
                    <td>{info.usuario}</td>
                    <td>{info.rol}</td>
                    <td>
                        {/* <div className="mb-3">
                            <button onClick={()=>handleDelete(info.id)} className="btn btn-danger">Delete</button>
                        </div> */}
                        <div className="mb-3">
                            <button onClick={()=>handleEdit(info)} className="btn btn-success">Update rol</button>
                        </div>
                    </td>
                </tr>
            )
        }
    ) 

  return (

    <>
    <NavbarAdministrador/>
        <h1>Grilla de usuarios</h1>
        <table id="rwd-table-large">
        <thead>
            <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Usuario</th>
                <th>rol</th>
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

                        <div className="select">
                        <select onChange={handleChange} name="rol">
                            <option selected disabled>Selecciona un rol</option>
                            {rol.map(obj =>
                                <option key={obj.id} value={obj.value}>{obj.label}</option>
                            )}
                        </select>
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

    </>
  )

}
