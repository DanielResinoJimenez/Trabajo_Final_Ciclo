import React, { useEffect } from 'react'
import MaquinasCard from './MaquinasCard';
import { useMaquinasContext } from '../../../services/hooks/maquinasContext';

const MaquinasBody = () => {
  const { maquinas, loading, error, getMaquinasStock } = useMaquinasContext();

  useEffect(() => {
    getMaquinasStock();
  }, [])

  if(error){
    return <p>Ha ocurrido un error al cargar: {error}</p>
  }

  if(loading){
    return <p>Cargando...</p>
  }

  if(maquinas.length === 0){
    return <p>No hay máquinas operativas en este momento</p>
  }

  if(maquinas.length > 0){
    return (
      <div className='m-10 pt-20 pl-30 border-l border-gray-400 flex flex-col gap-10 w-[100%]'>
        <h1 className='text-6xl text-justify'>Catálogo de máquinas disponibles</h1>
        {
          maquinas.map((maquina) => (
            
              <MaquinasCard maquina={maquina} key={maquina.id_maquina}/>
            
          ))
        }
      </div>
    )
  }

  
}

export default MaquinasBody