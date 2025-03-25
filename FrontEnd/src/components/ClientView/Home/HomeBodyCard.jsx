import React from 'react'

const HomeBodyCard = ({card, onClick}) => {

  return (
    <article className='flex flex-col items-center object-fit w-2/4 h-[500px] gap-4 p-6 border border-gray-300 rounded-lg shadow-md shadow-yellow-950 cursor-pointer max-xl:w-1/4 max-lg:w-2/4 max-md:w-full' onClick={onClick}>
        <img src={card.image} alt={card.title} className='w-full h-3/4 object-cover'/>
        <h3 className='text-2xl'>{card.title}</h3>
        <p className='text-center'>{card.text}</p>
    </article>
  )
}

export default HomeBodyCard