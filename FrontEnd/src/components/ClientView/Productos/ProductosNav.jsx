import React, { useState } from 'react'
import { useProductosContext } from '../../../services/hooks/productosContext';


const ProductosNav = () => {

    const { getProductos, getProductoByCategory} = useProductosContext();

    const filterByCategory = (e) => {
        if(e.target.value != ""){
            getProductoByCategory(e.target.value);
        }else{
            getProductos();
        }
    }

    return (
        <nav className='w-[100%] justify-center items-center flex'>
            <ul className='flex w-[80%] m-auto text-center justify-around'>
                <li>
                    <select name="select__categoria" id="select__categoria" onChange={filterByCategory}>
                        <option value=""> Todas </option>
                        <option value="Café"> Café </option>
                        <option value="Lácteos"> Lácteos </option>
                        <option value="Chocolate"> Chocolate </option>
                        <option value="Capuchino"> Capuchino </option>
                        <option value="Té frío"> Té frío </option>
                        <option value="Edulcorantes"> Edulcorantes </option>
                        <option value="Accesorios"> Accesorios </option>
                    </select>
                </li>
                <li>Precio</li>
                <li>Marca</li>
            </ul>
        </nav>
    )
}

export default ProductosNav