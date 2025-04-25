import React from 'react'
import RealizarAccionShow from './RealizarAccionShow'
import { useCuentaContext } from '../../../services/hooks/cuentaContext'
import useCuenta from '../../../services/hooks/useCuenta';

const RealizarAccion = () => {

  const {acciones, loading} = useCuentaContext();
  const { turnToModify, nuevaAccion } = useCuenta();

  // Comprobar si aún se están cargando los datos
  if (loading) {
    return <div>Loading...</div>;  // Mostrar un mensaje de carga mientras los datos se obtienen
  }

  return (
    <div>
      <table className='w-[90%] m-auto mt-10 mb-20 border-[1px] border-yellow-950 border-separate border-spacing-0 text-left' id='productosTable'>
        <thead className=''>
          <tr className="bg-yellow-950 text-white rounded-xl">
            <th className="px-4 py-3 border-b border-gray-300">Tipo de acción</th>
            <th className="px-4 py-3 border-b border-gray-300">Fecha</th>
            <th className="px-4 py-3 border-b border-gray-300">Motivo</th>
            <th className="px-4 py-3 border-b border-gray-300">Monto</th>
            <th className="px-4 py-3 border-b border-gray-300">Acciones</th>
          </tr>
        </thead>
        <tbody id='accionesTBody'>
        {acciones.length > 0 ? (
            acciones.map((accion) => (
              <RealizarAccionShow key={accion.id_ganancia ? accion.id_ganancia + "ganancia" : accion.id_perdida + "perdida"} accion={accion} />
            ))
          ) : (
            <tr>
              <td colSpan="4">No hay acciones disponibles</td>
            </tr>
          )}
          <tr className='' id='fila-boton'>
            <td colSpan={8} className='text-center p-6 text-white text-2xl font-bold border-t border-gray-400'>
              <span onClick={nuevaAccion} className='hover:bg-green-300 transition-colors cursor-pointer bg-green-500 px-20 py-2'>+</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default RealizarAccion