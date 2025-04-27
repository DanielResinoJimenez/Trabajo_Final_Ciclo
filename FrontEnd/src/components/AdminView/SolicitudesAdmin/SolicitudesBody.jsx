import React, { useEffect } from 'react'
import { useSolicitudesContext } from '../../../services/hooks/solicitudesContext';
import HeaderTable from '../HeaderTable';
import BodyTable from '../BodyTable';

const SolicitudesBody = ({activeTab}) => {

    const { getSolicitudes, getSolicitudesPendientes, getSolicitudesRechazadas, solicitudes } = useSolicitudesContext();

    useEffect(() => {
        if (activeTab === 1) {
            getSolicitudesPendientes();
        } else if (activeTab === 2) {
            getSolicitudesRechazadas();
        } else if (activeTab === 3) {
            getSolicitudes(); 
        }
    }, [activeTab]);

    return (
        <div className="w-[90%] m-auto mt-10 mb-20">
            <div className="max-h-[400px] overflow-y-auto">
                <table className="w-full border-[1px] border-yellow-950 border-separate border-spacing-0 text-left">
                    <HeaderTable columnas={["ID Máquina", "Fecha", "Estado", "Acciones"]} />
                    <BodyTable solicitudes={solicitudes}/>
                </table>
            </div>
        </div>
    )
}

export default SolicitudesBody