import React, { useEffect, useRef } from 'react'
import useProductos from '../../../services/hooks/useProductos'
import { useGlobalContext } from '../../../services/hooks/globalContext';
import { useMaquinasContext } from '../../../services/hooks/maquinasContext';
import useMaquinas from '../../../services/hooks/useMaquinas';
import Swal from 'sweetalert2';
import noImage from "../../../assets/images/noimage.png";


const MaquinasCard = ({ maquina }) => {

  const { cargarImagen, imagen } = useProductos();

  const { gestionarSolicitud } = useMaquinasContext();

  const { openModalSolicitud, cerrarModal } = useMaquinas();

  const { cartRef, handleAddToCart, isLoggedIn } = useGlobalContext();

  const imgRef = useRef(null);

  // Si la máquina no tiene imagen se muestra un mensaje de que está máquina no tiene imagen.
  if (!maquina.imagen) {
    return (
      <article className='flex xl:w-[800px] h-[400px] justify-between p-10 border-y border-r border-gray-400 items-center' ref={imgRef}>
        <img src={noImage} alt="" className="object-contain max-h-[200px] w-[50%] h-auto mix-blend-multiply" />
        <div className='flex flex-col'>
          <h2 className='text-4xl'>{maquina.nombre}</h2>
          <p className='text-lg'>{maquina.descripcion}</p>
          <span className='text-xl'>{maquina.precio} €</span>
          <div className='flex gap-5'>
            <button
              className="button__productos w-[50%]"
              onClick={() => {
                if (!isLoggedIn()) {
                  Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Debes iniciar sesión para solicitar una máquina.',
                    confirmButtonColor: '#4a2d1f'
                  });
                } else {
                  openModalSolicitud(maquina.id_maquina)
                }
              }}
            >
              <span>Solicitar</span>
            </button>
            <button
              className="button__productos w-[50%]"
              onClick={() => {
                if (!isLoggedIn()) {
                  Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Debes iniciar sesión para añadir máquinas al carrito.',
                    confirmButtonColor: '#4a2d1f'
                  });
                } else {
                  handleAddToCart({ cartRef, imgElement: imgRef.current, maquina: maquina });
                }
              }}
            >
              <span>Añadir al carrito</span>
            </button>
          </div>
        </div>
      </article>
    )
  } else {

    return (
      <article className='flex xl:w-[800px] h-[400px] justify-between p-10 border-y border-r border-gray-400 items-center'>
        <img
          src={cargarImagen(maquina)}
          ref={imgRef}
          alt=""
          className='h-full object-contain relative left-[-70px]'
        />
        <div className='flex flex-col'>
          <h2 className='text-4xl'>{maquina.nombre}</h2>
          <p className='text-lg'>{maquina.descripcion}</p>
          <span className='text-xl'>{maquina.precio} €</span>

          <div className='flex gap-5'>
            <button
              className="button__productos w-[50%]"
              onClick={() => {
                if (!isLoggedIn()) {
                  Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Debes iniciar sesión para solicitar una máquina.',
                    confirmButtonColor: '#4a2d1f'
                  });
                } else {
                  openModalSolicitud(maquina.id_maquina)
                }
              }}
            >
              <span>Solicitar</span>
            </button>
            <button
              className="button__productos w-[50%]"
              onClick={() => {
                if (!isLoggedIn()) {
                  Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Debes iniciar sesión para añadir máquinas al carrito.',
                    confirmButtonColor: '#4a2d1f'
                  });
                } else {
                  handleAddToCart({ cartRef, imgElement: imgRef.current, maquina: maquina });
                }
              }}
            >
              <span>Añadir al carrito</span>
            </button>
          </div>

        </div>
      </article>
    )
  }
}

export default MaquinasCard