import React, { useEffect } from 'react'
import useProductos from '../../../services/hooks/useProductos'

const MaquinasCard = ({maquina}) => {

  const {cargarImagen, imagen} = useProductos();

  // Si la máquina no tiene imagen se muestra un mensaje de que está máquina no tiene imagen.
  if(!maquina.imagen){
    return (
      <article className='flex xl:w-[800px] justify-between p-10 border-y border-r border-gray-400 items-center'>
          <p>No hay imagen de la máquina</p>
          <div className='flex flex-col'>
              <h2 className='text-4xl'>{maquina.nombre}</h2>
              <p className='text-lg'>{maquina.descripcion}</p>
              <span className='text-xl'>{maquina.precio} €</span>
              <div className='flex gap-4'>
                  <button className='button__productos w-[50%]'>Solicitar</button>
                  <button className='button__productos w-[50%]'>Añadir al carrito</button>
              </div>
          </div>
      </article>
    )
  }else{

    useEffect(() => {
      cargarImagen(maquina);
    }, []);

    return (
      <article className='flex xl:w-[800px] justify-between p-10 border-y border-r border-gray-400 items-center'>
          <img src={imagen} alt="" className='h-[300px] relative left-[-70px]'/>
          <div className='flex flex-col'>
              <h2 className='text-4xl'>{maquina.nombre}</h2>
              <p className='text-lg'>{maquina.descripcion}</p>
              <span className='text-xl'>{maquina.precio} €</span>
              <div className='flex gap-4'>
                  <button className='button__productos w-[50%]'>Solicitar</button>
                  <button className='button__productos w-[50%]'>Añadir al carrito</button>
              </div>
          </div>
      </article>
    )
  }
}

export default MaquinasCard