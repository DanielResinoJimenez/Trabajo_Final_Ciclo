import { createContext, useContext, useRef, useState } from 'react';

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }) => {

    const [cartContent, setCartContent] = useState([]);

    // Función para animar la introducción de un nuevo producto o máquina al carrito

    const cartRef = useRef(null);

    const handleAddToCart = ({ cartRef, imgElement, producto, maquina }) => {

        if (producto) {
            setCartContent([...cartContent, producto]);
        }
        if (maquina) {
            setCartContent([...cartContent, maquina]);
        }

        const img = imgElement;
        const cart = cartRef.current;

        const imgRect = img.getBoundingClientRect();
        const cartRect = cart.getBoundingClientRect();

        const flyImg = img.cloneNode(true);
        const body = document.body;

        Object.assign(flyImg.style, {
            position: 'absolute',
            top: `${imgRect.top + window.scrollY}px`,
            left: `${imgRect.left + window.scrollX}px`,
            width: `${img.offsetWidth}px`,
            height: `${img.offsetHeight}px`,
            transition: 'transform 0.9s ease-in-out, opacity 0.9s ease-in-out',
            zIndex: 1000,
            pointerEvents: 'none',
        });

        body.appendChild(flyImg);

        requestAnimationFrame(() => {
            const targetX = (cartRect.left - 50) + window.scrollX;
            const targetY = (cartRect.top - 120) + window.scrollY;

            const originX = imgRect.left + window.scrollX;
            const originY = imgRect.top + window.scrollY;

            const translateX = targetX - originX;
            const translateY = targetY - originY;

            flyImg.style.transform = `translate(${translateX}px, ${translateY}px) scale(0.1)`;
            flyImg.style.opacity = '0';
        });

        flyImg.addEventListener('transitionend', () => {
            flyImg.remove();
            // Aquí podrías actualizar el estado del carrito si quieres
        });
    };

    // Función para comprobar si un usuario ha iniciado sesión

    const isLoggedIn = () => {
        const user = localStorage.getItem('user');
        
        if(user){
            console.log(true);
            return true;
        }else{
            console.log(false);
            return false;
        }
    }

    return (
        <GlobalContext.Provider value={{ cartRef, cartContent, handleAddToCart, isLoggedIn }}>
            {children}
        </GlobalContext.Provider>
    );
}