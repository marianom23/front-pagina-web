import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { InicioAdministrador } from '../components/administrador/InicioAdministrador'
import { AgregarInsumo } from '../components/administrador/insumos/AgregarInsumo'
import { Contactenos } from '../components/generales/inicio/Contactenos'
import { Inicio } from '../components/generales/inicio/Inicio'
import { InicioUsuario } from '../components/usuario/inicio/InicioUsuario'
import { Login } from '../components/generales/Login/Login'
import { Register } from '../components/generales/Login/Register'
import { AgregarArticulo } from '../components/administrador/articulos/AgregarArticulo'
import { AgregarDetalles } from '../components/administrador/detalles_articulos/AgregarDetalles'
import { GrillaArticulos } from '../components/administrador/articulos/GrillaArticulos'
import { Conjunto } from '../components/usuario/inicio/Conjunto'
import { GrillaInsumo } from '../components/administrador/insumos/GrillaInsumo'
import { PedidosPendientes } from '../components/cajero/PedidosPendientes'
import { PedidosCocina } from '../components/cocinero/PedidosCocina'
import { PedidosDelivery } from '../components/delivery/PedidosDelivery'
import { DetallePedido } from '../components/detalle-pedido/DetallePedido'
import { Domicilio } from '../components/usuario/domicilio/Domicilio'
import { CarritoContainer } from '../components/usuario/inicio/CarritoContainer'
import { PedidosCliente } from '../components/usuario/pedidos-cliente/PedidosCliente'
import { Redireccion } from '../components/user-redirect/Redireccion'
import { Productos3 } from '../components/usuario/carrito/productos/Productos3'
import { DetallePedidoCliente } from '../components/usuario/detalle-pedido-cliente/DetallePedidoCliente'
import { GrillaUsuarios } from '../components/administrador/empleados/GrillaUsuarios'
import { DetallePedidoClientePago } from '../components/usuario/detalle-pedido-cliente/DetallePedidoClientePago'
import { Categorias } from '../components/administrador/categorias/Categorias'
import { Ganancias } from '../components/administrador/metricas/Ganancias'
import { Recaudaciones } from '../components/administrador/metricas/Recaudaciones'
import { RankingComidasMasVendidas } from '../components/administrador/metricas/RankingComidasMasVendidas'
import { PedidosPorCliente } from '../components/administrador/metricas/PedidosPorCliente'
import { Factura } from '../components/usuario/factura/Factura'
import { FacturaCajero } from '../components/cajero/FacturaCajero'
import { DetalleArticuloCodinero } from '../components/cocinero/DetalleArticuloCodinero'



export const AppRouter = ({user}) => {

  
  return (  
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Inicio/>}/>
          <Route path="/inicio" element={<InicioUsuario/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/contacto" element={<Contactenos/>}/>
          <Route path="/admin-inicio" element={<InicioAdministrador/>}/>
          <Route path="/agregar-insumo" element={<AgregarInsumo/>}/>
          <Route path="/agregar-articulo-manufacturado" element={<AgregarArticulo/>}/>
          <Route path="/agregar-detalle-articulo" element={<AgregarDetalles/>}/>
          <Route path="/grilla-articulo" element={<GrillaArticulos/>}/>
          <Route path="/grilla-insumo" element={<GrillaInsumo/>}/>    
          <Route path="/grilla-usuario" element={<GrillaUsuarios/>}/>                 
          <Route path="/pedir" element={<Conjunto/>}/>
          <Route path="/pedir3" element={<Productos3/>}/>
          <Route path="/pedidos-pendientes" element={<PedidosPendientes/>}/>
          <Route path="/pedidos-cocina" element={<PedidosCocina/>}/>
          <Route path="/pedidos-delivery" element={<PedidosDelivery/>}/>
          <Route path="/detalle-pedido/:pedidoID" element={<DetallePedido/>}/>
          <Route path="/detalle-pedido-cliente/:pedidoID" element={<DetallePedidoCliente/>}/>
          <Route path="/detalle-pedido-cliente-pago/:pedidoID" element={<DetallePedidoClientePago/>}/>
          <Route path="/domicilio" element={<Domicilio/>}/>
          <Route path="/carritos" element={<CarritoContainer/>}/>
          <Route path="/mis-pedidos/:idCliente" element={<PedidosCliente/>}/>
          <Route path="/redirect" element={<Redireccion/>}/>
          <Route path="/agregar-categoria" element={<Categorias/>}/>
          <Route path="/metricas-ganancias" element={<Ganancias/>}/>
          <Route path="/metricas-pedidos" element={<PedidosPorCliente/>}/>
          <Route path="/metricas-ranking" element={<RankingComidasMasVendidas/>}/>
          <Route path="/metricas-recaudaciones" element={<Recaudaciones/>}/>
          <Route path="/factura/:idPedido" element={<Factura/>}/>
          <Route path="/factura-cajero/:idPedido" element={<FacturaCajero/>}/>
          <Route path="/detalle-articulo-cocinero" element={<DetalleArticuloCodinero/>}/>
      </Routes>  
    </BrowserRouter>
  )
}
