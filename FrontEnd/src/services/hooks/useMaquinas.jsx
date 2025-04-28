import React, { useState } from 'react'
import { useMaquinasContext } from './maquinasContext';

const useMaquinas = () => {
  
    const [price, setPrice] = useState(0);
    const [nombre, setNombre] = useState('');
    const [marca, setMarca] = useState('');
    const { maquinasOriginales, setMaquinas } = useMaquinasContext();

    const filterByPrice = (e) => {
        const value = e.target.value;
        setPrice(value);
        const filtered = maquinasOriginales.filter(maquina =>
          maquina.precio <= value &&
          maquina.nombre.toLowerCase().includes(nombre.toLowerCase()) &&
          (marca ? maquina.marca.toLowerCase() === marca.toLowerCase() : true)
        );
        setMaquinas(filtered);
      };
    
      const filterByNombre = (e) => {
        const value = e.target.value;
        setNombre(value);
        const filtered = maquinasOriginales.filter(maquina =>
          maquina.nombre.toLowerCase().includes(value.toLowerCase()) &&
          maquina.precio <= price &&
          (marca ? maquina.marca.toLowerCase() === marca.toLowerCase() : true)
        );
        setMaquinas(filtered);
      };
    
      const filterByMarca = (e) => {
        const value = e.target.value;
        setMarca(value);
        const filtered = maquinasOriginales.filter(maquina =>
          (value ? maquina.marca.toLowerCase() === value.toLowerCase() : true) &&
          maquina.precio <= price &&
          maquina.nombre.toLowerCase().includes(nombre.toLowerCase())
        );
        setMaquinas(filtered);
      };

      return {filterByMarca, filterByNombre, filterByPrice, price}

}

export default useMaquinas