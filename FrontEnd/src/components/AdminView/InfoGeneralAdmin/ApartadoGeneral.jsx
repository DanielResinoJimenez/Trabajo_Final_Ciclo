import React from 'react'
import GraficoIngresosGastos from './GraficoIngresosGastos'
import FiltrosInformacion from './FiltrosInformacion'

const ApartadoGeneral = () => {
  return (
    <div>
        <header>
            <FiltrosInformacion />
        </header>
        <div>
            <GraficoIngresosGastos />
        </div>
    </div>
  )
}

export default ApartadoGeneral