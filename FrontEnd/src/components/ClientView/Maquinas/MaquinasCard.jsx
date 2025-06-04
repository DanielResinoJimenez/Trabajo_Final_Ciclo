import React, { useRef } from 'react'
import useProductos from '../../../services/hooks/useProductos'
import { useGlobalContext } from '../../../services/hooks/globalContext';
import { useMaquinasContext } from '../../../services/hooks/maquinasContext';
import useMaquinas from '../../../services/hooks/useMaquinas';
import Swal from 'sweetalert2';
import noImage from "../../../assets/images/noimage.png";

const MaquinasCard = ({ maquina }) => {
  const { cargarImagen } = useProductos();
  const { gestionarSolicitud } = useMaquinasContext();
  const { openModalSolicitud } = useMaquinas();
  const { cartRef, handleAddToCart, isLoggedIn } = useGlobalContext();
  const imgRef = useRef(null);

  const handleSolicitud = () => {
    if (!isLoggedIn()) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debes iniciar sesión para solicitar una máquina.',
        confirmButtonColor: '#4a2d1f'
      });
    } else {
      openModalSolicitud(maquina.id_maquina);
    }
  };

  const handleCarrito = () => {
    if (!isLoggedIn()) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debes iniciar sesión para añadir máquinas al carrito.',
        confirmButtonColor: '#4a2d1f'
      });
    } else {
      handleAddToCart({ cartRef, imgElement: imgRef.current, maquina });
    }
  };

  return (
    <article className='flex flex-col md:flex-row items-center justify-between gap-6 w-full border-y border-r border-gray-400 p-6 min-h-[380px]'>
      <img
        src={maquina.imagen ? cargarImagen(maquina) : noImage}
        ref={imgRef}
        alt={maquina.nombre}
        className='w-full md:w-[40%] h-[200px] object-contain'
      />

      <div className='flex flex-col justify-between w-full md:w-[60%] h-full'>
        <div className='flex flex-col gap-2'>
          <h2 className='text-2xl md:text-3xl font-semibold'>{maquina.nombre}</h2>

          <div className="text-base md:text-lg overflow-y-auto max-h-[100px] pr-1 custom-scroll">
            {maquina.descripcion}
          </div>

          <span className='text-lg md:text-xl font-semibold mt-2'>{maquina.precio} €</span>
        </div>

        <div className='flex flex-col sm:flex-row gap-3 mt-4'>
          <button className="button__productos w-full sm:w-1/2" onClick={handleSolicitud}>
            <span>Solicitar</span>
          </button>
          <button className="button__productos w-full sm:w-1/2" onClick={handleCarrito}>
            <span>Añadir al carrito</span>
          </button>
        </div>
      </div>
    </article>


  );
};

export default MaquinasCard;
