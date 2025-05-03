import React from 'react'
import MaquinasAdminCard from './MaquinasAdminCard'
import RutaRapidaMapa from './RutaRapidaMapa'

const CreacionRutaMaquinas = ({ maquinasSeleccionadas }) => {

    console.log(maquinasSeleccionadas)

    return (
        <div className='flex flex-col w-full justify-between mt-10'>
            <h2 className='text-3xl'>Máquinas seleccionadas:</h2>
            <div className='w-full flex justify-between items-center'>
                <section className='w-[40%]'>
                    {
                        !maquinasSeleccionadas || maquinasSeleccionadas.length == 0 ?
                            <p className='text-center text-2xl font-bold'>No hay máquinas seleccionadas</p>
                            :
                            <ul className='w-full'>
                                {
                                    maquinasSeleccionadas
                                    .sort((a, b) => a.id_maquina - b.id_maquina)
                                    .map((maquina) => (
                                        <li key={maquina.id_maquina} className='flex flex-col w-full'>
                                            <div className='flex w-full gap-2 text-xl font-bold'>
                                                <span className=''>{maquina.id_maquina}</span>
                                                <span className=''>{maquina.nombre_establecimiento}</span>
                                            </div>
                                            <span className=''>{maquina.direccion_establecimiento.substring(0, 40)} ...</span>
                                        </li>
                                    ))
                                }
                            </ul>

                    }
                </section>
                <section className='h-full w-[60%] flex justify-center items-center'>
                    <RutaRapidaMapa maquinasSeleccionadas={maquinasSeleccionadas}/>
                </section>
            </div>
        </div>
    )

}

export default CreacionRutaMaquinas