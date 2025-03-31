import React from 'react'

const MaquinasCard = ({maquina}) => {
  return (
    <article className='flex'>
        <img src={maquina.imagen} alt="" />
        <div className='flex flex-col'>
            <h2>{maquina.nombre}</h2>
            <p>{maquina.descripcion}</p>
            <span>{maquina.precio}</span>
            <div className='flex'>
                <button>Solicitar</button>
                <button>Añadir al carrito</button>
            </div>
        </div>
    </article>
  )
}

export default MaquinasCard