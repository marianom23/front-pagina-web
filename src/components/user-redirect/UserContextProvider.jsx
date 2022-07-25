import React, { createContext, useState } from 'react'

export const userContext = createContext({})

export const UserContextProvider = ({children}) => {

  const [user, setUser] = useState(
    () => window.sessionStorage.getItem('user')
  )
  // const [user, setUser] = useState(
  //   { apellido: null, email: null, id: null, rol: null, usuario:null}
  // )

  console.log(user)


  return(
    <userContext.Provider value={{user, setUser}}>
        {children} 
    </userContext.Provider>
)
}