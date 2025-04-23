import { createContext, useContext, useState } from 'react';

const CuentaContext = createContext();

export const useCuentaContext = () => useContext(CuentaContext);

export const CuentaProvider = ({ children }) => {

    const [cuentas, setCuentas] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    return (
        <CuentaContext.Provider value={{}}>
            {children}
        </CuentaContext.Provider>
    );
}