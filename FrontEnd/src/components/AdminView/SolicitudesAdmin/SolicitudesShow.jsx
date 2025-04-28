import React from 'react'
import { useSolicitudesContext } from '../../../services/hooks/solicitudesContext'
import HeaderTable from '../HeaderTable';
import BodyTable from '../BodyTable';
import { useGlobalContext } from '../../../services/hooks/globalContext';

const SolicitudesShow = ({ solicitud }) => {

    const { formatearFecha } = useGlobalContext();

    const { modifyEstadoSolicitud, deleteSolicitud } = useSolicitudesContext();

    const fechaFormat = formatearFecha(solicitud.fecha_solicitud);

    return (
        <tr className={`text-justify transition-colors`}>
            <td className="px-4 py-3">
                {solicitud.id_maquina}
            </td>
            <td className="px-4 py-3">{fechaFormat}</td>
            <td className="px-4 py-3">{solicitud.estado}</td>
            <td className="px-4 py-3 text-right">
                <div className="flex justify-end gap-6">
                    <i className="fas fa-file-alt cursor-pointer font-bold text-xl hover:text-blue-500"></i>

                    {solicitud.estado === "pendiente" && (
                        <i className="fas fa-check cursor-pointer font-bold text-xl hover:text-green-500" onClick={() => {modifyEstadoSolicitud(solicitud.id_solicitud, "aprobada")}}></i>
                    )}
                    {solicitud.estado === "pendiente" && (
                        <i className="fas fa-times cursor-pointer font-bold text-xl hover:text-red-500" onClick={() => {modifyEstadoSolicitud(solicitud.id_solicitud, "rechazada")}}></i>
                    )}
                    {solicitud.estado !== "pendiente" && (
                        <i className="fas fa-trash cursor-pointer font-bold text-xl hover:text-red-700" onClick={() => {deleteSolicitud(solicitud.id_solicitud)}}></i>
                    )}
                </div>
            </td>
        </tr>
    )


}

export default SolicitudesShow