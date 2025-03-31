import { createContext, useContext, useState } from 'react';

const ProductosContext = createContext();

export const useProductosContext = () => useContext(ProductosContext);

export const ProductosProvider = ({ children }) => {
    // Variable para almacenar los productos originales y que no se modifique el estado al hacer filtros.
    const [productosOriginales, setProductosOriginales] = useState([]);

    // Variables de estado
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getProductos = async () => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:3000/api/productos');
            const data = await response.json();
            setProductos(data);
            setProductosOriginales(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <ProductosContext.Provider value={{ productos, setProductos, productosOriginales, setProductosOriginales, loading, error, getProductos }}>
            {children}
        </ProductosContext.Provider>
    );
}