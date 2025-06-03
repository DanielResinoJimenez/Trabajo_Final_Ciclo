import React, { useState } from 'react'
import { useProductosContext } from '../../../services/hooks/productosContext';

const ProductosNav = () => {
  const { setProductos, productosOriginales } = useProductosContext();

  const [categoria, setCategoria] = useState('');
  const [marca, setMarca] = useState('');

  const applyFilters = (categoriaVal, marcaVal) => {
    const filtered = productosOriginales.filter((producto) => {
      const matchCategoria = categoriaVal ? producto.categoria === categoriaVal : true;
      const matchMarca = marcaVal ? producto.marca === marcaVal : true;
      return matchCategoria && matchMarca;
    });
    setProductos(filtered);
  };

  const handleCategoriaChange = (e) => {
    const value = e.target.value;
    setCategoria(value);
    applyFilters(value, marca);
  };

  const handleMarcaChange = (e) => {
    const value = e.target.value;
    setMarca(value);
    applyFilters(categoria, value);
  };

  return (
    <nav className='w-[100%] justify-center items-center flex'>
      <ul className='flex w-[80%] m-auto text-center justify-around'>
        <li className='font-bold'>Filtrar por: </li>
        <li className='flex gap-2'>
          <label htmlFor="select__categoria">Categoría: </label>
          <select id="select__categoria" className='border-b border-black' onChange={handleCategoriaChange}>
            <option value="">Todas</option>
            <option value="Café">Café</option>
            <option value="Lácteos">Lácteos</option>
            <option value="Chocolate">Chocolate</option>
            <option value="Capuchino">Capuchino</option>
            <option value="Té frío">Té frío</option>
            <option value="Edulcorantes">Edulcorantes</option>
            <option value="Accesorios">Accesorios</option>
          </select>
        </li>
        <li className='flex gap-2'>
          <label htmlFor="select__marca">Marca: </label>
          <select id="select__marca" className='border-b border-black' onChange={handleMarcaChange}>
            <option value="">Todas</option>
            <option value="BONKA">Bonka</option>
            <option value="SAIMAZA">Saimaza</option>
            <option value="NESCAFE">Nescafé</option>
            <option value="NESTLE">Nestlé</option>
            <option value="SIMAT">Simat</option>
            <option value="NESTEA">Nestea</option>
            <option value="LA AZUCARERA">La azucarera</option>
            <option value="ECOPALET">EcoPalet</option>
          </select>
        </li>
      </ul>
    </nav>
  );
};

export default ProductosNav;
