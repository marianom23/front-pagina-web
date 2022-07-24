import React, { useEffect, useState } from 'react'
import axios from 'axios'
import * as XLSX from 'xlsx'
import { NavbarUsuario } from './nav/NavbarUsuario'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export const RankingComidasMasVendidas = () => {

  const [rankingComidasMasVendidas, setRankingComidasMasVendidas] = useState([])

  const [fechaInicial, setFechaInicial] = useState(null)
  const [fechaFinal, setFechaFinal] = useState(null)

  console.log("F:", fechaInicial)
  console.log("f final:", fechaFinal)

  const getData = async () => {
    const resp = await axios.get(`https://el-buen-sabor.herokuapp.com/ranking-comidas?desde=2020-01-01&hasta=2023-01-01`)
    const data = await resp.data;
    console.log("data:", data)
    setRankingComidasMasVendidas(data)
    return data
  }

  const getDataWithDate = async (desde, hasta) => {
    if (fechaInicial !== null && fechaFinal !== null) {
      const url = `https://el-buen-sabor.herokuapp.com/ranking-comidas?desde=${desde}&hasta=${hasta}`
      console.log("URL:", url)
      const resp = await axios.get(url)
      const data = await resp.data;
      console.log("data:", data)
      setRankingComidasMasVendidas(data)
      return data
    } else {
      console.log("F:", fechaInicial)
    }
  }

  const buscarRankingEntreDosFechas = async () => {
    const desde = setFechaInicialString()
    const hasta = setFechaFinalString()
    await getDataWithDate(desde, hasta);
  }

  const setFechaFinalString = () => {
    const month = fechaFinal.getUTCMonth() + 1; //months from 1-12
    const day = fechaFinal.getUTCDate();
    const year = fechaFinal.getUTCFullYear();
    const fechaFinalQuery = year + "-" + month + "-" + day;
    return fechaFinalQuery
  }
  const setFechaInicialString = () => {
    const month = fechaInicial.getUTCMonth() + 1; //months from 1-12
    const day = fechaInicial.getUTCDate();
    const year = fechaInicial.getUTCFullYear();
    const fechaInicialQuery = year + "-" + month + "-" + day;
    return fechaInicialQuery
  }

  useEffect(() => {
    getData();
  }, [])

  const handleOnExport = () => {
    console.log("handleOnExport", rankingComidasMasVendidas)
    const ws = XLSX.utils.json_to_sheet(rankingComidasMasVendidas);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    XLSX.writeFile(wb, 'ranking-comidas.xlsx')
  }

  const DisplayData = rankingComidasMasVendidas.map(

    (info) => {
      return (
        <tr key={info.denominacion}>
          <td>{info.veces_pedida}</td>
          <td>{info.denominacion}</td>
          <td>{info.id_articulo_manufacturado}</td>
        </tr>
      )
    }
  )

  return (
    <>
      <NavbarUsuario />
      <br />
      <h1>Ranking 5 de comidas mas vendidas</h1>

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
        <button onClick={buscarRankingEntreDosFechas} className="btn btn-primary"><b>Buscar Ranking</b></button>
        <button onClick={handleOnExport} className="btn btn-success"><b>Exportar en Excel</b></button>
      </div>
      {/* </div> */}
      <table className="table table-striped">
        <thead>
          <tr>
            <th><b>CANTIDAD DE VECES PEDIDA</b></th>
            <th><b>DENOMINACION</b></th>
            <th><b>ID ARTICULO MANUFACTURADO</b></th>
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

