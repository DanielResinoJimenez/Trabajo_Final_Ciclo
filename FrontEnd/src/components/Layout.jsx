import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className='bg-gray-950'>
        <Header />
        <div className='bg-brown-900'>
            <Outlet />
        </div>
        
    </div>
  )
}

export default Layout