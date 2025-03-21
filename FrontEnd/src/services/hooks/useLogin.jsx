import { useAuth0 } from '@auth0/auth0-react'
import React from 'react'

const Login = () => {
    const { loginWithRedirect } = useAuth0()
  return (
    <div>
        <button className='p-4 rounded bg-gray-700 text-gray-100' onClick={() => loginWithRedirect()}>Log In</button>
    </div>
  )
}

const Logout = () => {
    const { logout } = useAuth0()
  return (
    <div>
        <button className='p-4 rounded bg-gray-700 text-gray-100' onClick={() => logout({returnTo: window.location.origin})}>Log Out</button>
    </div>
  )
}

export { Login, Logout };