import React, { useEffect } from 'react'
import MaquinasCard from './MaquinasCard';
import { useMaquinasContext } from '../../../services/hooks/maquinasContext';
import useMaquinas from '../../../services/hooks/useMaquinas';

const MaquinasBody = () => {
  const { maquinas, loading, error, getMaquinasStock } = useMaquinasContext();

  const {openModalSolicitud, cerrarModal} = useMaquinas();

  useEffect(() => {
    getMaquinasStock();
  }, [])

  if (error) {
    return <p>Ha ocurrido un error al cargar: {error}</p>
  }

  if (loading) {
    return <p>Cargando...</p>
  }

  if (maquinas.length === 0) {
    return <p className='m-10 text-xl'>No hay máquinas operativas en este momento</p>
  }

  if (maquinas.length > 0) {
    return (
      <div className='m-10 pt-20 pl-30 border-l border-gray-400 flex flex-col gap-10 w-[100%]'>
        <h1 className='text-6xl text-justify'>Catálogo de máquinas disponibles</h1>
        {
          maquinas.map((maquina) => (

            <MaquinasCard maquina={maquina} key={maquina.id_maquina} />

          ))
        }

        {/* Modal para mostrar una vista detallada del producto requerido */}
        <div className="hidden fixed inset-0 bg-black/50 flex items-center justify-center z-50" id='modalSolicitud'>
          <div className="bg-white max-h-[60%] overflow-y-auto transition-all rounded-2xl shadow-2xl w-11/12 max-w-lg p-6 relative">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={() => cerrarModal()}
            >
              ✕
            </button>
            <div className="mt-4" id='modalSolicitudContent'>

            </div>
          </div>
        </div>
      </div>
    )
  }


}

export default MaquinasBody