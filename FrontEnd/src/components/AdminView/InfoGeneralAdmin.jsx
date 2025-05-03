import React from 'react'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InfoHeader from './InfoGeneralAdmin/InfoHeader';
import GraficoIngresosGastos from './InfoGeneralAdmin/GraficoIngresosGastos';
import GraficoIngresosMaquinas from './InfoGeneralAdmin/GraficoIngresosMaquinas';

const InfoGeneralAdmin = () => {
  return (
    <div>
      <InfoHeader />
      <GraficoIngresosGastos />
      <GraficoIngresosMaquinas />
    </div>
  )
}

export default InfoGeneralAdmin