import React, { useState } from 'react'
import TabsCuenta from './CuentaAdmin/TabsCuenta';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CuentaAdmin = () => {
  

  return (
    <div className="w-[90%] m-auto">
      <TabsCuenta/>
    </div>
  );
}

export default CuentaAdmin