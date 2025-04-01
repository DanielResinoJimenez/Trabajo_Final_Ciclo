import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

const Layout = () => {
  return (
    <div className='flex flex-col min-h-screen'>
        <Header />
        <div className='z-0 flex-1'>
            <Outlet />
        </div>
        <Footer />
    </div>
  )
}

export default Layout