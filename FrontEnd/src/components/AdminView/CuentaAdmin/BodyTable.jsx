import React from 'react'
import HistorialAccionesShow from "./HistorialAccionesShow";
import RealizarAccionShow from "./RealizarAccionShow";

const BodyTable = ({ acciones, activeTab }) => {
    if (acciones.length === 0) {
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
