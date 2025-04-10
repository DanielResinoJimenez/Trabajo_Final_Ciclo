import React, { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import usePanelControl from '../../services/hooks/usePanelControl'

const PanelDeControl = () => {

    const [panelOpen, setPanelOpen] = useState(true);
    

    const openElement = () => {
        if(panelOpen){
            let panel = document.getElementById('panelControl');
            let volverPanel = document.getElementById('volverPanel');
            panel.classList.add('hidden');
            volverPanel.classList.remove('hidden');
            setPanelOpen(false);
            
        }
    }

    const volverPanel = () => {
        console.log()
        if(!panelOpen){
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
            <div className='w-[1200px] grid grid-cols-4 gap-4 m-auto mt-30 p-10 panel__control rounded-lg shadow-lg shadow-yellow-950' id='panelControl'>
                <Link to={'productosAdmin'} className='border col-span-2 cursor-pointer' onClick={openElement}>

                    Productos

                </Link>
                <Link to={'maquinasAdmin'} className='border col-span-2 cursor-pointer' onClick={openElement}>

                    Máquinas

                </Link>
                <Link to={'cuentaAdmin'} className='border border col-span-3 cursor-pointer' onClick={openElement}>

                    Cuenta

                </Link>
                <Link to={'solicitudesAdmin'} className='border border col-span-1 cursor-pointer' onClick={openElement}>

                    Solicitudes

                </Link>
                <Link to={'infoGeneralAdmin'} className='col-span-4 border cursor-pointer' onClick={openElement}>

                    Información General

                </Link>
            </div>
            <div>
                <Outlet/>
            </div>
        </div>
    )
}

export default PanelDeControl