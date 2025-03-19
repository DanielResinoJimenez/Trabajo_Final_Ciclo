import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className='flex justify-between w-screen p-6 bg-pink-500 text-gray-100 font-bold text-md'>
        <img src="" alt="Logo" />
        <nav className='flex w-1/3 justify-center'>
            <ul className='flex justify-between w-full'>
                <Link to={"/"}><li className=''>Inicio</li></Link>
                <Link><li className=''>Productos</li></Link>
                <Link><li className=''>Contacto</li></Link>
            </ul>
        </nav>
        <div className='flex w-[50px] justify-center'>
            <ul className='flex justify-between w-full'>
                <li><i class="fa-solid fa-cart-shopping text-xl"></i></li>
                <li><i class="fa-solid fa-user text-xl"></i></li>
            </ul>
        </div>
    </header>
  )
}

export default Header