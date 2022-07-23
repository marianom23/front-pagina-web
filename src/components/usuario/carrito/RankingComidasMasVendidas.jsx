import React, { useEffect, useState } from 'react'
import { Footer } from '../../generales/nav-foot/Footer'
import { NavbarUsuario } from '../nav/NavbarUsuario'

import axios from 'axios'
import * as XLSX from 'xlsx'
// import { utils, writeFile } from 'xlsx';

export const RankingComidasMasVendidas = () => {

  const [rankingComidasMasVendidas, setRankingComidasMasVendidas] = useState([])


  const getData = async () => {
    const resp = await axios.get('https://el-buen-sabor.herokuapp.com/ranking-comidas')
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
      <NavbarUsuario />
      <br />
      <h1>Ranking 5 de comidas mas vendidas</h1>

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
      <Footer />
    </>
  )
}

