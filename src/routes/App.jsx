import React from 'react'
import { UserContextProvider } from '../components/user-redirect/UserContextProvider'
import { AppRouter } from './AppRouter'

export const App = () => {
  return (
    <UserContextProvider>
        <AppRouter/>
    </UserContextProvider>
  )
}
