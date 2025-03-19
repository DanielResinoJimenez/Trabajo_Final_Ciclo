import { useState } from 'react'
import { Login, Logout } from './services/Login'
import { useAuth0 } from '@auth0/auth0-react'
import Perfil from './components/Perfil'

function App() {
  const {user, isAuthenticated} = useAuth0()

  if(!isAuthenticated){
    return <Login />
  }else{
    return (
      <div>
        <Perfil />
        <Logout />
      </div>
    )
  }
    
  
}

export default App
