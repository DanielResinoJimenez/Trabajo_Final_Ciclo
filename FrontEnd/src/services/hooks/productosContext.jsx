import { createContext, useContext, useState } from 'react';
import { useGlobalContext } from './globalContext';

const ProductosContext = createContext();

export const useProductosContext = () => useContext(ProductosContext);

export const ProductosProvider = ({ children }) => {
    // Variable para almacenar los productos originales y que no se modifique el estado al hacer filtros.
    const [productosOriginales, setProductosOriginales] = useState([]);

    // Variables de estado
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectProd, setSelectProd] = useState([]);

    const {mostrarAlerta} = useGlobalContext();

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

    // Función para almacenar los checkbox seleccionados en un array

    const handleCheckboxChange = (id_producto) => {
        setSelectProd((prevSelected) => {
            if (prevSelected.includes(id_producto)) {
                return prevSelected.filter((id) => id !== id_producto);
            } else {
                return [...prevSelected, id_producto];
            }
        });
    }

    // Función para eliminar los productos seleccionados en el array de checkbox

    const eliminarProductosSeleccionados = async () => {

        if (selectProd.length === 0) {
            alert("No hay productos seleccionados para eliminar.");
            return;
        }

        try {
            for (const id of selectProd) {
                const response = await fetch(`http://localhost:3000/api/productos/${id}`, {
                    method: 'DELETE'
                });

                if (!response.ok) {
                    throw new Error(`Error al eliminar producto con ID ${id}`);
                }

                // Actualizar la lista de productos después de eliminar uno
                setProductos((prevProductos) => prevProductos.filter((producto) => producto.id_producto !== id));
                setProductosOriginales((prevProductos) => prevProductos.filter((producto) => producto.id_producto !== id));
                mostrarAlerta("Se han eliminado los productos seleccionados", "success")
            }

            // Aquí puedes limpiar el array o actualizar tu estado/UI si usas React/Vue/etc.
            selectProd.length = 0;
        } catch (error) {
            console.error("Hubo un error al eliminar los productos:", error);
            alert("Hubo un error al eliminar uno o más productos.");
        }

    }

    // Función para eliminar un producto

    const eliminarProducto = async (id_producto) => {

        try {
            const response = await fetch(`http://localhost:3000/api/productos/${id_producto}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Error al eliminar el producto');
            }

            const data = await response.json();
            console.log('Producto eliminado con éxito:', data);

            // Actualizar la lista de productos después de eliminar uno
            setProductos((prevProductos) => prevProductos.filter((producto) => producto.id_producto !== id_producto));
            setProductosOriginales((prevProductos) => prevProductos.filter((producto) => producto.id_producto !== id_producto));
            mostrarAlerta("Se ha eliminado el producto", "success")

        } catch (error) {
            console.error('Error:', error);
        }

    }

    // Añadir un nuevo producto

    const aniadirNuevoProd = async (producto) => {
        try {
            const response = await fetch('http://localhost:3000/api/productos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(producto),
            });

            if (!response.ok) {
                throw new Error('Error al añadir el producto');
            }

            const data = await response.json();
            console.log('Producto añadido con éxito:', data);

            // Actualiza estado:
            setProductos(prev => [...prev, data]);
            setProductosOriginales(prev => [...prev, data]);

            mostrarAlerta("Se ha creado un nuevo producto", "success")

        } catch (error) {
            console.error('Error:', error);
        }
    }

    // Función para modificar un producto

    const modificarProducto = async (id_producto, producto) => {
        try {
            const response = await fetch(`http://localhost:3000/api/productos/${id_producto}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(producto),
            });

            if (!response.ok) {
                throw new Error('Error al modificar el producto');
            }

            const data = await response.json();
            console.log('Producto modificado con éxito:', data);

            // Actualizar productos en el estado productos (suponiendo que data contiene el producto actualizado)
            setProductos(prevProductos =>
                prevProductos.map(p => p.id_producto === id_producto ? { ...p, ...producto } : p)
            );

            // Actualizar productosOriginales si es necesario (en caso de que lo necesites reflejar en los datos originales)
            setProductosOriginales(prevProductosOriginales =>
                prevProductosOriginales.map(p => p.id_producto === id_producto ? { ...p, ...producto } : p)
            );

            mostrarAlerta("Se ha modificado el producto", "success")

        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <ProductosContext.Provider value={{
            productos,
            setProductos,
            productosOriginales,
            setProductosOriginales,
            loading,
            error,
            getProductos,
            eliminarProducto,
            handleCheckboxChange,
            eliminarProductosSeleccionados,
            aniadirNuevoProd,
            modificarProducto,
            aniadirNuevoProd
        }}>
            {children}
        </ProductosContext.Provider>
    );
}