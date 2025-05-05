import React from 'react'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GraficoIngresosGastos from './InfoGeneralAdmin/GraficoIngresosGastos';
import GraficoIngresosMaquinas from './InfoGeneralAdmin/GraficoIngresosMaquinas';
import InfoTabs from './InfoGeneralAdmin/InfoTabs';

const InfoGeneralAdmin = () => {
  return (
    <div className='w-[90%] m-auto'>
      <InfoTabs />
    </div>
  )
}

export default InfoGeneralAdmin