import React, { useEffect } from 'react';
import { useMaquinasContext } from '../../../services/hooks/maquinasContext';
import MaquinasAdminCard from './MaquinasAdminCard';

const MaquinasAdminBody = ({ filtro }) => {
    const {
        getMaquinas,
        maquinas,
        setMaquinas,
        maquinasOriginales,
        loading,
        error,
    } = useMaquinasContext();

    // Obtener las máquinas solo una vez al montar
    useEffect(() => {
        getMaquinas();
    }, []);

    // Filtrar las máquinas cuando cambie el filtro o las originales
    useEffect(() => {
        if (!maquinasOriginales) return;

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

    console.log(maquinas)

    return (
        <div className='grid justify-center items-center mt-10 m-auto w-full gap-6 min-xl:grid-cols-8 min-lg:grid-cols-8 min-md:grid-cols-6'>
            {maquinas && maquinas.length > 0 ? (
                maquinas.map((maquina) => (
                    <MaquinasAdminCard key={maquina.id_maquina} maquina={maquina} filtro={filtro} />
                ))
            ) : (
                <p className="col-span-full text-center">No hay máquinas en este estado actualmente</p>
            )}
        </div>
    );
};

export default MaquinasAdminBody;
