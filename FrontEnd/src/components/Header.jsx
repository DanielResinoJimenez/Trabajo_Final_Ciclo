import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { useGlobalContext } from '../services/hooks/globalContext';
import useMenu from '../services/hooks/useMenu';
import logo from './../assets/images/logo.png'

const Header = () => {
    const { cartRef, setMostrarOutlet } = useGlobalContext();
    const { userMenu, cartMenu } = useMenu();

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const user = JSON.parse(localStorage.getItem('user'));
    const userRol = user?.rol || "";

    const toggleMobileMenu = () => setIsMobileMenuOpen(prev => !prev);
    const closeMobileMenu = () => setIsMobileMenuOpen(false);

    return (
        <header className='flex justify-between items-center w-screen max-h-[80px] text-gray-100 font-bold text-md header z-10 fixed top-0 left-0 bg-black px-4'>
            <div className='flex items-center max-w-[100px]'>
                <img src={logo} alt="Logo" className='max-w-[100px] h-auto object-contain' />
            </div>

            <div className='md:hidden cursor-pointer z-30' id='menu' onClick={toggleMobileMenu}>
                <i className="fa-solid fa-bars text-2xl"></i>
            </div>

            <nav
                className={`
                    transition-all duration-300 ease-in-out
                    ${isMobileMenuOpen ? 'opacity-100 translate-y-[80px] visible' : 'opacity-0 -translate-y-5 invisible'}
                    flex flex-col md:flex-row md:translate-y-0 md:opacity-100 md:visible
                    md:static absolute top-0 left-0 w-full md:w-auto bg-black md:bg-transparent p-6 md:p-0 z-20 md:z-auto
                `}
                id='nav'
            >
                <ul className='flex flex-col md:flex-row justify-center items-center w-full gap-4 md:gap-8'>
                    <Link to={"/"} onClick={closeMobileMenu}>
                        <li className='relative group'>
                            Inicio
                            <span className='absolute bottom-0 left-0 w-0 h-[2px] bg-gray-100 transition-all duration-300 group-hover:w-full'></span>
                        </li>
                    </Link>
                    <Link to={"productos"} onClick={closeMobileMenu}>
                        <li className='relative group'>
                            Productos
                            <span className='absolute bottom-0 left-0 w-0 h-[2px] bg-gray-100 transition-all duration-300 group-hover:w-full'></span>
                        </li>
                    </Link>
                    <Link to={"maquinas"} onClick={closeMobileMenu}>
                        <li className='relative group'>
                            Máquinas
                            <span className='absolute bottom-0 left-0 w-0 h-[2px] bg-gray-100 transition-all duration-300 group-hover:w-full'></span>
                        </li>
                    </Link>
                    <Link to={"contacto"} onClick={closeMobileMenu}>
                        <li className='relative group'>
                            Contacto
                            <span className='absolute bottom-0 left-0 w-0 h-[2px] bg-gray-100 transition-all duration-300 group-hover:w-full'></span>
                        </li>
                    </Link>
                    {userRol === 'admin' && (
                        <Link to={"panelControl"} onClick={() => { setMostrarOutlet(false); closeMobileMenu(); }}>
                            <li className='relative group'>
                                Panel de Control
                                <span className='absolute bottom-0 left-0 w-0 h-[2px] bg-gray-100 transition-all duration-300 group-hover:w-full'></span>
                            </li>
                        </Link>
                    )}


                    <li
                        className='mt-4 md:hidden hover:text-yellow-400 transition-all duration-300'
                        ref={cartRef}
                        onClick={() => { cartMenu(); closeMobileMenu(); }}
                    >
                        <i className="fa-solid fa-cart-shopping text-xl"></i>
                    </li>
                    <li
                        className='md:hidden hover:text-yellow-400 transition-all duration-300'
                        onClick={() => { userMenu(); closeMobileMenu(); }}
                    >
                        <i className="fa-solid fa-user text-xl"></i>
                    </li>
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

            <div className='fixed userMenu right-[-400px] m-5 top-20 p-12 z-10 border border-yellow-950 shadow shadow-black bg-black transition-all duration-300 ease-in-out' id='userMenu'>

            </div>
        </header>
    )
}

export default Header;
