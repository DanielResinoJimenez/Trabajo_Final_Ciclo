import React, { useState } from 'react'

const useProductos = () => {

    // Definimos los estados que vamos a utilizar
  
    const [productos, setProductos] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Función para obtener los productos desde la API

    const getProductos = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/productos');
            const data = await response.json();
            setProductos(data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(error);
        }
    }

    // Retornamos los valores que necesitamos para la implementación

    return { productos, loading, error, getProductos };

}

export default useProductos;