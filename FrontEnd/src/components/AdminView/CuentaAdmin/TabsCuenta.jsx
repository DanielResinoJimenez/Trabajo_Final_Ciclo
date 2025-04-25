import React, { useState } from 'react'
import { CuentaProvider } from '../../../services/hooks/cuentaContext';
import HistorialAcciones from './HistorialAcciones';
import RealizarAccion from './RealizarAccion';

// Efecto pestaña para la ventana cuenta

const TabsCuenta = () => {

    const [activeTab, setActiveTab] = useState(1); // Estado para controlar la pestaña activa

    return (
        <div className='flex flex-col'>
            <div className="flex border-b justify-around">
                <button
                    className={`px-4 py-2 text-xl font-medium transition-colors duration-200 w-[50%] ${activeTab === 1 ? 'border-b border-r border-yellow-950 text-yellow-700' : 'text-gray-700 hover:text-yellow-500'}`}
                    onClick={() => setActiveTab(1)} // Cambiar a la pestaña 1
                >
                    Historial de Acciones
                </button>
                <button
                    className={`px-4 py-2 text-xl font-medium transition-colors duration-200 w-[50%] ${activeTab === 2 ? 'border-b border-l border-yellow-950 text-green-700' : 'text-gray-700 hover:text-green-500'}`}
                    onClick={() => setActiveTab(2)} // Cambiar a la pestaña 2
                >
                    Realizar Acción
                </button>
            </div>

            {/* Llamamos al provider de nuestro contexto para poder utilizarle dentro de nuestros componentes */}
            <CuentaProvider>

                <div className="mt-4">
                    {activeTab === 1 && (
                        <div>
                            <h2 className="text-3xl">Historial de Acciones</h2>
                            <HistorialAcciones activeTab={activeTab}/>
                        </div>
                    )}
                    {activeTab === 2 && (
                        <div>
                            <h2 className="text-3xl">Realizar Acción</h2>
                            <RealizarAccion activeTab={activeTab}/>
                        </div>
                    )}
                </div>

            </CuentaProvider>

        </div>
    )
}

export default TabsCuenta