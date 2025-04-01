import React, { useState } from 'react'
import { useProductosContext } from '../../../services/hooks/productosContext';


const ProductosNav = () => {

    const { getProductos, getProductoByCategory, setProductos, productos, productosOriginales } = useProductosContext();

    const filterByCategory = (e) => {
        if (e.target.value != "") {
            const filtered = productosOriginales.filter((producto) => producto.categoria === e.target.value);
            setProductos(filtered);
        } else {
            setProductos(productosOriginales);
        }
    }

    const filterByMarca = (e) => {
        if(e.target.value != ""){
            const filtered = productosOriginales.filter((producto) => producto.marca === e.target.value);
            setProductos(filtered);
        }else{
            setProductos(productosOriginales);
        }
    }

    return (
        <nav className='w-[100%] justify-center items-center flex'>
            <ul className='flex w-[80%] m-auto text-center justify-around'>
                <li className='font-bold'>Filtrar por: </li>
                <li className='flex gap-2'>
                    <label htmlFor="select__categoria">Categoría: </label>
                    <select name="select__categoria" id="select__categoria" className='border-b border-black' onChange={filterByCategory}>
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
                <li className='flex gap-2'>
                    <label htmlFor="select__marca" className=''>Marca: </label>
                    <select name="select__marca" id="select__marca" className='border-b border-black' onChange={filterByMarca}>
                        <option value=""> Todas </option>
                        <option value="BONKA"> Bonka </option>
                        <option value="SAIMAZA"> Saimaza </option>
                        <option value="NESCAFE"> Nescafé </option>
                        <option value="NESTLE"> Nestlé </option>
                        <option value="SIMAT"> Simat </option>
                        <option value="NESTEA"> Nestea </option>
                        <option value="LA AZUCARERA"> La azucarera </option>
                        <option value="ECOPALET"> EcoPalet </option>
                    </select>
                </li>
            </ul>
        </nav>
    )
}

export default ProductosNav