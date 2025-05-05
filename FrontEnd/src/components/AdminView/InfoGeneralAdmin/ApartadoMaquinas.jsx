import React from 'react'
import GraficoIngresosMaquinas from './GraficoIngresosMaquinas'
import FiltrosInformacion from './FiltrosInformacion'

const ApartadoMaquinas = ({activeTab}) => {
  return (
    <div>
        <header>
            <FiltrosInformacion activeTab={activeTab}/>
        </header>
        <div>
            <GraficoIngresosMaquinas />
        </div>
    </div>
  )
}

export default ApartadoMaquinas