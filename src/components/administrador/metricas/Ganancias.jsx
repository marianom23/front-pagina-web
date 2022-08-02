import React, { useEffect, useState } from 'react'
import axios from 'axios'
import * as XLSX from 'xlsx'

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { NavbarAdministrador } from '../NavbarAdministrador'
import { useNavigate } from 'react-router-dom'
import useUser from '../../hooks/useUser'

export const Ganancias = () => {

    const [gananciaPeriodica, setGananciaPeriodica] = useState([])
    const [fechaInicial, setFechaInicial] = useState()
    const [fechaFinal, setFechaFinal] = useState()

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

    const getData = async (desde, hasta) => {
        if (desde !== null && hasta !== null) {
            const resp = await axios.get(`https://el-buen-sabor.herokuapp.com/ganancias?desde=${desde}&hasta=${hasta}`)
            const data = resp.data;
            setGananciaPeriodica(data)
        }
    }

    // Recaudacion por periodo de tiempo
    const buscarRecuadacionPorPeriodoDeTiempo = () => {
        const desde = setGananciaDesde()
        const hasta = setGananciaHasta()
        getData(desde, hasta);
    }
    const handleOnExportGanancias = () => {
        // console.log("handleOnExportDiario", gananciaPeriodica)
        const ws = XLSX.utils.json_to_sheet(gananciaPeriodica);
        const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
        XLSX.writeFile(wb, 'recaudaciones.xlsx')
    }

    const setGananciaDesde = () => {
        const month = fechaInicial.getMonth() + 1; //months from 1-12
        const day = fechaInicial.getDate();
        const year = fechaInicial.getFullYear();
        const desde = year + "-" + month + "-" + day;
        return desde
    }

    const setGananciaHasta = () => {
        const month = fechaFinal.getMonth() + 1; //months from 1-12
        const day = fechaFinal.getDate();
        const year = fechaFinal.getFullYear();
        const hasta = year + "-" + month + "-" + day;
        return hasta
    }

    const DisplayGananciaPorPeriodoDeTiempo = gananciaPeriodica.map(
        (info) => {
            return (
                <tr>
                    <td><b>$</b> {info.ganancias}</td>
                    <td> {info.desde}</td>
                    <td>{info.hasta}</td>
                </tr>
            )
        }
    )

    return (
        <>
            <NavbarAdministrador />
            <br /> <br />
            <h1> <b>Ganancias por períodos determinados de tiempo</b></h1>
            <h3>Desde:</h3>
            <DatePicker
                required
                placeholderText='ingrese fecha'
                selected={fechaInicial}
                onChange={date => setFechaInicial(date)}
                dateFormat='yyyy/MM/dd'
            />
            <br />
            <h3>Hasta:</h3>
            <DatePicker
                required
                placeholderText='ingrese fecha'
                selected={fechaFinal}
                onChange={date => setFechaFinal(date)}
                dateFormat='yyyy/MM/dd'
            />
            <br />
            {/* <div className='container'> */}
            <div className="mb-3">
                <button onClick={buscarRecuadacionPorPeriodoDeTiempo} className="btn btn-primary"><b>Buscar</b></button>
                <button onClick={handleOnExportGanancias} className="btn btn-success"><b>Exportar en Excel</b></button>
            </div>
            {/* </div> */}
            {
                gananciaPeriodica !== null ?
                    <div>
                        <table className="table table-striped">

                            <thead>
                                <tr>
                                    <th><b>GANANCIAS</b></th>
                                    <th><b>DESDE</b></th>
                                    <th><b>HASTA</b></th>
                                </tr>
                            </thead>
                            <tbody>
                                {DisplayGananciaPorPeriodoDeTiempo}
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

