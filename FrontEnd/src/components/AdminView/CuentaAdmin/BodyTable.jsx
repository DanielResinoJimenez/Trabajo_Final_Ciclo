import React from 'react'
import HistorialAccionesShow from './HistorialAccionesShow'
import RealizarAccionShow from './RealizarAccionShow'

const BodyTable = ({ acciones, activeTab }) => {
    return (
        <div className="max-h-[400px] overflow-y-auto">
            <table className="w-full border-[1px] border-yellow-950 border-separate border-spacing-0 text-left">
                <tbody id="productosTBody">
                    {activeTab === 1 ? (
                        acciones.length > 0 ? (
                            acciones.map((accion) => (
                                <HistorialAccionesShow
                                    key={
                                        accion.id_ganancia
                                            ? accion.id_ganancia + "ganancia"
                                            : accion.id_perdida + "perdida"
                                    }
                                    accion={accion}
                                />
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4">No hay acciones disponibles</td>
                            </tr>
                        )
                    ) : activeTab === 2 ? (
                        acciones.length > 0 ? (

                            acciones.map((accion) => (
                                <RealizarAccionShow
                                    key={
                                        accion.id_ganancia
                                            ? accion.id_ganancia + "ganancia"
                                            : accion.id_perdida + "perdida"
                                    }
                                    accion={accion}
                                />
                            ))

                        ) : (
                            <tr>
                                <td colSpan="4">No hay acciones disponibles</td>
                            </tr>
                        )
                    ) : (
                        <tr>
                            <td colSpan="4">Selecciona una pestaña válida</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default BodyTable