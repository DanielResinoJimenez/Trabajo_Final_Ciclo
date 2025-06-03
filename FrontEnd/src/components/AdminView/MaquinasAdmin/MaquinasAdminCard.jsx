import React, { useEffect } from 'react'
import useProductos from '../../../services/hooks/useProductos'
import { useMaquinasContext } from '../../../services/hooks/maquinasContext';
import useMaquinas from '../../../services/hooks/useMaquinas';
import { useGlobalContext } from '../../../services/hooks/globalContext';
import noImage from "../../../assets/images/noimage.png";

const MaquinasAdminCard = ({ maquina, filtro, abrirModal, aniadirRuta }) => {

    const { cargarImagen, imagen } = useProductos();

    const { modificarMaquina, borrarMaquina } = useMaquinasContext();

    const { openModalModificar, openModalAlta, handleSubmit, handleFileChange, insertarGanancia } = useMaquinas();

    useEffect(() => {
        if (maquina.imagen) {
            cargarImagen(maquina);
        }
    }, []);

    switch (filtro) {
        case "General":

            return (
                <article key={maquina.id_maquina} className='flex flex-col items-center justify-center border rounded-xl text-center py-8 h-full'>
                    <span className='font-bold text-xl'>{maquina.id_maquina}</span>
                    <p>{maquina.nombre_establecimiento}</p>
                    <button onClick={() => {modificarMaquina(maquina.id_maquina, {...maquina, estado: "En stock"})}} className="min-w-[100px]  px-6 py-3 bg-red-600 rounded transition-all duration-300 ease-in-out hover:scale-105 hover:bg-red-300 hover:font-semibold text-white">Dar de baja</button>
                </article>
            )

        case "Sin Reponer":

            return (
                <article key={maquina.id_maquina} className='flex flex-col items-center justify-center border rounded-xl text-center py-8 h-full cursor-pointer hover:shadow-lg hover:shadow-yellow-950' onClick={(e) => {aniadirRuta(e, maquina)}}>
                    <span className='font-bold text-xl'>{maquina.id_maquina}</span>
                    <p>{maquina.nombre_establecimiento}</p>
                </article>
            )

        case "Apuntar recaudación":

            return (
                <article key={maquina.id_maquina} className='flex flex-col items-center justify-center border rounded-xl text-center py-8 px-4 h-full'>
                    <span className='font-bold text-xl'>{maquina.id_maquina}</span>
                    <p>{maquina.nombre_establecimiento}</p>
                    <input type="number" step={0.01} className='w-full bg-yellow-50 border border-brown-300 text-brown-800 px-3 py-2 rounded-md'/>
                    <button className='bg-green-600 py-1 px-2 rounded mt-2 transition duration-150 hover:bg-green-300 cursor-pointer'><i className="fas fa-check" onClick={(e) => {insertarGanancia(e, maquina)}}></i></button>
                </article>
            )

        case "":
        case "En stock":
        case "En mantenimiento":

            return (
                <article className="flex max-xl:w-[800px] h-[300px] relative justify-between p-10 border border-gray-400 items-center max-lg:flex-col max-lg:h-full max-lg:w-full">
                    <span className='absolute top-4 right-4 font-bold'>{maquina.estado}</span>
                    {
                        !maquina.imagen ?
                            <img src={noImage} alt="" className="object-contain max-h-[200px] w-[50%] h-auto mix-blend-multiply" />
                            :
                            <img src={cargarImagen(maquina)} alt="" className="object-contain max-h-[300px] w-[50%] h-auto mix-blend-multiply" />
                    }
                    <div className="flex flex-col w-[50%] text-center">
                        <h2 className="text-4xl">{maquina.nombre}</h2>
                        <p className="text-lg">{maquina.descripcion}</p>
                        <span className="text-xl">{maquina.precio} €</span>
                        <div className="flex flex-wrap gap-4 mt-4 items-center justify-center">
                            <button className="flex-1 min-w-[100px] max-w-[30%] px-6 py-3 bg-red-600 rounded transition-all duration-300 ease-in-out hover:scale-105 hover:bg-red-300 hover:font-semibold text-white"
                                onClick={() => { borrarMaquina(maquina.id_maquina) }}>
                                Borrar
                            </button>

                            <button className={`flex-1 min-w-[100px] max-w-[70%] ${filtro == "En stock" || filtro == "" ? '' : "hidden"} px-6 py-3 bg-yellow-600 rounded transition-all duration-300 ease-in-out hover:scale-105 hover:bg-yellow-500 hover:font-semibold text-white`}
                                onClick={() => { openModalModificar(maquina) }}>
                                Modificar Información
                            </button>

                            <button className={`flex-1 min-w-[100px] max-w-[70%] ${filtro !== "En mantenimiento" && 'hidden'} px-6 py-3 bg-green-600 rounded transition-all duration-300 ease-in-out hover:scale-105 hover:bg-green-500 hover:font-semibold text-white`}
                                onClick={() => { modificarMaquina(maquina.id_maquina, { ...maquina, estado: "En stock" }) }}>
                                Mantenimiento finalizado
                            </button>

                            <button
                                className={`w-full ${filtro !== "En stock" && 'hidden'} px-6 py-3 bg-green-600 rounded transition-all duration-300 ease-in-out hover:scale-105 hover:bg-green-500 hover:font-semibold text-white`}
                                onClick={() => abrirModal(maquina)}>
                                Dar de alta máquina
                            </button>
                        </div>

                    </div>
                </article>

            )

    }


}

export default MaquinasAdminCard