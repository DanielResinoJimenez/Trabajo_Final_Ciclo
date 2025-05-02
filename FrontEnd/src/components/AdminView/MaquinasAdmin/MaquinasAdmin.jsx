import React from 'react'
import MaquinasTabs from './MaquinasTabs'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MaquinasAdmin = () => {
  return (
    <div className='w-[90%] m-auto'>
      <MaquinasTabs />
      
    </div>
  )
}

export default MaquinasAdmin