import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './grilla.css'
import * as XLSX from 'xlsx'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { NavbarAdministrador } from '../NavbarAdministrador'
import useUser from '../../hooks/useUser'
import { useNavigate } from 'react-router-dom'

export const PedidosPorCliente = () => {

    const [pedidosPorCliente, setPedidosPorCliente] = useState([])

    const [fechaInicial, setFechaInicial] = useState(null)
    const [fechaFinal, setFechaFinal] = useState(null)

    const getDataWithDate = async (desde, hasta) => {
        if (fechaInicial !== null && fechaFinal !== null) {
            //const url = `http://localhost:8080/pedidos-por-cliente?desde=${desde}&hasta=${hasta}`
            const url = `https://el-buen-sabor.herokuapp.com/pedidos-por-cliente?desde=${desde}&hasta=${hasta}`
            console.log("URL:", url)
            const resp = await axios.get(url)
            const data = await resp.data;
            console.log("data:", data)
            setPedidosPorCliente(data)
            return data
        } else {
            return
        }
    }

    let navigate = useNavigate();
    const {usuario} = useUser()
    console.log(usuario)
  
  
    useEffect(() => {
      if (usuario !== null) {
          if (usuario.rol === 500) {
            }else{
              alert('Tienes que logearte como administrador para acceder')
              navigate("/login", { replace: true });
            }   
      }else{
          alert('Tienes que logearte como administrador para acceder')
          navigate("/login", { replace: true });
      }
    }, [])

    const buscarRankingEntreDosFechas = async () => {
        const desde = setFechaInicialString()
        const hasta = setFechaFinalString()
        await getDataWithDate(desde, hasta);
    }

    const setFechaFinalString = () => {
        const month = fechaFinal.getMonth() + 1; //months from 1-12
        const day = fechaFinal.getDate();
        const year = fechaFinal.getFullYear();
        const fechaFinalQuery = year + "-" + month + "-" + day;
        return fechaFinalQuery
    }
    const setFechaInicialString = () => {
        const month = fechaInicial.getMonth() + 1; //months from 1-12
        const day = fechaInicial.getDate();
        const year = fechaInicial.getFullYear();
        const fechaInicialQuery = year + "-" + month + "-" + day;
        return fechaInicialQuery
    }

    useEffect(() => {
    }, [])

    const handleOnExport = () => {
        console.log("handleOnExport", pedidosPorCliente)
        const ws = XLSX.utils.json_to_sheet(pedidosPorCliente);
        const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
        XLSX.writeFile(wb, 'ranking-pedidos-por-cliente.xlsx')
    }

    const DisplayData = pedidosPorCliente.map(

        (info) => {
            return (
                <tr key={info.id_cliente}>
                    <td data-label="cantidad">{info.cantidad_pedidos}</td>
                    <td data-label="id cliente">{info.id_cliente}</td>
                    <td data-label="total">${info.total}</td>
                </tr>
            )
        }
    )

    return (
        <>
            <NavbarAdministrador />
            <br />
            <h1>Listado de pedidos por cliente</h1>

            <h3>Desde:</h3>

            <DatePicker
                placeholderText='ingrese fecha'
                selected={fechaInicial}
                onChange={date => setFechaInicial(date)}
                dateFormat='yyyy/MM/dd'

            />
            <br />
            <br />
            <h3>Hasta:</h3>
            <DatePicker
                placeholderText='ingrese fecha'
                selected={fechaFinal}
                onChange={date => setFechaFinal(date)}
                dateFormat='yyyy/MM/dd'
            />
            <br />
            <br />
            {/* <div className='container'> */}
            <div className="mb-3">
                <button onClick={buscarRankingEntreDosFechas} className="btn btn-primary"><b>Buscar Pedidos</b></button>
                <button onClick={handleOnExport} className="btn btn-success"><b>Exportar en Excel</b></button>
            </div>
            {/* </div> */}
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th><b>CANTIDAD DE PEDIDOS</b></th>
                        <th><b>ID CLIENTE</b></th>
                        <th><b>TOTAL</b></th>
                    </tr>
                </thead>
                <tbody>
                    {DisplayData}
                </tbody>
            </table>

            <br />

        </>
    )
}

