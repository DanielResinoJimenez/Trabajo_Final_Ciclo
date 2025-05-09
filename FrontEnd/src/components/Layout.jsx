import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import { GlobalProvider } from '../services/hooks/globalContext'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'

const Layout = () => {
  return (
    <GlobalProvider>
      <div className='flex flex-col min-h-screen'>
        <Header />
        <div className='z-0 flex-1 mt-[80px]'>
          <Outlet />
        </div>
        <ToastContainer />
        <Footer />
      </div>
    </GlobalProvider>
  )
}

export default Layout