import React from 'react'
import MaquinasAdminCard from './MaquinasAdminCard'

const CreacionRutaMaquinas = ({ maquinasSeleccionadas }) => {

    return (
        <div className='flex flex-col w-full justify-between mt-10'>
            <h2 className='text-3xl'>Máquinas seleccionadas:</h2>
            <div className='w-full flex justify-between items-center'>
                <section>
                    {
                        !maquinasSeleccionadas ?
                            <p className='text-center text-2xl font-bold'>No hay máquinas seleccionadas</p>
                            :
                            maquinasSeleccionadas.map((maquina) => (
                                <MaquinasAdminCard key={maquina.id_maquina} maquina={maquina} filtro="Sin reponer" abrirModal={false} />
                            ))

                    }
                </section>
                <section>
                    <p>Aquí va a estar el mapa</p>
                </section>
            </div>
        </div>
    )

}

export default CreacionRutaMaquinas