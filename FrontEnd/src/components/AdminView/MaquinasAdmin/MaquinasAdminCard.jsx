import React, { useEffect } from 'react'
import useProductos from '../../../services/hooks/useProductos'

const MaquinasAdminCard = ({ maquina, filtro }) => {

    const { cargarImagen, imagen } = useProductos();

    useEffect(() => {
        if(maquina.imagen){
            cargarImagen(maquina);
        }
    }, []);

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
                <article key={maquina.id_maquina} className='flex flex-col items-center justify-center border rounded-xl text-center py-8'>
                    <span className='font-bold text-xl'>{maquina.id_maquina}</span>
                    <p>{maquina.nombre_establecimiento}</p>
                    <p>{maquina.direccion_establecimiento}</p>
                </article>
            )

        case "Apuntar recaudación":

            return (
                <article key={maquina.id_maquina} className='flex flex-col items-center justify-center border rounded-xl text-center py-8'>
                    <span className='font-bold text-xl'>{maquina.id_maquina}</span>
                    <p>{maquina.nombre_establecimiento}</p>
                </article>
            )

        case "":
        case "En stock":
        case "En mantenimiento":

            return (
                <article className='flex max-xl:w-[800px] justify-between p-10 border border-gray-400 items-center'>
                    <img src={imagen} alt="" className='h-[300px] relative left-[-70px]' />
                    <div className='flex flex-col'>
                        <h2 className='text-4xl'>{maquina.nombre}</h2>
                        <p className='text-lg'>{maquina.descripcion}</p>
                        <span className='text-xl'>{maquina.precio} €</span>
                    </div>
                </article>
            )

    }


}

export default MaquinasAdminCard