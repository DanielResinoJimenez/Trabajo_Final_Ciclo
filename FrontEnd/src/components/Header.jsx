import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
return (
    <header className='flex justify-between w-screen p-6 text-gray-100 font-bold text-md header'>
            <img src="" alt="Logo" />
            <div className='md:hidden' id='menu'>
                <i className="fa-solid fa-bars"></i>
            </div>
                <nav className='hidden w-1/3 justify-center md:flex' id='nav'>
                    <ul className='flex justify-between w-full'>
                            <Link to={"/"}>
                                    <li className='relative group'>
                                            Inicio
                                            <span className='absolute bottom-0 left-0 w-0 h-[2px] bg-gray-100 transition-all duration-300 group-hover:w-full'></span>
                                    </li>
                            </Link>
                            <Link>
                                    <li className='relative group'>
                                            Productos
                                            <span className='absolute bottom-0 left-0 w-0 h-[2px] bg-gray-100 transition-all duration-300 group-hover:w-full'></span>
                                    </li>
                            </Link>
                            <Link>
                                    <li className='relative group'>
                                            Contacto
                                            <span className='absolute bottom-0 left-0 w-0 h-[2px] bg-gray-100 transition-all duration-300 group-hover:w-full'></span>
                                    </li>
                            </Link>
                    </ul>
            </nav>
            <div className='hidden w-[50px] justify-center md:flex' id='icons'>
                    <ul className='flex justify-between w-full'>
                            <li className='hover:shadow-lg hover:text-yellow-400 transition-all duration-300'>
                                <i className="fa-solid fa-cart-shopping text-xl"></i>
                            </li>
                            <li className='hover:shadow-lg hover:text-yellow-400 transition-all duration-300'>
                                <i className="fa-solid fa-user text-xl"></i>
                            </li>
                    </ul>
            </div>
    </header>
)
}

export default Header