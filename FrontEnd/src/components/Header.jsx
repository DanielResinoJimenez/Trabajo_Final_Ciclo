import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {

        let menuHidden = true;

        // Function to show the user menu
        const userMenu = () => {
                const userMenu = document.getElementById('userMenu');

                if(menuHidden) {
                        userMenu.classList.toggle('animation_menu');
                        menuHidden = false;
                }

                if(!menuHidden){
                        userMenu.classList.toggle('animation_menu');
                        setTimeout(() => {
                                userMenu.innerHTML = '';
                                const newSpan = document.createElement('span');
                                const newUl = document.createElement('ul');
                                const newLi = document.createElement('li');
                                const newLi2 = document.createElement('li');
                                const newLi3 = document.createElement('li');
                                const newLi4 = document.createElement('li');
                                newSpan.classList.add('text-3xl', 'absolute', 'top-[-12px]', 'right-0', 'm-4', 'cursor-pointer');
                                newSpan.textContent = 'x';
                                newSpan.addEventListener('click', closeMenu);
                                userMenu.appendChild(newSpan);
                                newLi.textContent = 'Dark Mode';
                                newLi2.textContent = 'Perfil';
                                newLi3.textContent = 'Pedidos';
                                newLi4.innerHTML = '<i class="fa-solid fa-right-from-bracket"></i>';
                                newLi.classList.add('hover:text-yellow-400', 'cursor-pointer');
                                newLi2.classList.add('hover:text-yellow-400', 'cursor-pointer');
                                newLi3.classList.add('hover:text-yellow-400', 'cursor-pointer');
                                newLi4.classList.add('hover:text-yellow-400', 'cursor-pointer');
                                newUl.classList.add('text-lg', 'text-center', 'flex', 'flex-col', 'gap-10');
                                newUl.appendChild(newLi);
                                newUl.appendChild(newLi2);
                                newUl.appendChild(newLi3);
                                newUl.appendChild(newLi4);
                                userMenu.appendChild(newUl);
                                userMenu.classList.toggle('animation_menu');
                        }, 500); // Cambia "500" por la duración de tu animación en milisegundos
                }
        };

        // Function to show the cart menu
        const cartMenu = () => {
                const userMenu = document.getElementById('userMenu');

                if(menuHidden) {
                        userMenu.classList.toggle('animation_menu');
                        menuHidden = false;
                }

                if(!menuHidden){
                        userMenu.classList.toggle('animation_menu');
                        setTimeout(() => {
                                userMenu.innerHTML = '';
                                const newSpan = document.createElement('span');
                                const newArticle = document.createElement('article');
                                const newP = document.createElement('p');
                                newSpan.classList.add('text-3xl', 'absolute', 'top-[-12px]', 'right-0', 'm-4', 'cursor-pointer');
                                newSpan.textContent = 'x';
                                newSpan.addEventListener('click', closeMenu);
                                userMenu.appendChild(newSpan);
                                newP.textContent = 'No hay productos en el carrito';
                                newArticle.appendChild(newP);
                                userMenu.appendChild(newArticle);
                                userMenu.classList.toggle('animation_menu');
                        }, 500);
                }
        };

        const closeMenu = () => {
                const userMenu = document.getElementById('userMenu');
                userMenu.classList.toggle('animation_menu');
                setTimeout(() => {
                        userMenu.innerHTML = '';
                        menuHidden = true;
                }, 500);
        }



        return (
                <header className='flex justify-between w-screen p-6 text-gray-100 font-bold text-md header z-10'>
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