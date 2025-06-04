import React, { useEffect } from 'react'
import MaquinasCard from './MaquinasCard';
import { useMaquinasContext } from '../../../services/hooks/maquinasContext';
import useMaquinas from '../../../services/hooks/useMaquinas';
import Swal from "sweetalert2";

const MaquinasBody = () => {
  const { maquinas, loading, error, getMaquinasStock } = useMaquinasContext();
  const { openModalSolicitud, cerrarModal } = useMaquinas();

  useEffect(() => {
    Swal.fire({
      title: "Cargando máquinas...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
      background: '#fff8e1',
      color: '#4a2d1f'
    });
    getMaquinasStock();
  }, []);

  if (error) {
    return <p className='text-red-600 m-4'>Ha ocurrido un error al cargar: {error}</p>;
  }

  if (loading) {
    return null;
  }

  if (maquinas.length === 0) {
    return <p className='m-10 text-xl'>No hay máquinas operativas en este momento</p>;
  }

  return (
    <div className='w-full px-4 md:px-10 pt-28'>
      <h1 className='text-3xl md:text-5xl text-center mb-10'>Catálogo de máquinas disponibles</h1>
      <div className='grid grid-cols-1 xl:grid-cols-2 gap-10 place-items-center'>
        {maquinas.map((maquina) => (
          <MaquinasCard maquina={maquina} key={maquina.id_maquina} />
        ))}
      </div>

      {/* Modal de solicitud */}
      <div className="hidden fixed inset-0 bg-black/50 flex items-center justify-center z-50" id='modalSolicitud'>
        <div className="bg-white max-h-[90vh] overflow-y-auto transition-all rounded-2xl shadow-2xl w-11/12 max-w-lg p-6 relative">
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            onClick={() => cerrarModal("modalSolicitud")}
          >
            ✕
          </button>
          <div className="mt-4" id='modalSolicitudContent'></div>
        </div>
      </div>
    </div>
  );
};

export default MaquinasBody;
