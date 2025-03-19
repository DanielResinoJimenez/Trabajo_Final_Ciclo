import React from 'react'
import cabecera from './../../assets/images/cabecera.png';

const Home = () => {
  return (
    <div className='flex justify-center'>
        <div className='m-4 w-[90%] h-[300px] flex justify-between items-center bg-yellow-950'>
          <p className='text-gray-50 p-10 w-1/2 text-[60px] text-justify font-bold'>No hay nada como el olor a café por la mañana</p>
          <img 
            src={cabecera} 
            alt="" 
            className='h-full object-cover w-1/2' 
            style={{ 
              maskImage: 'linear-gradient(to right, transparent 20%, #000 100%)', 
              WebkitMaskImage: 'linear-gradient(to right, transparent 20%, #000 100%)' 
            }}
          />
        </div>
    </div>
  )
}

export default Home