import React, { useState } from 'react'
import ApartadoGeneral from './ApartadoGeneral';
import ApartadoMaquinas from './ApartadoMaquinas';

const InfoTabs = () => {
    const [activeTab, setActiveTab] = useState(1);

    return (
        <div>
            <div className="flex border-b mt-6">
                <button
                    className={`py-3 px-6 text-xl rounded-tr-xl border ${activeTab === 1 ? 'text-black font-bold bg-yellow-100' : 'hover:font-bold hover:bg-yellow-100'}`}
                    onClick={() => setActiveTab(1)} // Cambiar a la pestaña 1
                >
                    General
                </button>
                <button
                    className={`py-3 px-6 text-xl rounded-tr-xl border ${activeTab === 2 ? 'text-black font-bold bg-yellow-100' : 'hover:font-bold hover:bg-yellow-100'}`}
                    onClick={() => setActiveTab(2)} // Cambiar a la pestaña 2
                >
                    Máquinas
                </button>
            </div>
            <div className="mt-4">
                    {activeTab === 1 && (
                        <div>
                            <h2 className="text-3xl">Ingresos y Gastos: </h2>
                            <ApartadoGeneral />
                        </div>
                    )}
                    {activeTab === 2 && (
                        <div>
                            <h2 className="text-3xl">Ingresos de Máquinas: </h2>
                            <ApartadoMaquinas />
                        </div>
                    )}
                </div>
        </div>
    )
}

export default InfoTabs