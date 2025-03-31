import React from 'react'
import MaquinasNav from './Maquinas/MaquinasNav'
import { MaquinasProvider } from '../../services/hooks/maquinasContext'
import MaquinasBody from './Maquinas/MaquinasBody'

const Maquinas = () => {
  return (
    <MaquinasProvider>
      <div className='flex'>
        <div className='w-[15%]'>
          <MaquinasNav />
        </div>
        <div className='w-[85%]'>
          <MaquinasBody/>
        </div>
      </div>
    </MaquinasProvider>
  )
}

export default Maquinas