import React from 'react'
import cabecera from './../../assets/images/cabecera.png';
import HomeBody from './Home/HomeBody';

const Home = () => {
  return (
    <div className='flex flex-col justify-center relative mt-10'>
        <div className='m-auto w-[90%] h-[300px] flex justify-left items-center header relative'>
          <p className='subtitle m-10 p-10 w-1/2 text-[20px] z-10 sm:m-20 sm:text-justify sm:text-[30px] lg:text-[45px]'>
            No hay nada como el olor a café por la mañana
          </p>
          <img 
            src={cabecera} 
            alt="" 
            className='h-full object-cover w-2/3 absolute top-0 right-0' 
            style={{ 
              maskImage: 'linear-gradient(45deg, transparent 20%, #000 100%)', 
              WebkitMaskImage: 'linear-gradient(45deg, transparent 20%, #000 100%)' 
            }}
          />
        </div>
        <HomeBody/>
    </div>
  )
}

export default Home