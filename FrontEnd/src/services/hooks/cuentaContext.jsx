import { createContext, useContext, useState } from 'react';

const CuentaContext = createContext();

export const useCuentaContext = () => useContext(CuentaContext);

export const CuentaProvider = ({ children }) => {

    const [cuentas, setCuentas] = useState([]);
    const [acciones, setAcciones] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getCuentas = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:3000/api/cuentas');
            if (!response.ok) {
                throw new Error('Error fetching cuentas');
            }
            const data = await response.json();
            setCuentas(data);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    const getGanancias = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:3000/api/ganancias');
            if (!response.ok) {
                throw new Error('Error fetching ganancias');
            }
            const data = await response.json();

        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    const getPerdidas = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:3000/api/perdidas');
            if (!response.ok) {
                throw new Error('Error fetching perdidas');
            }
            const data = await response.json();
            
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <CuentaContext.Provider value={{getCuentas, getGanancias, getPerdidas}}>
            {children}
        </CuentaContext.Provider>
    );
}