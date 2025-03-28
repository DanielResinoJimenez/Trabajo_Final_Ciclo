import React from 'react'
import ProductosBody from './Productos/ProductosBody'
import ProductosNav from './Productos/ProductosNav'
import { ProductosProvider } from '../../services/hooks/productosContext'


const Productos = () => {

    return (
        <ProductosProvider>
            <main className=''>
                <div className='p-10 nav__productos'>
                    {/* Nav con filtros de productos */}
                    <ProductosNav />
                </div>
                <div className="flex justify-center items-center w-80% m-20">
                    {/* Cuerpo del main con todas las card de productos */}
                    <ProductosBody />
                </div>
            </main>
        </ProductosProvider>
            
        
    )
}

export default Productos