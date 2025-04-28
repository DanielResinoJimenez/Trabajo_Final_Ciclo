import { createContext, useContext, useState } from 'react';

const MaquinasContext = createContext();

export const useMaquinasContext = () => useContext(MaquinasContext);

export const MaquinasProvider = ({ children }) => {
    const [maquinasOriginales, setMaquinasOriginales] = useState(null);
    const [maquinas, setMaquinas] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getMaquinas = async () => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:3000/api/maquinas');
            const data = await response.json();
            setMaquinasOriginales(data);
            setMaquinas(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    const getMaquinasStock = async () => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:3000/api/maquinas/stock');
            const data = await response.json();
            setMaquinas(data);
            setMaquinasOriginales(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    const getMaquinaByMarca = async (marca) => {
        try {
            setLoading(true);
            const response = await fetch(`http://localhost:3000/api/maquinas/${marca}`);
            const data = await response.json();
            setMaquinas(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    const gestionarSolicitud = async (solicitud) => {
        try {
            const responseComprobar = await fetch('http://localhost:3000/api/solicitudes/existente', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(solicitud)
            });

            const dataComprobar = await responseComprobar.json();

            if (Array.isArray(dataComprobar) && dataComprobar.length === 0) {
                // No existe solicitud, la creamos
                const responseCrear = await fetch('http://localhost:3000/api/solicitudes', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(solicitud)
                });

                const dataCrear = await responseCrear.json();
                alert("Se ha enviado la solicitud correctamente");
                return dataCrear;
            } else {
                alert("Ya existe una solicitud similar, no se puede crear otra.");
                return dataComprobar;
            }
        } catch (error) {
            console.error('Error al gestionar la solicitud:', error);
            throw error;
        }
    };


    return (
        <MaquinasContext.Provider value={{ maquinasOriginales, maquinas, setMaquinas, loading, error, getMaquinas, getMaquinasStock, getMaquinaByMarca, gestionarSolicitud }}>
            {children}
        </MaquinasContext.Provider>
    );
}