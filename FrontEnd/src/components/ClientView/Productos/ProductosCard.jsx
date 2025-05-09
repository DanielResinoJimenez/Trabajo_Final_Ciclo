import React, { useContext, useEffect, useRef, useState } from 'react'
import useProductos from '../../../services/hooks/useProductos'
import { useGlobalContext } from '../../../services/hooks/globalContext';

const ProductosCard = ({ producto }) => {

  const { handleSubmit, handleFileChange, cargarImagen, imagen } = useProductos();

  const { cartRef, handleAddToCart, isLoggedIn } = useGlobalContext();

  const imgRef = useRef(null);


  // UseEffect para convertir las imagenes y hacerlas visibles

  useEffect(() => {
    cargarImagen(producto);
  }, [])

  return (
    <article className='flex flex-col w-[300px] h-[500px] p-4 border border-yellow-800 rounded-sm shadow-md shadow-yellow-800 m-auto card'>
      {
        imagen ? <img ref={imgRef} src={imagen} alt={producto.nombre} className='p-4 border border-yellow-800 h-[60%] mix-blend-multiply' />
          :
          <p className='p-4 border border-yellow-800 h-[60%] mix-blend-multiply'>No hay imagen disponible</p>
      }
      <div className='flex flex-col justify-between h-[30%]'>
        <h2 className='text-2xl text-center'>{producto.nombre}</h2>
        <span className='text-right text-xl'>{producto.precio} €</span>
        <span className='text-lg text-right hover:text-yellow-600 font-normal hover:font-bold transition duration-300 ease-in-out cursor-pointer'>Mostrar más</span>
      </div>
      {

        <button
          className="h-[10%] border border-yellow-800 bg-yellow-800 button__productos"
          onClick={() => {
            if (!isLoggedIn()) {
              alert('Debes iniciar sesión para añadir un producto al carrito');
            } else {
              handleAddToCart({ cartRef, imgElement: imgRef.current, producto: producto });
            }
          }}
        >
          <span>Añadir al carrito</span>
        </button>

      }
    </article>
  )



}

export default ProductosCard