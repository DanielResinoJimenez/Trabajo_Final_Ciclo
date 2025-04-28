import React, { useEffect } from 'react'
import useProductos from '../../../services/hooks/useProductos';
import ProductosCard from './ProductosCard';
import { useProductosContext } from '../../../services/hooks/productosContext';

const ProductosBody = () => {
    const { productos, loading, error, getProductos } = useProductosContext();

    useEffect(() => {
        getProductos();
    }, []);

    console.log(productos);

    if (loading) return <p>Cargando...</p>

    if (error) return <p>Ha ocurrido un error: {error}</p>

    if(productos.length <= 0) return <p className='text-xl'>No hay productos disponibles</p>

    if (productos) {
        return (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-xl:w-full gap-4 w-[80%] mx-auto items-center'>
                {productos.map(producto => (
                    <ProductosCard key={producto.id_producto} producto={producto}/>
                ))}
            </div>
        )
    }
}

export default ProductosBody