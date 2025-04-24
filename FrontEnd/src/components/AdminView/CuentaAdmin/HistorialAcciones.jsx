import React from 'react'

const HistorialAcciones = () => {
  return (
    <div>
      <table className='w-[90%] m-auto mt-10 mb-20 border-[1px] border-yellow-950 border-separate border-spacing-0 text-left' id='productosTable'>
        <thead className=''>
          <tr className="bg-yellow-950 text-white rounded-xl">
            <th className="px-4 py-3 border-b border-gray-300">Tipo de acción</th>
            <th className="px-4 py-3 border-b border-gray-300">Fecha</th>
            <th className="px-4 py-3 border-b border-gray-300">Motivo</th>
            <th className="px-4 py-3 border-b border-gray-300">Monto</th>
          </tr>
        </thead>
        <tbody id='productosTBody'>
         
        </tbody>
      </table>
    </div>
  )
}

export default HistorialAcciones