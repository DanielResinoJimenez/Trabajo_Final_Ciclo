import React, { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import usePanelControl from '../../services/hooks/usePanelControl'
import maquinaIcono from './../../assets/images/maquina_panel_control.jpeg';
import productoIcono from './../../assets/images/producto_panel_control.jpeg';
import solicitudIcono from './../../assets/images/solicitud_panel_control.jpeg';
import cuentaIcono from './../../assets/images/cuenta_panel_control.jpeg';

const PanelDeControl = () => {

    const [panelOpen, setPanelOpen] = useState(true);


    const openElement = () => {
        if (panelOpen) {
            let panel = document.getElementById('panelControl');
            let volverPanel = document.getElementById('volverPanel');
            panel.classList.add('hidden');
            volverPanel.classList.remove('hidden');
            setPanelOpen(false);

        }
    }

    const volverPanel = () => {
        console.log()
        if (!panelOpen) {
            let panel = document.getElementById('panelControl');
            let volverPanel = document.getElementById('volverPanel');
            volverPanel.classList.add('hidden');
            panel.classList.remove('hidden');
            setPanelOpen(true);
        }
    }

    return (
        <div>
            <button className='p-5 border rounded hidden' id='volverPanel' onClick={volverPanel}>Volver</button>
            <div className='w-[1200px] grid grid-cols-4 gap-4 m-auto p-10 panel__control rounded-lg shadow-lg shadow-yellow-950' id='panelControl'>
                <Link
                    to={'productosAdmin'}
                    className='relative col-span-2 cursor-pointer bg-[#FDF8E5] flex justify-center items-center p-4 shadow-md rounded-4xl overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-yellow-950 transform hover:-translate-y-2'
                    onClick={openElement}
                >
                    <span className='absolute top-5/6 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-yellow-950 text-[50px] font-semibold z-10'>
                        Productos
                    </span>

                    <img
                        src={productoIcono}
                        className="w-[70%] object-contain opacity-50"
                        alt="Icono Producto"
                    />
                </Link>
                <Link
                    to={'maquinasAdmin'}
                    className='relative col-span-2 cursor-pointer bg-[#98ADA6] flex justify-center items-center p-4 shadow-md rounded-4xl overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-yellow-950 transform hover:-translate-y-2'
                    onClick={openElement}
                >
                    <span className='absolute text-white text-[50px] font-bold top-5/6 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10'>
                        Máquinas
                    </span>
                    <img src={maquinaIcono} className="w-[70%] object-contain opacity-50" alt="Icono Máquina" />
                </Link>

                <Link
                    to={'cuentaAdmin'}
                    className='relative col-span-3 cursor-pointer bg-[#DEE3E6] flex justify-center items-center p-4 shadow-md rounded-4xl overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-yellow-950 transform hover:-translate-y-2'
                    onClick={openElement}
                >
                    <span className='absolute text-gray-800 text-[50px] font-bold top-5/6 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10'>
                        Cuenta
                    </span>
                    <img src={cuentaIcono} className="w-[40%] object-contain opacity-50" alt="Icono Cuenta" />
                </Link>

                <Link
                    to={'solicitudesAdmin'}
                    className='relative col-span-1 cursor-pointer bg-[#FBDDB9] flex justify-center items-center p-4 shadow-md rounded-4xl overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-yellow-950 transform hover:-translate-y-2'
                    onClick={openElement}
                >
                    <span className='absolute text-yellow-950 text-[50px] font-bold top-5/6 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-center'>
                        Solicitudes
                    </span>
                    <img src={solicitudIcono} className='object-contain opacity-50' alt="Icono Solicitudes" />
                </Link>
                <Link to={'infoGeneralAdmin'} className='col-span-4 cursor-pointer text-center p-10 bg-green-300 shadow-md rounded-4xl transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-yellow-950 transform hover:-translate-y-2' onClick={openElement}>

                    <span className='text-[100px] h-full w-full text-yellow-950'>Información General</span>

                </Link>
            </div>
            <div>
                <Outlet />
            </div>
        </div>
    )
}

export default PanelDeControl