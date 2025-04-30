import React from 'react'
import { useMaquinasContext } from '../../../services/hooks/maquinasContext'

const MaquinasHeader = ({navOptions}) => {

  const {setEstado} = useMaquinasContext();

  return(
    <nav className=''>
        <ul className='flex gap-10 mx-10 bg-yellow-950 py-3 px-6'>
            {
                navOptions.map((option) => (
                    <li key={option} onClick={() => {setEstado(option)}} id={option} className='text-white font-bold cursor-pointer hover:underline'>{option}</li>
                ))
            }
        </ul>
    </nav>
  )
}

export default MaquinasHeader