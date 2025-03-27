import React, { useEffect } from 'react'
import useProductos from '../../../services/hooks/useProductos'

const ProductosCard = ({ producto }) => {

  const { handleSubmit, handleFileChange, cargarImagen, imagen } = useProductos();

  if (producto.imagen == null) {
    return (
      <article className='flex flex-col w-[300px] h-[500px] p-4 border border-yellow-800 rounded-sm shadow-md shadow-yellow-800 m-auto card overflow-hidden'>
        <span className='hidden'>{producto.id_producto}</span>
        <form
          onSubmit={handleSubmit}
          className='flex flex-col p-4 border border-yellow-800 h-[60%] justify-center'
        >
          <input
            type="file"
            className='flex h-full cursor-pointer'
            onChange={handleFileChange}
          />
          <button
            type="submit"
            className='mt-4 p-2 bg-yellow-800 text-white'
          >
            Subir Imagen
          </button>
        </form>
        <div className='flex flex-col justify-between h-[30%]'>
          <h2 className='text-2xl text-center'>{producto.nombre}</h2>
          <span className='text-right text-xl'>{producto.precio} €</span>
          <span className='text-lg text-right hover:text-yellow-600 font-normal hover:font-bold transition duration-300 ease-in-out cursor-pointer'>Mostrar más</span>
        </div>
        <button className='h-[10%] border border-yellow-800 bg-yellow-800 button__productos'><span>Añadir al carrito</span></button>
      </article>
    )
  } else {

    // UseEffect para convertir las imagenes y hacerlas visibles

    useEffect(() => {
      cargarImagen(producto);
    }, [])

    return (
      <article className='flex flex-col w-[300px] h-[500px] p-4 border border-yellow-800 rounded-sm shadow-md shadow-yellow-800 m-auto card'>
        <img src={imagen} alt={producto.nombre} className='p-4 border border-yellow-800 h-[60%]' />
        <div className='flex flex-col justify-between h-[30%]'>
          <h2 className='text-2xl text-center'>{producto.nombre}</h2>
          <span className='text-right text-xl'>{producto.precio} €</span>
          <span className='text-lg text-right hover:text-yellow-600 font-normal hover:font-bold transition duration-300 ease-in-out cursor-pointer'>Mostrar más</span>
        </div>
        <button className='h-[10%] border border-yellow-800 bg-yellow-800 button__productos'><span>Añadir al carrito</span></button>
      </article>
    )
  }


}

export default ProductosCard