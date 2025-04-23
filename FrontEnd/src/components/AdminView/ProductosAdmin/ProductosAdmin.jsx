import React, { useEffect } from 'react'
import usePanelControl from '../../../services/hooks/usePanelControl'
import ProductosAdminCard from './ProductosAdminCard'
import { useProductosContext } from '../../../services/hooks/productosContext'
import useProductos from '../../../services/hooks/useProductos'

const ProductosAdmin = () => {

  const { productos, loading, error, getProductos, eliminarProductosSeleccionados } = useProductosContext();

  const { nuevoProducto, mostrarModal, cerrarModal } = useProductos();

  useEffect(() => {
    getProductos();
  }, [])

  return (
    <div>
      <div className='w-[90%] m-auto mt-10 flex gap-4'>
        <button className="cursor-pointer bg-red-700 p-3 rounded-xl text-white font-bold shadow-none hover:shadow-md hover:shadow-black transition-shadow duration-300" onClick={() => eliminarProductosSeleccionados()}>
          Borrar productos seleccionados
        </button>
      </div>
      <table className='w-[90%] m-auto mt-10 mb-20 border-[1px] border-yellow-950 border-separate border-spacing-0 text-left' id='productosTable'>
        <thead className=''>
          <tr className="bg-yellow-950 text-white rounded-xl">
            <th className="px-4 py-3 border-b border-gray-300">Seleccionar</th>
            <th className="px-4 py-3 border-b border-gray-300">ID Producto</th>
            <th className="px-4 py-3 border-b border-gray-300">Nombre</th>
            <th className="px-4 py-3 border-b border-gray-300">Descripción</th>
            <th className="px-4 py-3 border-b border-gray-300">Precio</th>
            <th className="px-4 py-3 border-b border-gray-300">Marca</th>
            <th className="px-4 py-3 border-b border-gray-300">Stock</th>
            <th className="px-4 py-3 border-b border-gray-300">Acciones</th>
          </tr>
        </thead>
        <tbody id='productosTBody'>
          {
            productos.map((producto) => (
              <ProductosAdminCard key={producto.id_producto} producto={producto} />
            ))
          }
          <tr className='' id='fila-boton'>
            <td colSpan={8} className='text-center p-6 text-white text-2xl font-bold border-t border-gray-400'>
              <span onClick={nuevoProducto} className='hover:bg-green-300 transition-colors cursor-pointer bg-green-500 px-20 py-2'>+</span>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Modal para mostrar una vista detallada del producto requerido */}
      <div className="hidden fixed inset-0 bg-black/50 flex items-center justify-center z-50" id='modalProductos'>
        <div className="bg-white max-h-[60%] overflow-y-auto transition-all rounded-2xl shadow-2xl w-11/12 max-w-lg p-6 relative">
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            onClick={() => cerrarModal()}
          >
            ✕
          </button>
          <div className="mt-4" id='modalProductosContent'>

          </div>
        </div>
      </div>


    </div>
  )
}

export default ProductosAdmin