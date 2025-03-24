import React from 'react'

const HomeBodyCard = ({image, title, text}) => {
  return (
    <article className='flex flex-col items-center object-fit w-2/4 h-[500px] gap-4 p-6 border border-gray-300 rounded-lg shadow-md shadow-yellow-950'>
        <img src={image} alt={title} className='w-full h-3/4 object-cover'/>
        <h3 className='text-2xl'>{title}</h3>
        <p className='text-center'>{text}</p>
    </article>
  )
}

export default HomeBodyCard