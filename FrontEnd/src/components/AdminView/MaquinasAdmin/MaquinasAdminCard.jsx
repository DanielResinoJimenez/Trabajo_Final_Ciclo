import React, { useEffect } from 'react'
import useProductos from '../../../services/hooks/useProductos'

const MaquinasAdminCard = ({ maquina, filtro }) => {

    const { cargarImagen, imagen } = useProductos();

    useEffect(() => {
        if (maquina.imagen) {
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
                    <img src={imagen} alt="" className='h-[300px] w-[50%]' />
                    <div className='flex flex-col w-[50%] text-center'>
                        <h2 className='text-4xl'>{maquina.nombre}</h2>
                        <p className='text-lg'>{maquina.descripcion}</p>
                        <span className='text-xl'>{maquina.precio} €</span>
                        <div className='flex gap-4 mt-4 items-center justify-center'>
                            <button className='w-[30%] px-6 py-3 bg-red-600 rounded transition-all duration-300 ease-in-out hover:scale-105 hover:bg-red-300 hover:font-semibold text-white'>
                                Borrar
                            </button>
                            <button className={`w-[70%] ${filtro != "En stock" && 'hidden'} px-6 py-3 bg-yellow-600 rounded transition-all duration-300 ease-in-out hover:scale-105 hover:bg-yellow-500 hover:font-semibold text-white`}>Modificar Información</button>
                            <button className={`w-[70%] ${filtro != "En mantenimiento" && 'hidden'} px-6 py-3 bg-green-600 rounded transition-all duration-300 ease-in-out hover:scale-105 hover:bg-green-500 hover:font-semibold text-white`}>Mantenimiento finalizado</button>
                        </div>
                    </div>
                </article>
            )

    }


}

export default MaquinasAdminCard