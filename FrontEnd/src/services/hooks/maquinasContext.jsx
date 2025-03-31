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
            const response = await fetch(`http://localhost:3000/api/productos/${marca}`);
            const data = await response.json();
            setMaquinas(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <MaquinasContext.Provider value={{ maquinasOriginales, maquinas, setMaquinas, loading, error, getMaquinas, getMaquinasStock, getMaquinaByMarca }}>
            {children}
        </MaquinasContext.Provider>
    );
}