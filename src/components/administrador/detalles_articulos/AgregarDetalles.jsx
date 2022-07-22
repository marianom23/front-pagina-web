// import React, { useState } from 'react';
// import axios from 'axios'
// import { useNavigate } from "react-router-dom";
// import { NavbarAdministrador } from '../NavbarAdministrador';
// import { Footer } from '../../generales/nav-foot/Footer';
// import Swal from 'sweetalert2'
// import Select from 'react-select';

// import {
//     MDBInput,
//     MDBBtn,
// } from 'mdb-react-ui-kit';

// export const AgregarDetalles = () => {

//     const [isActive, setIsActive] = useState(false)
//     const [articulos, setArticulos] = useState([])
//     const [insumos, setInsumos] = useState([])

//     const insumostrue =  insumos.filter(insumos => insumos.es_insumo === true);


//     const getArticulos = async () => {
//         const data = await axios.get("https://el-buen-sabor.herokuapp.com/articulo-manufacturado/getAll")
//         return data
//     }


//     const getInsumos = async () => {
//         const data = await axios.get("https://el-buen-sabor.herokuapp.com/articulo-insumo/getAll")
//         return data;
//     }

//     React.useEffect(() => {
//         getArticulos().then((response) => {
//             setArticulos(response.data)
//         })
//         getInsumos().then((response) => {
//             setInsumos(response.data)
//         })
//     }, [])

//     const unidad_medida = [
//         {
//             id: 1,
//             label: "Litros",
//             value: "litros",
//         },
//         {
//             id: 2,
//             label: "Gramos",
//             value: "gramos",
//         },
//         {
//             id: 3,
//             label: "Unidades",
//             value: "unidades",
//         },
//     ];

//     const recargar = () =>{
//         navigate("/agregar-articulo-manufacturado", { replace: true });
//     }


//     const [data, setData] = useState({ cantidad: "", unidad_medida: "", id_articulo_manufacturado: "", id_articulo_insumo: "" })
//     let navigate = useNavigate();
//     const handleChange = ({ target }) => {
//         setData({
//             ...data,
//             [target.name]: target.value
//         })
//         console.log("Target value:", target.value)
//         console.log("Target name:", target.name)
//         console.log("data:", data)

//     }

//     const handleSubmit = async (e) => {
//         e.preventDefault()

//         console.log("data:",data)
//         const detalles = {
//             unidad_medida: data.unidad_medida,
//             cantidad: Number(data.cantidad),
//             id_articulo_manufacturado: Number(data.id_articulo_manufacturado),
//             id_articulo_insumo:  Number(data.id_articulo_insumo),
//         }

//         console.log("detalles:",detalles)

//         const res = await axios.post('https://el-buen-sabor.herokuapp.com/articulo-manufacturado-detalle', detalles)
//         if (res.status === 200) {
//             Swal.fire({
//                 title: "Agregado",
//                 text: `¿Deseas agregar otro insumo a este producto?`,
//                 icon: "warning",
//                 showDenyButton: true,
//                 denyButtonText: 'No',
//                 confirmButtonText: 'Si',
//             }).then(result => {
//                 if (result.isConfirmed) {
//                     Swal.fire('Proceda');
//                 } else if(result.isDenied){
//                     Swal.fire('Limpiando pantalla').then(
//                         function(){
//                             // navigate("/agregar-detalle-articulo", { replace: true })
//                             window.location.href = "/agregar-detalle-articulo";
//                         }
//                     )
//                 }
//             })
//         } 
//     }

//     const handleSelectChange = ({value}) =>{
//         console.log(value)
//     }

//     const handleReturn = () => {
//         navigate("/login", { replace: true })
//     }

//     // document.getElementById("cantidad").hidden = true;

//     return (
//         // :::  BUG :::: El formulario no toma los valores por defecto de los 'selects'.
//         // :: el componente SI funciona.
//         // :: si no se selecciona nada de las listas por defecto no agrega nada. 
//         // :: el primer valor de la lista debería ser vacío por defecto.
//         <><NavbarAdministrador />
//             <div className="container">

//                 <h2>Añadir detalles del articulo</h2>

//                 <br />

//                 <form onSubmit={handleSubmit}>


//                     <Select
//                         defaultValue={{label: 'Selecciona un articulo', value: 'empty'}}
//                         options = {articulos.map(obj =>({label: obj.denominacion, value: obj.id}))}
//                         onChange = {handleSelectChange}
//                     />

//                     <hr/>

//                     <Select
//                         defaultValue={{label: 'Selecciona un insumo', value: 'empty'}}
//                         options = {insumostrue.map(obj =>({label: obj.denominacion, value: obj.id}))}
//                         onChange = {handleSelectChange}
//                     />
                    
//                     <hr />

//                     <Select
//                         defaultValue={{label: 'Selecciona una unidad de medida', value: 'empty'}}
//                         options = {unidad_medida.map(obj =>({label: obj.label, value: obj.value}))}
//                         onChange = {handleSelectChange}
//                     />

