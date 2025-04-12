import React, { useEffect, useRef } from 'react'
import useProductos from '../../../services/hooks/useProductos'
import { useGlobalContext } from '../../../services/hooks/globalContext';
import { useMaquinasContext } from '../../../services/hooks/maquinasContext';

const MaquinasCard = ({ maquina }) => {

  const { cargarImagen, imagen } = useProductos();

  const { realizarSolicitud } = useMaquinasContext();

  const { cartRef, handleAddToCart, isLoggedIn } = useGlobalContext();

  const imgRef = useRef(null);

  // Si la máquina no tiene imagen se muestra un mensaje de que está máquina no tiene imagen.
  if (!maquina.imagen) {
    return (
      <article className='flex xl:w-[800px] justify-between p-10 border-y border-r border-gray-400 items-center' ref={imgRef}>
        <p>No hay imagen de la máquina</p>
        <div className='flex flex-col'>
          <h2 className='text-4xl'>{maquina.nombre}</h2>
          <p className='text-lg'>{maquina.descripcion}</p>
          <span className='text-xl'>{maquina.precio} €</span>
          {
            isLoggedIn() && (
              <div className='flex gap-4'>
                <button className='button__productos w-[50%]' onClick={realizarSolicitud(maquina.id_maquina, id_usuario)}>Solicitar</button>
                <button className='button__productos w-[50%]' onClick={() => handleAddToCart({ cartRef, imgElement: imgRef.current, maquina: maquina })}>Añadir al carrito</button>
              </div>
            )
          }
        </div>
      </article>
    )
  } else {

    useEffect(() => {
      cargarImagen(maquina);
    }, []);

    return (
      <article className='flex xl:w-[800px] justify-between p-10 border-y border-r border-gray-400 items-center'>
        <img src={imagen} ref={imgRef} alt="" className='h-[300px] relative left-[-70px]' />
        <div className='flex flex-col'>
          <h2 className='text-4xl'>{maquina.nombre}</h2>
          <p className='text-lg'>{maquina.descripcion}</p>
          <span className='text-xl'>{maquina.precio} €</span>
          {
            isLoggedIn() && (
              <div className='flex gap-4'>
                <button className='button__productos w-[50%]' onClick={realizarSolicitud(maquina.id_maquina, id_usuario)}>Solicitar</button>
                <button className='button__productos w-[50%]' onClick={() => handleAddToCart({ cartRef, imgElement: imgRef.current, maquina: maquina })}>Añadir al carrito</button>
              </div>
            )
          }
        </div>
      </article>
    )
  }
}

export default MaquinasCard