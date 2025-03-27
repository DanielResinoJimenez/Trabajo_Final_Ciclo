import React from 'react'

const ProductosCard = ({producto}) => {
  return (
    <article>
        <img src={producto.imagen} alt={producto.nombre} />
        <div>
            <h2>{producto.nombre}</h2>
            <p>{producto.marca}</p>
            <span>{producto.precio}</span>
            <span>Mostrar más</span>
        </div>
        <button>Añadir al carrito</button>
    </article>
  )
}

export default ProductosCard