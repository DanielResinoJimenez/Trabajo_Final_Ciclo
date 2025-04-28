import { createContext, useContext, useEffect, useState } from 'react';

const SolicitudesContext = createContext();

export const useSolicitudesContext = () => useContext(SolicitudesContext);

export const SolicitudesProvider = ({ children }) => {

    const [solicitudes, setSolicitudes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getSolicitudesAceptadas = async () => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:3000/api/solicitudes');
            const data = await response.json();

            // En este caso cojo solo las aceptadas
            setSolicitudes(data.filter((solicitud) => solicitud.estado === "aprobada"))
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    const getSolicitudesPendientes = async () => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:3000/api/solicitudes/pendientes');
            const data = await response.json();
            console.log(data)
            setSolicitudes(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    const getSolicitudesRechazadas = async () => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:3000/api/solicitudes/denegadas');
            const data = await response.json();
            setSolicitudes(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    const modifyEstadoSolicitud = async (id_solicitud, estado) => {
        try {
            const response = await fetch(`http://localhost:3000/api/solicitudes/${id_solicitud}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ estado })  // Enviamos el nuevo estado
            });

            if (!response.ok) {
                throw new Error('Error al modificar el estado de la solicitud');
            }

            const data = await response.json();
            const nuevasSolicitudes = solicitudes.filter(solicitud => solicitud.id_solicitud !== id_solicitud);
            setSolicitudes(nuevasSolicitudes);

            return data;
        } catch (error) {
            console.error('Error en modifyEstadoSolicitud:', error);
            throw error;
        }
    };


    return (
        <SolicitudesContext.Provider value={{ solicitudes, getSolicitudesAceptadas, getSolicitudesPendientes, getSolicitudesRechazadas, setSolicitudes, modifyEstadoSolicitud }}>
            {children}
        </SolicitudesContext.Provider>
    );
}
