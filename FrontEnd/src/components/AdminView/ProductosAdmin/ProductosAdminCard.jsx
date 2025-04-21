import React from 'react'

const ProductosAdminCard = ({ producto }) => {
  return (
    <tr className="hover:bg-blue-100 transition-colors">
      <td className="px-4 py-3"><input type="checkbox" id={producto.id_producto} name={producto.id_producto}/></td>
      <td className="px-4 py-3">{producto.id_producto}</td>
      <td className="px-4 py-3">{producto.nombre}</td>
      <td className="px-4 py-3">{producto.precio} €</td>
      <td className="px-4 py-3">{producto.marca}</td>
      <td className="px-4 py-3">{producto.stock}</td>
      <td className="px-4 py-3 flex gap-4 justify-start items-center">
        <i className="fa-solid fa-magnifying-glass text-green-500 text-xl cursor-pointer w-6 h-6 flex items-center justify-center transition-transform hover:scale-125"></i>
        <i className="fa-solid fa-pen-to-square text-yellow-500 text-xl cursor-pointer w-6 h-6 flex items-center justify-center transition-transform hover:scale-125"></i>
        <i className="fa-solid fa-trash text-red-500 text-xl cursor-pointer w-6 h-6 flex items-center justify-center transition-transform hover:scale-125"></i>
      </td>
    </tr>
  )
}

export default ProductosAdminCard