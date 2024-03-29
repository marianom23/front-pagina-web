import React, { useEffect, useState } from 'react'
import axios from 'axios'
import * as XLSX from 'xlsx'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { NavbarAdministrador } from '../NavbarAdministrador'
import { useNavigate } from 'react-router-dom'
import useUser from '../../hooks/useUser'
import './grilla.css'
export const Recaudaciones = () => {

    const [recaudacionDiaria, setRecaudacionDiaria] = useState([])
    const [recaudacionPeriodica, setRecaudacionPeriodica] = useState([])

    const [fechaInicial, setFechaInicial] = useState(null)
    const [fechaFinal, setFechaFinal] = useState(null)
    const [fecha, setFecha] = useState(null)

    const [total, setTotal] = useState(0)

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

    const getDataByDay = async (fecha) => {
        if (fecha !== null) {
            // const url = `http://localhost:8080/recaudaciones-diarias?fecha=${fecha}`
            const url = `https://el-buen-sabor.herokuapp.com/recaudaciones-diarias?fecha=${fecha}`
            console.log("URL:", url)
            const resp = await axios.get(url)
            console.log("resp:", resp)

            const data = await resp.data;
            console.log("data:", data)
            setRecaudacionDiaria(data)
            return data
        }
    }

    const buscarRecuadacionDiaria = async () => {
        const fechaDiaria = setDia()
        console.log("fechaDiaria", fechaDiaria)
        console.log("fecha", fecha)
        await getDataByDay(fechaDiaria);
    }

    const setDia = () => {
        let month, day = 0
        if ((fecha.getMonth() + 1) < 10) {
            month = sumarCeros((fecha.getMonth() + 1))
        } else {
            month = fecha.getMonth() + 1; //months from 1-12
        }
        if (fecha.getDate() < 10) {
            day = sumarCeros(fecha.getDate())
        } else {
            day = fecha.getDate();
        }
        let year = fecha.getFullYear();
        let fechaInicialQuery = year + "-" + month + "-" + day;
        console.log("Fecha ::::::", fechaInicialQuery)
        return fechaInicialQuery
    }

    const sumarCeros = (entrada) => {
        const salida = "0" + entrada
        return salida
    }
    useEffect(() => {
    }, [])

    const handleOnExportDiario = () => {
        console.log("handleOnExportDiario", recaudacionDiaria)
        const ws = XLSX.utils.json_to_sheet(recaudacionDiaria);
        const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
        XLSX.writeFile(wb, 'recaudaciones.xlsx')
    }

    const DisplayRecaudacionDiaria = recaudacionDiaria.map(
        (info) => {
            return (
                <tr key={info.fecha}>
                    <td data-label="recaudaciones"><b>$</b> {info.recaudaciones}</td>
                    <td data-label="fechas">{info.fecha}</td>
                </tr>
            )
        }
    )

    // ////////// ////////// ------ -- -- -- -- -- -- -- -- -- \\\\\\\\\\\\\\\\

    const getDataByTwoDates = async (desde, hasta) => {
        if (desde !== null && hasta !== null) {
            //const url = `http://localhost:8080/recaudaciones-periodo-tiempo?desde=${desde}&hasta=${hasta}`
            const url = `https://el-buen-sabor.herokuapp.com/recaudaciones-periodo-tiempo?desde=${desde}&hasta=${hasta}`
            console.log("URL:", url)
            const resp = await axios.get(url)
            console.log("resp:", resp)

            const data = await resp.data;
            console.log("data:", data)
            setRecaudacionPeriodica(data)
            let totalAux = 0
            data.forEach(recaudacion => {
                console.log("DDDDDD:", recaudacion)
                totalAux += recaudacion.recaudaciones
            })
            setTotal(totalAux)
            return data
        }
    }

    // Recaudacion por periodo de tiempo
    const buscarRecuadacionPorPeriodoDeTiempo = async () => {
        const desde = setRecaudacionDesde()
        const hasta = setRecaudacionHasta()
        console.log("fechaInicial", desde)
        console.log("fechaFinal", hasta)
        await getDataByTwoDates(desde, hasta);
    }
    const handleOnExportPeriodoDeTiempo = () => {
        console.log("handleOnExportDiario", recaudacionPeriodica)
        const ws = XLSX.utils.json_to_sheet(recaudacionPeriodica);
        const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
        XLSX.writeFile(wb, 'recaudaciones.xlsx')
    }

    const setRecaudacionDesde = () => {
        const month = fechaInicial.getMonth() + 1; //months from 1-12
        const day = fechaInicial.getDate();
        const year = fechaInicial.getFullYear();
        const desde = year + "-" + month + "-" + day;
        return desde
    }
    const setRecaudacionHasta = () => {
        const month = fechaFinal.getMonth() + 1; //months from 1-12
        const day = fechaFinal.getDate();
        const year = fechaFinal.getFullYear();
        const hasta = year + "-" + month + "-" + day;
        return hasta
    }

    // Mapeo de las recaudaciones diarias
    const DisplayRecaudacionPorPeriodoDeTiempo = recaudacionPeriodica.map(
        (info) => {
            return (
                <tr key={info.id_pedido}>
                    <td data-label="recaudaciones"><b>$</b> {info.recaudaciones}</td>
                    <td data-label="fecha"> {info.fecha}</td>
                    <td data-label="forma pago">{info.forma_pago}</td>
                    <td data-label="numero factura">{info.numero_factura}</td>
                    <td data-label="id pedido">{info.id_pedido}</td>
                </tr>
            )
        }
    )

    return (
        <>
            <NavbarAdministrador />
            <br />
            <h1><b>Recaudacion diaria:</b> </h1>

            <h4><b>fecha</b></h4>

            <DatePicker
                placeholderText='ingrese fecha'
                selected={fecha}
                onChange={date => setFecha(date)}
                dateFormat='yyyy/MM/dd'
            />
            <br /><br />
            <div className="mb-3">
                <button onClick={buscarRecuadacionDiaria} className="btn btn-primary"><b>Buscar</b></button>

                <button onClick={handleOnExportDiario} className="btn btn-success"><b>Exportar en Excel</b></button>
            </div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th><b>RECAUDACION TOTAL</b></th>
                        <th><b>Fecha</b></th>
                    </tr>
                </thead>
                <tbody>
                    {DisplayRecaudacionDiaria}
                </tbody>
            </table>

            <br /> <br />
            <h1> <b>Recaudaciones por períodos determinados de tiempo</b></h1>
            <h3>Desde:</h3>
            <DatePicker
                placeholderText='ingrese fecha'
                selected={fechaInicial}
                onChange={date => setFechaInicial(date)}
                dateFormat='yyyy/MM/dd'
            />
            <br />
            <h3>Hasta:</h3>
            <DatePicker
                placeholderText='ingrese fecha'
                selected={fechaFinal}
                onChange={date => setFechaFinal(date)}
                dateFormat='yyyy/MM/dd'
            />
            <br />
            {/* <div className='container'> */}
            <div className="mb-3">
                <button onClick={buscarRecuadacionPorPeriodoDeTiempo} className="btn btn-primary"><b>Buscar</b></button>
                <button onClick={handleOnExportPeriodoDeTiempo} className="btn btn-success"><b>Exportar en Excel</b></button>
            </div>
            {/* </div> */}
            {
                recaudacionPeriodica.length !== 0 ?
                    <div>
                        <h3><b>Total: ${total} </b></h3>
                        <table className="table table-striped">

                            <thead>
                                <tr>
                                    <th><b>RECAUDACION POR ID PEDIDO</b></th>
                                    <th><b>FECHA</b></th>
                                    <th><b>FORMA DE PAGO</b></th>
                                    <th><b>NUMERO DE FACTURA</b></th>
                                    <th><b>ID DEL PEDIDO</b></th>
                                </tr>
                            </thead>
                            <tbody>
                                {DisplayRecaudacionPorPeriodoDeTiempo}
                            </tbody>
                        </table>
                    </div>
                    :
                    <h3>null</h3>
            }
            <br />

        </>
    )
}
