import React from 'react'
import SolicitudesTabs from './SolicitudesAdmin/SolicitudesTabs'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SolicitudesAdmin = () => {
  return (
    <div className='w-[90%] m-auto'>
      <SolicitudesTabs/>
    </div>
  )
}

export default SolicitudesAdmin