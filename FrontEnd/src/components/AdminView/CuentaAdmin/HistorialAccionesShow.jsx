import React from 'react'
import { useGlobalContext } from '../../../services/hooks/globalContext';

const HistorialAccionesShow = ({ accion }) => {

    const {formatearFecha} = useGlobalContext();

    const fechaFormat = formatearFecha(accion.fecha);

    return (
        <tr className={`text-justify transition-colors ${accion.id_ganancia ? 'hover:bg-green-100' : 'hover:bg-red-100'}`}>
            <td className="px-4 py-3">
                {
                    accion.id_ganancia && (
                        <span className="bg-green-500 text-white px-2 py-1 rounded-full">
                            Ingreso
                        </span>
                    )
                }
                {
                    accion.id_perdida && (
                        <span className="bg-red-500 text-white px-2 py-1 rounded-full">
                            Gasto
                        </span>
                    )
                }
            </td>
            <td className="px-4 py-3">{fechaFormat}</td>
            <td className="px-4 py-3">{accion.motivo}</td>
            <td className="px-4 py-3 text-right">{accion.monto} €</td>
        </tr>
    )



}

export default HistorialAccionesShow