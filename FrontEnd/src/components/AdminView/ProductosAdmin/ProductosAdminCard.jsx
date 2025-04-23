import React from 'react'
import { useProductosContext } from '../../../services/hooks/productosContext';
import useProductos from '../../../services/hooks/useProductos';

const ProductosAdminCard = ({ producto }) => {

  const { getProductos, eliminarProducto, handleCheckboxChange, productos, productosOriginales } = useProductosContext();
  const { mostrarModalInfo, mostrarModalEditar } = useProductos();

  const abrirModalConProductoActualizado = (id, callback) => {
    const actualizado = productos.find(p => p.id_producto === id);
    if (actualizado) callback(actualizado);
  };

  return (
    <tr className="hover:bg-blue-100 transition-colors" id={`producto-${producto.id_producto}`}>
      <td className="px-4 py-3"><input onChange={() => { handleCheckboxChange(producto.id_producto) }} type="checkbox" id={producto.id_producto} name={producto.id_producto} /></td>
      <td className="px-4 py-3">{producto.id_producto}</td>
      <td className="px-4 py-3">{producto.nombre}</td>
      <td className="px-4 py-3">{producto.descripcion}</td>
      <td className="px-4 py-3">{producto.precio} €</td>
      <td className="px-4 py-3">{producto.marca}</td>
      <td className="px-4 py-3">{producto.stock}</td>
      <td className="px-4 py-3 flex gap-4 justify-start items-center">
        <i
          onClick={() => abrirModalConProductoActualizado(producto.id_producto, mostrarModalInfo)}
          className="fa-solid fa-magnifying-glass text-green-500 text-xl cursor-pointer w-6 h-6 flex items-center justify-center transition-transform hover:scale-125"
        ></i>
        <i
          onClick={() => abrirModalConProductoActualizado(producto.id_producto, mostrarModalEditar)}
          className="fa-solid fa-pen-to-square text-yellow-500 text-xl cursor-pointer w-6 h-6 flex items-center justify-center transition-transform hover:scale-125"
        ></i>
        <i onClick={() => { eliminarProducto(producto.id_producto) }} className="fa-solid fa-trash text-red-500 text-xl cursor-pointer w-6 h-6 flex items-center justify-center transition-transform hover:scale-125"></i>
      </td>
    </tr>
  )
}

export default ProductosAdminCard