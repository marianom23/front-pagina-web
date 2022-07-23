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

  console.log(fechaInicial)
  console.log(fechaFinal)

  const getData = async () => {
    const resp = await axios.get(`https://el-buen-sabor.herokuapp.com/ranking-comidas?desde=${fechaInicial}&?hasta=${fechaFinal}`)
    const data = await resp.data;
    console.log("data:", data)
    setRankingComidasMasVendidas(data)
    return data
  }

  useEffect(() => {
    getData();
  }, [])

  const handleOnExport = () => {
    console.log("handleOnExport", rankingComidasMasVendidas)
    const ws = XLSX.utils.json_to_sheet(rankingComidasMasVendidas);
    console.log("22222", ws)
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    XLSX.writeFile(wb, 'ranking-comidas.xlsx')
  }

  const DisplayData = rankingComidasMasVendidas.map(

    (info) => {
      return (
        <tr key={info.id_pedido}>
          <td>{info.id_pedido}</td>
          <td>{info.denominacion}</td>
          <td>{info.id_articulo_manufacturado}</td>
          <td>{info.veces_pedida}</td>
        </tr>
      )
    }
  )

  return (
    <>
      <NavbarUsuario/>
      <br />
      <h1>Ranking 5 de comidas mas vendidas</h1>

      <h3>Desde:</h3>

      <DatePicker
       selected={fechaInicial}
       onChange={date => setFechaInicial(date)}
       dateFormat='yyyy/MM/dd'
       />

      {/* <input type="date" onChange={e=setFechaInicial(e.target.value)} /> */}

       <br /> 
       <br />

       <h3>Hasta:</h3>
      <DatePicker
       selected={fechaFinal}
       onChange={date => setFechaFinal(date)}
       dateFormat='yyyy/MM/dd'
       />

      <br /> 
      <br />
      {/* <button onClick={handleOnExport}>Ranking Comidas --- Export Excel</button> */}
      <div className="mb-3">
        <button onClick={handleOnExport} className="btn btn-success"><b>Ranking Comidas - Exportar Excel</b></button>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th><b>ID PEDIDO</b></th>
            <th><b>CANTIDAD DE VECES PEDIDA</b></th>
            <th><b>ID ARTICULO MANUFACTURADO</b></th>
            <th><b>DENOMINACION</b></th>
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

