import { createContext, useContext, useState } from 'react';

const ProductosContext = createContext();

export const useProductosContext = () => useContext(ProductosContext);

export const ProductosProvider = ({ children }) => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getProductos = async () => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:3000/api/productos');
            const data = await response.json();
            setProductos(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    const getProductoByCategory = async (categoria) => {
        try {
            setLoading(true);
            const response = await fetch(`http://localhost:3000/api/productos/${categoria}`);
            const data = await response.json();
            setProductos(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <ProductosContext.Provider value={{ productos, loading, error, getProductos, getProductoByCategory }}>
            {children}
        </ProductosContext.Provider>
    );
}