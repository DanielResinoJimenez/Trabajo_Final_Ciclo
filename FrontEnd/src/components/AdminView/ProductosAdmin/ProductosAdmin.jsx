import React, { useEffect } from 'react'
import usePanelControl from '../../../services/hooks/usePanelControl'
import ProductosAdminCard from './ProductosAdminCard'
import { useProductosContext } from '../../../services/hooks/productosContext'

const ProductosAdmin = () => {

  const { productos, loading, error, getProductos } = useProductosContext();

  useEffect(() => {
    getProductos();
  }, [])

  return (
    <div>
      <div className='w-[90%] m-auto mt-10 flex gap-4'>
        <button className="cursor-pointer bg-green-700 p-3 rounded-xl text-white font-bold shadow-none hover:shadow-md hover:shadow-black transition-shadow duration-300">
          Añadir nuevo producto
        </button>
        <button className="cursor-pointer bg-red-700 p-3 rounded-xl text-white font-bold shadow-none hover:shadow-md hover:shadow-black transition-shadow duration-300">
          Borrar productos seleccionados
        </button>
      </div>
      <table className='w-[90%] m-auto mt-10 mb-20 border-[1px] border-yellow-950 border-separate border-spacing-0 text-left'>
        <thead className=''>
          <tr className="bg-yellow-950 text-white rounded-xl">
            <th className="px-4 py-3 border-b border-gray-300"></th>
            <th className="px-4 py-3 border-b border-gray-300">ID Producto</th>
            <th className="px-4 py-3 border-b border-gray-300">Nombre</th>
            <th className="px-4 py-3 border-b border-gray-300">Precio</th>
            <th className="px-4 py-3 border-b border-gray-300">Marca</th>
            <th className="px-4 py-3 border-b border-gray-300">Stock</th>
            <th className="px-4 py-3 border-b border-gray-300">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            productos.map((producto) => (
              <ProductosAdminCard key={producto.id_producto} producto={producto} />
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default ProductosAdmin