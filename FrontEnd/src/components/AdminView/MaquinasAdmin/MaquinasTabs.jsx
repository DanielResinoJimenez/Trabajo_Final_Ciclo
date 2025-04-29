import React, { useState } from 'react'

const MaquinasTabs = () => {
    const [activeTab, setActiveTab] = useState(1); // Estado para controlar la pestaña activa

    return (
        <div className='flex flex-col'>
            <div className="flex border-b mt-6">
                <button
                    className={`py-3 px-6 text-xl rounded-tr-xl border ${activeTab === 1 ? 'text-black font-bold bg-yellow-100' : 'hover:font-bold hover:bg-yellow-100'}`}
                    onClick={() => setActiveTab(1)} // Cambiar a la pestaña 1
                >
                    En Servicio
                </button>
                <button
                    className={`py-3 px-6 text-xl rounded-tr-xl border ${activeTab === 2 ? 'text-black font-bold bg-yellow-100' : 'hover:font-bold hover:bg-yellow-100'}`}
                    onClick={() => setActiveTab(2)} // Cambiar a la pestaña 2
                >
                    En Stock
                </button>
                <button
                    className={`py-3 px-6 text-xl rounded-tr-xl border ${activeTab === 3 ? 'text-black font-bold bg-yellow-100' : 'hover:font-bold hover:bg-yellow-100'}`}
                    onClick={() => setActiveTab(3)} // Cambiar a la pestaña 2
                >
                    En mantenimiento
                </button>
                <button
                    className={`py-3 px-6 text-xl rounded-tr-xl border ${activeTab === 4 ? 'text-black font-bold bg-yellow-100' : 'hover:font-bold hover:bg-yellow-100'}`}
                    onClick={() => setActiveTab(4)} // Cambiar a la pestaña 2
                >
                    Todas
                </button>
            </div>

            {/* Llamamos al provider de nuestro contexto para poder utilizarle dentro de nuestros componentes */}


            <div className="mt-4">
                {activeTab === 1 && (
                    <div>
                        <p>1</p>
                    </div>
                )}
                {activeTab === 2 && (
                    <div>
                        <p>2</p>
                    </div>
                )}
                {activeTab === 3 && (
                    <p>3</p>
                )}
                {activeTab === 4 && (
                    <p>4</p>
                )}
            </div>



        </div>
    );
}

export default MaquinasTabs