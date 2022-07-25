import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useUser from '../hooks/useUser'


export const  Redireccion = () => {

  const navigate = useNavigate()
  const {usuario} = useUser()


  useEffect(() => {
    switch (usuario.rol) {
      case 100:
        navigate("/inicio", { replace: true })
        break;
      case 200:
        navigate("/pedidos-pendientes", { replace: true })
        break;
      case 300:
        navigate("/pedidos-cocina", { replace: true })
        break;
      case 400:
        navigate("/pedidos-delivery", { replace: true })
        break;
      case 500:
        navigate("/admin-inicio", { replace: true })
        break;

      default:
        break;
    }
  }, [])
  

  return (
    <div></div>
  )
}
