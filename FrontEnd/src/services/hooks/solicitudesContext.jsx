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
            setSolicitudes(data.filter((solicitud) => solicitud.estado === "aceptada"))
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

    return (
        <SolicitudesContext.Provider value={{ solicitudes, getSolicitudesAceptadas, getSolicitudesPendientes, getSolicitudesRechazadas, setSolicitudes }}>
            {children}
        </SolicitudesContext.Provider>
    );
}
