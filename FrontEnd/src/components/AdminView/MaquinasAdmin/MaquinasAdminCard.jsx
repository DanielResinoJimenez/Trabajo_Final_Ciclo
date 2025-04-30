import React from 'react'

const MaquinasAdminCard = ({ maquina, filtro }) => {

    switch (filtro) {
        case "General":

            return (
                <article key={maquina.id_maquina} className='flex flex-col items-center justify-center border rounded-xl text-center py-8'>
                    <span className='font-bold text-xl'>{maquina.id_maquina}</span>
                    <p>{maquina.nombre_establecimiento}</p>
                </article>
            )
            
        case "Sin Reponer":

            return (
                <article  key={maquina.id_maquina} className='flex flex-col items-center justify-center border rounded-xl text-center py-8'>
                    <span className='font-bold text-xl'>{maquina.id_maquina}</span>
                    <p>{maquina.nombre_establecimiento}</p>
                    <p>{maquina.direccion_establecimiento}</p>
                </article>
            )
            
        case "Apuntar recaudación":

            return (
                <article  key={maquina.id_maquina} className='flex flex-col items-center justify-center border rounded-xl text-center py-8'>
                    <span className='font-bold text-xl'>{maquina.id_maquina}</span>
                    <p>{maquina.nombre_establecimiento}</p>
                </article>
            )
            
    }

    
}

export default MaquinasAdminCard