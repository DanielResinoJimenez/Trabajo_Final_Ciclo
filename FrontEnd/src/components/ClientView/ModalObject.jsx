import React from 'react'


// Ventana modal para mostrar los detalles tanto de los productos como de las máquinas

const ModalObject = ({object}) => {
  return (
    <div>
        <h1>{object.nombre}</h1>
        <p>{object.descripcion}</p>
        <span>{object.precio}</span>
    </div>
  )
}

export default ModalObject