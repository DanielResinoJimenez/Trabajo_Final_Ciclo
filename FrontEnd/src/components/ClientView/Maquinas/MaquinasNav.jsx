import React, { useContext, useState } from 'react'
import { useMaquinasContext } from '../../../services/hooks/maquinasContext';
import useMaquinas from '../../../services/hooks/useMaquinas';

const MaquinasNav = () => {

  const {filterByPrice, filterByNombre, filterByMarca, price} = useMaquinas();

  return (
    <nav className='h-[100%] nav__maquinas pt-40'>
      <ul className='flex flex-col gap-20 text-center items-center justify-center'>
        <li>
          <input
            type="search"
            className='bg-yellow-200 border rounded p-2'
            placeholder='Buscar...'
            onChange={filterByNombre}
          />
        </li>
        <li className='flex flex-col gap-2'>
          <label htmlFor="precio">Precio</label>
          <input
            type="range"
            onChange={filterByPrice}
            min={10}
            max={2000}
            step={5}
          />
          <span>{price}€</span>
        </li>
        <li>
          <select
            name="select__marca"
            id="select__marca"
            onChange={filterByMarca}
          >
            <option value="">Todas</option>
            <option value="saeco">Saeco</option>
            <option value="Nespresso">Nespresso</option>
          </select>
        </li>
      </ul>
    </nav>
  )
}

export default MaquinasNav
