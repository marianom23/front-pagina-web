import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Container, Form, Modal } from 'react-bootstrap'

export const Grilla = () => {

    const getData = async () => {
        const response = axios.get('http://localhost:9000/api')
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
        await axios.delete(`http://localhost:9000/api/${id}`)
        setUpdateList(!updateList)
    }

    const handleEdit = async (info) => {
        setDataModal(info)
        handleOpenModal()
    }
    
    const handleSubmit = async (e) => {
        if (dataModal.titulo === '' || dataModal.autor === '' || dataModal.edicion <= 0) {
            alert('Todos los campos son obligatorios')
            return
        }    
        e.preventDefault()
        await axios.put(`http://localhost:9000/api/${dataModal.id}`, dataModal)
    }


    const DisplayData=data.map(
        
        (info)=>{
            return(
                <tr key={info.id}>
                    <td>{info.titulo}</td>
                    <td>{info.autor}</td>
                    <td>{info.edicion}</td>
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
        <table className="table table-striped">
        <thead>
            <tr>
                <th>Id</th>
                <th>Titulo</th>
                <th>Autor</th>
                <th>Edicion</th>
            </tr>
        </thead>
        <tbody>
            {DisplayData}                   
        </tbody>
        </table>

        
        <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>Actualizar datos</Modal.Title>
                <Form>
                    <Modal.Body>
                        <div className="mb-3">
                            <label htmlFor="titulo" className="form-label">titulo</label>
                            <input value={dataModal.titulo} name="titulo" onChange={handleChange} type="text" id="title" className="form-control"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="autor" className="form-label">autor</label>
                            <input value={dataModal.autor} name="autor" onChange={handleChange} type="text" id="author" className="form-control"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="edicion" className="form-label">edicion</label>
                            <input value={dataModal.edicion} name="edicion" onChange={handleChange} type="text" id="edition" className="form-control"/>
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
            </Modal.Header>
        </Modal>

    </Container>
  )

}
