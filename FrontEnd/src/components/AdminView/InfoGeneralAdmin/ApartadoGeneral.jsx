import React from 'react'
import GraficoIngresosGastos from './GraficoIngresosGastos'
import FiltrosInformacion from './FiltrosInformacion'

const ApartadoGeneral = ({activeTab}) => {
  return (
    <div>
        <header>
            <FiltrosInformacion activeTab={activeTab}/>
        </header>
        <div>
            <GraficoIngresosGastos />
        </div>
    </div>
  )
}

export default ApartadoGeneral