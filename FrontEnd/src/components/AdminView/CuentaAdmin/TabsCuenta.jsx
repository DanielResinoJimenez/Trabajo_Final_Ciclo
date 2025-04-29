import React, { useState } from 'react'
import { CuentaProvider } from '../../../services/hooks/cuentaContext';
import HistorialAcciones from './HistorialAcciones';
import RealizarAccion from './RealizarAccion';

// Efecto pestaña para la ventana cuenta

const TabsCuenta = () => {

    const [activeTab, setActiveTab] = useState(1); // Estado para controlar la pestaña activa

    return (
        <div className='flex flex-col'>
            <div className="flex border-b mt-6">
                <button
                    className={`py-3 px-6 text-xl rounded-tr-xl border ${activeTab === 1 ? 'text-black font-bold bg-yellow-100' : 'hover:font-bold hover:bg-yellow-100'}`}
                    onClick={() => setActiveTab(1)} // Cambiar a la pestaña 1
                >
                    Historial de Acciones
                </button>
                <button
                    className={`py-3 px-6 text-xl rounded-tr-xl border ${activeTab === 2 ? 'text-black font-bold bg-yellow-100' : 'hover:font-bold hover:bg-yellow-100'}`}
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