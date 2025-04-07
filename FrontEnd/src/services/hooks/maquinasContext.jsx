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

    const realizarSolicitud = async ({id_maquina, id_usuario}) => {
        try{
            const response = await fetch('http://localhost:3000/api/solicitudes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id_maquina, id_usuario, estado: 'pendiente', fecha_solicitud: new Date() }) 
            });
            const data = await response.json();
            return data;
        }catch(error){
            console.error('Error al realizar la solicitud:', error);
            throw error;
        }
    }

    return (
        <MaquinasContext.Provider value={{ maquinasOriginales, maquinas, setMaquinas, loading, error, getMaquinas, getMaquinasStock, getMaquinaByMarca, realizarSolicitud }}>
            {children}
        </MaquinasContext.Provider>
    );
}