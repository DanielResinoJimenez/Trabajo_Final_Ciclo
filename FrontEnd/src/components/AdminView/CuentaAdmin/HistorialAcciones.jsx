import React, { useEffect } from 'react';
import { useCuentaContext } from '../../../services/hooks/cuentaContext';
import HistorialAccionesShow from './HistorialAccionesShow';


const HistorialAcciones = () => {
  const { getEmpresa, getCuentas, getDatos, acciones, loading } = useCuentaContext();

  // Comprobar si aún se están cargando los datos
  if (loading) {
    return <div>Loading...</div>;  // Mostrar un mensaje de carga mientras los datos se obtienen
  }

  return (
    <div>
      <table className="w-[90%] m-auto mt-10 mb-20 border-[1px] border-yellow-950 border-separate border-spacing-0 text-left" id="productosTable">
        <thead className="">
          <tr className="bg-yellow-950 text-white rounded-xl">
            <th className="px-4 py-3 border-b border-gray-300">Tipo de acción</th>
            <th className="px-4 py-3 border-b border-gray-300">Fecha</th>
            <th className="px-4 py-3 border-b border-gray-300">Motivo</th>
            <th className="px-4 py-3 border-b border-gray-300">Monto</th>
          </tr>
        </thead>
        <tbody id="productosTBody">
          {acciones.length > 0 ? (
            acciones.map((accion) => (
              <HistorialAccionesShow key={accion.id_ganancia ? accion.id_ganancia + "ganancia" : accion.id_perdida + "perdida"} accion={accion} />
            ))
          ) : (
            <tr>
              <td colSpan="4">No hay acciones disponibles</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default HistorialAcciones;
