import React, { useEffect, useState } from 'react';
import { useMaquinasContext } from '../../../services/hooks/maquinasContext';
import MaquinasAdminCard from './MaquinasAdminCard';
import useMaquinas from '../../../services/hooks/useMaquinas';
import ModalAltaMaquina from './ModalAltaMáquina';

const MaquinasAdminBody = ({ filtro }) => {
    const {
        getMaquinas,
        maquinas,
        modificarMaquina,
        setMaquinas,
        maquinasOriginales,
        loading,
        error,
    } = useMaquinasContext();

    const { cerrarModal, openModalCrear } = useMaquinas();

    const [modalAbierto, setModalAbierto] = useState(false);
    const [maquinaSeleccionada, setMaquinaSeleccionada] = useState(null);

    const abrirModalCrear = () => {
        setMaquinaSeleccionada({ nombre: '', id_maquina: Date.now() });
        setModalAbierto(true);
    };

    const cerrarModal2 = () => {
        setModalAbierto(false);
        setMaquinaSeleccionada(null);
    };

    // Obtener las máquinas solo una vez al montar
    useEffect(() => {
        getMaquinas();
    }, []);

    // Filtrar las máquinas cuando cambie el filtro o las originales
    useEffect(() => {

        let nuevasMaquinas = maquinasOriginales;

        switch (filtro) {
            case 'General':
                nuevasMaquinas = maquinasOriginales.filter(
                    (maquina) => maquina.estado === 'En servicio'
                );
                break;
            case 'Sin Reponer':
            case 'Apuntar recaudación':
                nuevasMaquinas = maquinasOriginales.filter(
                    (maquina) =>
                        maquina.estado === 'En servicio' && maquina.reposicion === 'N'
                );
                break;
            case 'En stock':
                nuevasMaquinas = maquinasOriginales.filter(
                    (maquina) => maquina.estado === 'En stock'
                );
                break;
            case 'En mantenimiento':
                nuevasMaquinas = maquinasOriginales.filter(
                    (maquina) =>
                        maquina.estado === 'En mantenimiento'
                );
                break;
            case '':
                nuevasMaquinas = maquinasOriginales;
                break;
            default:

                break;
        }

        setMaquinas(nuevasMaquinas);
    }, [filtro, maquinasOriginales, setMaquinas]);

    if (loading) {
        return <p>Cargando...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className=''>
            <h2 className='text-[50px]'>{`${filtro != "" ? filtro : "Todas"}`}</h2>
            <button
                className={`w-56 ${filtro != "" && 'hidden'} px-6 py-3 bg-green-600 rounded transition-all duration-300 ease-in-out hover:scale-105 hover:bg-green-500 hover:font-semibold text-white`}
                onClick={() => { openModalCrear() }}>
                Añadir Nueva Máquina
            </button>
            <div className={`grid justify-center items-center mt-10 m-auto w-full gap-6 ${filtro === "En stock" || filtro === "En mantenimiento" || filtro === ""
                ? 'min-xl:grid-cols-2 min-lg:grid-cols-1'
                : 'min-xl:grid-cols-8 min-lg:grid-cols-8 min-md:grid-cols-6'
                }`}>
                {maquinas && maquinas.length > 0 ? (
                    maquinas.map((maquina) => (
                        <MaquinasAdminCard key={maquina.id_maquina} maquina={maquina} filtro={filtro} abrirModal={(maquina) => {
                            setMaquinaSeleccionada(maquina);
                            setModalAbierto(true);
                        }} />
                    ))
                ) : (
                    <p className="col-span-full text-center">No hay máquinas en este estado actualmente</p>
                )}
            </div>

            {/* Modal Editar/Crear máquina */}
            <div className="hidden fixed inset-0 bg-black/50 flex items-center justify-center z-50" id='modalMaquinas'>
                <div className="bg-white max-h-[60%] overflow-y-auto transition-all rounded-2xl shadow-2xl w-11/12 max-w-lg p-6 relative">
                    <button
                        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 sticky left-[100%] cursor-pointer"
                        onClick={() => cerrarModal("modalMaquinas")}
                    >
                        ✕
                    </button>
                    <div className="mt-4" id='modalMaquinasContent'>

                    </div>
                </div>
            </div>

            {/* Otro tipo de modal */}
            {modalAbierto && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white max-h-[60%] overflow-y-auto transition-all rounded-2xl shadow-2xl w-11/12 max-w-lg p-6 relative">
                        <button
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 sticky left-[100%] cursor-pointer"
                            onClick={cerrarModal2}
                        >
                            ✕
                        </button>
                        <div className="mt-4">
                            {/* Aquí puedes poner el contenido del modal dependiendo de la máquina seleccionada */}
                            <h3>{maquinaSeleccionada.nombre}</h3>
                            {/* Agrega más contenido aquí según lo que necesites */}
                            <ModalAltaMaquina
                                maquina={maquinaSeleccionada}
                                onClose={cerrarModal2}
                                modificarMaquina={modificarMaquina}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MaquinasAdminBody;
