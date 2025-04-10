import React from 'react'

const useMenu = () => {
    let menuHidden = true;

    const userMenu = () => {
            const userMenu = document.getElementById('userMenu');

            if (menuHidden) {
                    userMenu.classList.toggle('animation_menu');
                    menuHidden = false;
            }

            if (!menuHidden) {
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
                    }, 500); 
            }
    };

    // Function to show the cart menu
    const cartMenu = () => {
            const userMenu = document.getElementById('userMenu');

            if (menuHidden) {
                    userMenu.classList.toggle('animation_menu');
                    menuHidden = false;
            }

            if (!menuHidden) {
                    userMenu.classList.toggle('animation_menu');
                    setTimeout(() => {
                            console.log(cartContent)
                            userMenu.innerHTML = '';
                            const newSpan = document.createElement('span');
                            const newArticle = document.createElement('article');
                            const newUl = document.createElement('ul');
                            const newP = document.createElement('p');
                            newSpan.classList.add('text-3xl', 'absolute', 'top-[-12px]', 'right-0', 'm-4', 'cursor-pointer');
                            newSpan.textContent = 'x';
                            newSpan.addEventListener('click', closeMenu);
                            userMenu.appendChild(newSpan);
                            if (cartContent.length === 0) {
                                    newP.textContent = 'No hay productos en el carrito';
                                    newArticle.appendChild(newP);
                            }else{
                                    let total = 0;
                                    cartContent.forEach((item) => {
                                            const newLi = document.createElement('li');
                                            const newSpan1 = document.createElement('span');
                                            const newSpan2 = document.createElement('span');
                                            newSpan1.textContent = item.nombre;
                                            newSpan2.textContent = item.precio + ' €';
                                            total += item.precio;
                                            newLi.appendChild(newSpan1);
                                            newLi.appendChild(newSpan2);
                                            newLi.classList.add('hover:text-yellow-400', 'cursor-pointer', 'flex', 'justify-between', 'items-center', 'gap-4');
                                            newUl.appendChild(newLi);
                                    });
                                    const newLi = document.createElement('li');
                                    newLi.textContent = 'Total: ' + total + ' €';
                                    newLi.classList.add('font-bold', 'text-xl', 'text-center', 'mt-4');
                                    newUl.appendChild(newLi);
                                    newArticle.appendChild(newUl);
                                    const newButton = document.createElement('button');
                                    newButton.textContent = 'Pagar';
                                    newButton.classList.add('button__productos', 'w-full', 'mt-4');
                                    newArticle.appendChild(newButton);
                            }
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

    return { userMenu, cartMenu, closeMenu };
}

export default useMenu