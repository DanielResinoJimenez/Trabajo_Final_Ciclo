import React, { useEffect } from 'react'
import useProductos from '../../../services/hooks/useProductos';
import ProductosCard from './ProductosCard';

const ProductosBody = () => {
    const { productos, loading, error, getProductos } = useProductos();

    useEffect(() => {
        getProductos();
    },[])


    if (loading) return <p>Cargando...</p>

    if (error) return <p>Ha ocurrido un error: {error}</p>

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