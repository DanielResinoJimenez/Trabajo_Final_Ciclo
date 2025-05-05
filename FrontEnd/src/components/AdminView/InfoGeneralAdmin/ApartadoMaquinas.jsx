import React from 'react'
import GraficoIngresosMaquinas from './GraficoIngresosMaquinas'
import FiltrosInformacion from './FiltrosInformacion'

const ApartadoMaquinas = () => {
  return (
    <div>
        <header>
            <FiltrosInformacion />
        </header>
        <div>
            <GraficoIngresosMaquinas />
        </div>
    </div>
  )
}

export default ApartadoMaquinas