import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useGlobalContext } from '../services/hooks/globalContext';
import useMenu from '../services/hooks/useMenu';
import logo from './../assets/images/logo.png'

const Header = () => {

        const { cartRef, cartContent } = useGlobalContext();

        const { userMenu, cartMenu, closeMenu } = useMenu();

        const user = JSON.parse(localStorage.getItem('user'));

        let userRol = "";

        if (user) userRol = user.rol;

        return (
                <header className='flex justify-around items-center w-screen max-h-[80px] text-gray-100 font-bold text-md header z-10 fixed top-0 left-0'>
                        <div className='flex items-center max-w-[100px]'>
                                <img src={logo} alt="Logo" className='max-w-[100px] h-auto object-contain' />
                        </div>
                        <div className='md:hidden' id='menu'>
                                <i className="fa-solid fa-bars"></i>
                        </div>
                        <nav className='hidden min-xl:w-1/3 max-xl:w-[70%] justify-center md:flex' id='nav'>
                                <ul className='flex justify-between w-full'>
                                        <Link to={"/"}>
                                                <li className='relative group'>
                                                        Inicio
                                                        <span className='absolute bottom-0 left-0 w-0 h-[2px] bg-gray-100 transition-all duration-300 group-hover:w-full'></span>
                                                </li>
                                        </Link>
                                        <Link to={"productos"}>
                                                <li className='relative group'>
                                                        Productos
                                                        <span className='absolute bottom-0 left-0 w-0 h-[2px] bg-gray-100 transition-all duration-300 group-hover:w-full'></span>
                                                </li>
                                        </Link>
                                        <Link to={"maquinas"}>
                                                <li className='relative group'>
                                                        Máquinas
                                                        <span className='absolute bottom-0 left-0 w-0 h-[2px] bg-gray-100 transition-all duration-300 group-hover:w-full'></span>
                                                </li>
                                        </Link>
                                        <Link>
                                                <li className='relative group'>
                                                        Contacto
                                                        <span className='absolute bottom-0 left-0 w-0 h-[2px] bg-gray-100 transition-all duration-300 group-hover:w-full'></span>
                                                </li>
                                        </Link>
                                        {
                                                userRol == 'admin' ? (
                                                        <Link to={"panelControl"}>
                                                                <li className='relative group'>
                                                                        Panel de Control
                                                                        <span className='absolute bottom-0 left-0 w-0 h-[2px] bg-gray-100 transition-all duration-300 group-hover:w-full'></span>
                                                                </li>
                                                        </Link>
                                                ) : null
                                        }
                                </ul>
                        </nav>
                        <div className='hidden w-[50px] justify-center md:flex' id='icons'>
                                <ul className='flex justify-between w-full'>
                                        <li className='hover:shadow-lg hover:text-yellow-400 transition-all duration-300' ref={cartRef}>
                                                <i className="fa-solid fa-cart-shopping text-xl" onClick={cartMenu}></i>
                                        </li>
                                        <li className='hover:shadow-lg hover:text-yellow-400 transition-all duration-300'>
                                                <i className="fa-solid fa-user text-xl" onClick={userMenu}></i>
                                        </li>
                                </ul>
                        </div>
                        <div className='fixed userMenu right-[-400px] m-5 top-20 p-12 z-10 border border-yellow-950 shadow shadow-black' id='userMenu'>
                                {/* It is filled with the content that belongs to each button */}
                        </div>
                </header>
        )
}

export default Header