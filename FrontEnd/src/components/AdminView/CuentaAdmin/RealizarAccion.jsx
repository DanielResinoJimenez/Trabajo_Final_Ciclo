import React from 'react'
import RealizarAccionShow from './RealizarAccionShow'
import { useCuentaContext } from '../../../services/hooks/cuentaContext'
import useCuenta from '../../../services/hooks/useCuenta';
import HeaderTable from './HeaderTable';
import BodyTable from './BodyTable';
import FooterTable from './FooterTable';

const RealizarAccion = ({activeTab}) => {

  const {acciones, loading, saldo} = useCuentaContext();

  

  // Comprobar si aún se están cargando los datos
  if (loading) {
    return <div>Loading...</div>;  // Mostrar un mensaje de carga mientras los datos se obtienen
  }

  return (
    <div className='w-[90%] m-auto mt-10 mb-20 border-[1px] border-yellow-950 border-separate border-spacing-0 text-left'>

    {/* Header de la tabla */}
      <HeaderTable columnas={["Tipo de Acción", "Fecha", "Motivo", "Monto", "Acciones"]}/>

    {/* Body de la tabla */}
      <BodyTable acciones={acciones} activeTab={activeTab}/>

    {/* Footer de la tabla */}
      <FooterTable tipo={"Realizar"} saldo={saldo}/>
     
    </div>
  )
}

export default RealizarAccion