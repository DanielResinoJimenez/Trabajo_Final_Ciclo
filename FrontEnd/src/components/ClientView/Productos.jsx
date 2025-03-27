import React from 'react'

const Productos = () => {
    return (
        <main className=''>
            <div className='p-10 nav__productos'>
                {/* Nav con filtros de productos */}
                <nav className='w-[100%] justify-center items-center flex'>
                    <ul className='flex w-[80%] m-auto text-center justify-around'>
                        <li>Categoría</li>
                        <li>Precio</li>
                        <li>Marca</li>
                    </ul>
                </nav>
            </div>
            <div>
                {/* Cuerpo del main con todas las card de productos */}

            </div>
        </main>
    )
}

export default Productos