//                     <hr />

//                     <MDBInput value={data.cantidad} onChange={handleChange} type='number' className='mb-4' name="cantidad" id='cantidad' label='cantidad' />

//                     <MDBBtn type='submit' className='mb-4' block>
//                         Agregar detalles
//                     </MDBBtn>
//                     <MDBBtn type='submit' onClick={handleReturn} className='mb-4' block>
//                         Cancelar
//                     </MDBBtn>
//                 </form>
//             </div>
//             <Footer />
//         </>
//     )
// }

import React, { useState } from 'react';
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { NavbarAdministrador } from '../NavbarAdministrador';
import { Footer } from '../../generales/nav-foot/Footer';
import swal from 'sweetalert';

import {
    MDBInput,
    MDBCol,
    MDBRow,
    MDBCheckbox,
    MDBBtn,
    MDBIcon
} from 'mdb-react-ui-kit';

export const AgregarDetalles = () => {

    const [articulos, setArticulos] = useState([])
    const [insumos, setInsumos] = useState([])

    const getArticulos = async () => {
        const data = await axios.get("https://el-buen-sabor.herokuapp.com/articulo-manufacturado/getAll")
        return data
    }

    const getInsumos = async () => {
        const data = await axios.get("https://el-buen-sabor.herokuapp.com/articulo-insumo/getAll")
        return data
    }

    React.useEffect(() => {
        getArticulos().then((response) => {
            setArticulos(response.data)
        })
        getInsumos().then((response) => {
            setInsumos(response.data)
        })
    }, [])

    const unidad_medida = [
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


    const [data, setData] = useState({ cantidad: "", unidad_medida: "", id_articulo_manufacturado: "", id_articulo_insumo: "" })
    let navigate = useNavigate();
    const handleChange = ({ target }) => {
        setData({
            ...data,
            [target.name]: target.value
        })
        console.log("Target value:", target.value)
        console.log("Target name:", target.name)
        console.log("data:", data)

    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        console.log("data:",data)
        const detalles = {
            unidad_medida: data.unidad_medida,
            cantidad: Number(data.cantidad),
            id_articulo_manufacturado: Number(data.id_articulo_manufacturado),
            id_articulo_insumo:  Number(data.id_articulo_insumo),
        }

        console.log("detalles:",detalles)

        const res = await axios.post('https://el-buen-sabor.herokuapp.com/articulo-manufacturado-detalle', detalles)
        if (res.status === 200) {
            swal({
                title: "Agregado",
                text: `¿Deseas agregar otro insumo a este producto?`,
                icon: "warning",
                buttons: ["No","Sí"]
            }).then(respuesta=>{
                if(respuesta){
                    swal({text: "Proceda",
                icon: "success"})
                }else{
                    swal({text: "El insumo se guardo con exito",
                    icon: "success"
                })
                navigate("/agregar-detalle-articulo", { replace: true });
                }
            })
        } else {
            alert('Error al intentar crear un articulo insumo')
            navigate("/agregar-detalle-articulo", { replace: true });
        }
    }


    const handleReturn = () => {
        navigate("/login", { replace: true })
    }

    // document.getElementById("cantidad").hidden = true;

    return (
        // :::  BUG :::: El formulario no toma los valores por defecto de los 'selects'.
        // :: el componente SI funciona.
        // :: si no se selecciona nada de las listas por defecto no agrega nada. 
        // :: el primer valor de la lista debería ser vacío por defecto.
        <><NavbarAdministrador />
            <div className="container">

                <h2>Añadir detalles del articulo</h2>

                <br />

                <form onSubmit={handleSubmit}>

                    <label><b>Articulo Manufacturado: </b></label>
                    <select className="select-container" value={articulos.denominacion} onChange={handleChange} name="id_articulo_manufacturado">
                        {articulos.map(obj =>
                            <option key={obj.id} value={obj.id} >{obj.denominacion}</option>
                        )}
                    </select>

                    <hr/>

                    <label><b>Insumos: </b></label><select className="select-container" value={insumos.denominacion} onChange={handleChange} name="id_articulo_insumo">
                        {insumos.map(obj =>
                            <option key={obj.id} value={obj.id} >{obj.denominacion}</option>
                        )}
                    </select>
                    
                    <hr />

                    <label><b>Unidad medida</b></label>
                    <select className="select-container" value={data.unidad_medida} onChange={handleChange} name="unidad_medida">
                        {unidad_medida.map(obj =>
                            <option key={obj.id} value={obj.value} >{obj.label}</option>
                        )}
                    </select>

                    <br />
                    <br />

                    <MDBInput value={data.cantidad} onChange={handleChange} type='number' className='mb-4' name="cantidad" id='cantidad' label='cantidad' />

                    <MDBBtn type='submit' className='mb-4' block>
                        Agregar detalles
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

