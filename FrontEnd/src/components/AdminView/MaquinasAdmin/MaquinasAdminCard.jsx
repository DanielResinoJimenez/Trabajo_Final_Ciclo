import React, { useEffect } from 'react'
import useProductos from '../../../services/hooks/useProductos'
import { useMaquinasContext } from '../../../services/hooks/maquinasContext';
import useMaquinas from '../../../services/hooks/useMaquinas';
import { useGlobalContext } from '../../../services/hooks/globalContext';

const MaquinasAdminCard = ({ maquina, filtro, abrirModal }) => {

    const { cargarImagen, imagen } = useProductos();

    const { modificarMaquina, borrarMaquina } = useMaquinasContext();

    const { openModalModificar, openModalAlta, handleSubmit, handleFileChange } = useMaquinas();

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
                <article className="flex max-xl:w-[800px] h-[300px] justify-between p-10 border border-gray-400 items-center max-lg:flex-col max-lg:h-full max-lg:w-full">
                    {
                        imagen.length === 0 ?
                            <div className='flex items-center justify-around w-[50%]'>
                                <label for="imagen_maquina" className="cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out hover:bg-blue-500 hover:font-semibold text-white bg-blue-600 rounded-full p-4 flex items-center justify-center">
                                    <i className="fas fa-file-upload text-xl"></i>
                                </label>
                                <input
                                    type="file"
                                    name="imagen"
                                    id="imagen_maquina"
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                                <i
                                    className="fas fa-check-circle cursor-pointer text-center text-3xl text-blue-600 hover:text-blue-500 transition-all duration-300 ease-in-out hover:scale-105"
                                    onClick={(e) => { handleSubmit(e, maquina.id_maquina) }}
                                ></i>
                            </div>
                            :
                            <img src={imagen} alt="" className="object-contain max-w-full max-h-[300px] w-[50%] h-auto" />
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