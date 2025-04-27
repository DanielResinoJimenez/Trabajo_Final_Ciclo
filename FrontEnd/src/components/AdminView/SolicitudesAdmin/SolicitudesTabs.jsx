import React, { useState } from 'react'
import SolicitudesShow from './SolicitudesShow';
import SolicitudesBody from './SolicitudesBody';

const SolicitudesTabs = () => {
    const [activeTab, setActiveTab] = useState(1); // Estado para controlar la pestaña activa

    return (
        <div className='flex flex-col'>
            <div className="flex border-b justify-around">
                <button
                    className={`px-4 py-2 text-xl font-medium transition-colors duration-200 w-[50%] ${activeTab === 1 ? 'border-b border-r border-yellow-950 text-black font-bold' : 'text-gray-700 hover:text-gray-700'}`}
                    onClick={() => setActiveTab(1)} // Cambiar a la pestaña 1
                >
                    Pendientes
                </button>
                <button
                    className={`px-4 py-2 text-xl font-medium transition-colors duration-200 w-[50%] ${activeTab === 2 ? 'border-b border-l border-r border-yellow-950 text-black font-bold' : 'text-gray-700 hover:text-gray-700'}`}
                    onClick={() => setActiveTab(2)} // Cambiar a la pestaña 2
                >
                    Rechazadas
                </button>
                <button
                    className={`px-4 py-2 text-xl font-medium transition-colors duration-200 w-[50%] ${activeTab === 3 ? 'border-b border-l border-yellow-950 text-black font-bold' : 'text-gray-700 hover:text-gray-700'}`}
                    onClick={() => setActiveTab(3)} // Cambiar a la pestaña 2
                >
                    Aceptadas
                </button>
            </div>

            {/* Llamamos al provider de nuestro contexto para poder utilizarle dentro de nuestros componentes */}


            <div className="mt-4">
                {activeTab === 1 && (
                    <div>
                        <h2 className="text-3xl">Solicitudes Pendientes</h2>
                        <SolicitudesBody activeTab={activeTab} />
                    </div>
                )}
                {activeTab === 2 && (
                    <div>
                        <h2 className="text-3xl">Solicitudes Rechazadas</h2>
                        <SolicitudesBody activeTab={activeTab} />
                    </div>
                )}
                {activeTab === 3 && (
                    <div>
                        <h2 className="text-3xl">Solicitudes Aceptadas</h2>
                        <SolicitudesBody activeTab={activeTab} />
                    </div>
                )}
            </div>



        </div>
    );
}

export default SolicitudesTabs