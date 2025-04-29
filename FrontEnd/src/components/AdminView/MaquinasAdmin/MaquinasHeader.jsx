import React from 'react'

const MaquinasHeader = ({navOptions}) => {
  return(
    <nav className=''>
        <ul className='flex gap-10 mx-10 bg-yellow-950 py-3 px-6'>
            {
                navOptions.map((option) => (
                    <li id={option} className='text-white font-bold cursor-pointer hover:underline'>{option}</li>
                ))
            }
        </ul>
    </nav>
  )
}

export default MaquinasHeader