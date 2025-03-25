import React from 'react'

const HomeBodySection = ({ card }) => {
  if ((card.card_id % 2) === 0) {
    return (
      <article className='flex h-[300px] p-4 border border-gray-400 rounded-lg shadow-lg shadow-yellow-950 w-[70%]  max-lg:justify-center max-lg:items-center max-lg:text-center' id={`section-${card.card_id}`}>
        <img src={card.image2} alt={card.title} className='object-fit w-full h-full object-fit object-contain rounded-xl mix-blend-multiply max-lg:hidden'/>
        <div className='w-4/5 flex flex-col gap-5 max-lg:justify-center max-lg:items-center'>
          <h1 className='text-3xl'>{card.title}</h1>
          <p className='text-justify w-5/6 max-lg:text-center'>{card.text_extended}</p>
        </div>
      </article>
    )
  } else {
    return (
      <article className='flex h-[300px] p-4 border border-gray-400 rounded-lg shadow-lg shadow-yellow-950 w-[70%] max-lg:justify-center max-lg:items-center max-lg:text-center' id={`section-${card.card_id}`}> 
        <div className='w-4/5 flex flex-col gap-5 max-lg:justify-center max-lg:items-center'>
          <h1 className='text-3xl'>{card.title}</h1>
          <p className='text-justify w-5/6 max-lg:text-center'>{card.text_extended}</p>
        </div>
        <img src={card.image2} alt={card.title} className='object-fit w-2/3 h-full object-fit object-contain rounded-xl mix-blend-multiply max-lg:hidden'/>
      </article>
    )
  }
}

export default HomeBodySection