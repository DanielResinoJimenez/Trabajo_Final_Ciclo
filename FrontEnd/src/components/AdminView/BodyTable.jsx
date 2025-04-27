import React from 'react'
import HistorialAccionesShow from "./CuentaAdmin/HistorialAccionesShow";
import RealizarAccionShow from "./CuentaAdmin/RealizarAccionShow";
import SolicitudesShow from './SolicitudesAdmin/SolicitudesShow';

const BodyTable = ({ acciones, activeTab, solicitudes }) => {

    if (!acciones && !solicitudes) {
        return (
            <tbody>
                <tr>
                    <td colSpan="4" className="text-center py-4">
                        No hay acciones disponibles
                    </td>
                </tr>
            </tbody>
        );
    }

    if (solicitudes) {
        return (
            <tbody>
                {
                    solicitudes.map((solicitud) => (
                        <SolicitudesShow key={solicitud.id_solicitud} solicitud={solicitud}/>
                    ))
                }
            </tbody>
        );
    }

    return (
        <tbody>
            {activeTab === 1 &&
                acciones.map((accion) => (
                    <HistorialAccionesShow
                        key={
                            accion.id_ganancia
                                ? accion.id_ganancia + "ganancia"
                                : accion.id_perdida + "perdida"
                        }
                        accion={accion}
                    />
                ))}
            {activeTab === 2 &&
                acciones.map((accion) => (
                    <RealizarAccionShow
                        key={
                            accion.id_ganancia
                                ? accion.id_ganancia + "ganancia"
                                : accion.id_perdida + "perdida"
                        }
                        accion={accion}
                    />
                ))}
        </tbody>
    );
};

export default BodyTable;
