import React, { useEffect, useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import usePanelControl from '../../services/hooks/usePanelControl'
import maquinaIcono from './../../assets/images/maquina_panel_control.jpeg';
import productoIcono from './../../assets/images/producto_panel_control.jpeg';
import solicitudIcono from './../../assets/images/solicitud_panel_control.jpeg';
import cuentaIcono from './../../assets/images/cuenta_panel_control.jpeg';
import { ProductosProvider } from '../../services/hooks/productosContext';
import { MaquinasProvider } from '../../services/hooks/maquinasContext';
import { useSolicitudesContext } from '../../services/hooks/solicitudesContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useGlobalContext } from '../../services/hooks/globalContext';

const PanelDeControl = () => {

    const [panelOpen, setPanelOpen] = useState(true);

    const navigate = useNavigate(); // Hook para navegar programáticamente
    
    const { mostrarOutlet, setMostrarOutlet } = useGlobalContext();

    const { solicitudes, getSolicitudesPendientes } = useSolicitudesContext();

    useEffect(() => {
        console.log("Obteniendo todas las solicitudes pendientes")
        getSolicitudesPendientes();
    }, []);

    // Función para manejar el clic en el botón "Volver"
    const volverPanel = () => {
        const btnVolver = document.getElementById("volverPanel");
        btnVolver.classList.add("hidden"); 
        navigate('/panelControl'); 
        setMostrarOutlet(false); 
    };

    // Función para mostrar el <Outlet> si es necesario
    const mostrarOutletFunc = () => {
        setMostrarOutlet(true); // Mostrar el outlet si es necesario
        const btnVolver = document.getElementById("volverPanel");
        btnVolver.classList.remove("hidden"); // Mostrar el botón "Volver"
    };

    return (
        <ProductosProvider>
            <MaquinasProvider>
                <div className='mb-10'>
                    <button onClick={() => {volverPanel()}} className={`${!mostrarOutlet && 'hidden'} fixed top-26 right-4 z-50 bg-green-500 hover:bg-green-700 text-white font-semibold px-5 py-3 rounded-full shadow-lg transition-all`} id='volverPanel'>Volver</button>

                    {!mostrarOutlet && (
                        <div className='max-w-[1200px] max-lg:grid-cols-1 grid grid-cols-4 gap-4 m-auto p-10 panel__control rounded-lg shadow-lg shadow-yellow-950' id='panelControl'>
                            <Link
                                to={'productosAdmin'}
                                className='relative max-lg:col-span-1 col-span-2 cursor-pointer bg-[#FDF8E5] flex justify-center items-center p-4 shadow-md rounded-4xl overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-yellow-950 transform hover:-translate-y-2'
                                onClick={mostrarOutletFunc}
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
                                className='relative max-lg:col-span-1 col-span-2 cursor-pointer bg-[#98ADA6] flex justify-center items-center p-4 shadow-md rounded-4xl overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-yellow-950 transform hover:-translate-y-2'
                                onClick={mostrarOutletFunc}
                            >
                                <span className='absolute text-white text-[50px] font-bold top-5/6 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10'>
                                    Máquinas
                                </span>
                                <img src={maquinaIcono} className="w-[70%] object-contain opacity-50" alt="Icono Máquina" />
                            </Link>

                            <Link
                                to={'cuentaAdmin'}
                                className='relative max-lg:col-span-1 col-span-3 cursor-pointer bg-[#DEE3E6] flex justify-center items-center p-4 shadow-md rounded-4xl overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-yellow-950 transform hover:-translate-y-2'
                                onClick={mostrarOutletFunc}
                            >
                                <span className='absolute text-gray-800 text-[50px] font-bold top-5/6 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10'>
                                    Cuenta
                                </span>
                                <img src={cuentaIcono} className="w-[40%] object-contain opacity-50" alt="Icono Cuenta" />
                            </Link>

                            <Link
                                to={'solicitudesAdmin'}
                                className='relative max-lg:col-span-1 col-span-1 cursor-pointer bg-[#FBDDB9] flex justify-center items-center p-4 shadow-md rounded-4xl overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-yellow-950 transform hover:-translate-y-2'
                                onClick={mostrarOutletFunc}
                            >
                                <span className={`${solicitudes.length <= 0 ? 'hidden' : ''} absolute top-2 right-2 bg-red-500 text-white text-xl font-bold px-2 py-1 rounded-full z-20`}>
                                    {solicitudes.length}
                                </span>
                                <span className='absolute text-yellow-950 text-[50px] font-bold top-5/6 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-center'>
                                    Solicitudes
                                </span>
                                <img src={solicitudIcono} className='object-contain opacity-50' alt="Icono Solicitudes" />
                            </Link>
                            <Link to={'infoGeneralAdmin'} className='col-span-4 max-lg:col-span-1 cursor-pointer text-center p-10 bg-green-300 shadow-md rounded-4xl transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-yellow-950 transform hover:-translate-y-2' onClick={mostrarOutletFunc}>

                                <span className='text-[100px] max-md:text-[60px] font-bold h-full w-full text-yellow-950'>Información General</span>

                            </Link>
                        </div>
                    )}


                    <div id='outlet_container'>
                        {mostrarOutlet && <Outlet />}
                        <ToastContainer style={{ top: '100px', right: '20px' }}/>
                    </div>
                </div>
            </MaquinasProvider>
        </ProductosProvider>
    )
}

export default PanelDeControl