import React from 'react'

const Footer = () => {
    return (
        <footer className="text-white py-8 footer">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                {/* Navegación */}
                <div className="flex flex-col items-center md:items-start">
                    <h4 className="font-bold text-lg">Navegación</h4>
                    <ul className="mt-4 space-y-2">
                        <li><a href="#productos" className="hover:text-yellow-300">Productos</a></li>
                        <li><a href="#servicios" className="hover:text-yellow-300">Servicios</a></li>
                        <li><a href="#contacto" className="hover:text-yellow-300">Contacto</a></li>
                    </ul>
                </div>

                {/* Información de contacto */}
                <div className="text-center md:text-left">
                    <h4 className="font-bold text-lg">Contáctanos</h4>
                    <p className="mt-4">📍 Calle del Abedul, 5, Talavera de la Reina</p>
                    <p>📞 +34 637 58 85 13</p>
                    <p>✉️ cafeexpress@mascoffee.com</p>
                </div>

                {/* Redes sociales */}
                <div className="text-center">
                    <h4 className="font-bold text-lg">Síguenos</h4>
                    <div className="flex mt-4 space-x-4">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className=" text-xl hover:text-yellow-300">
                            <i class="fa-brands fa-facebook"></i>
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className=" text-xl hover:text-yellow-300">
                            <i class="fa-brands fa-instagram"></i>
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className=" text-xl hover:text-yellow-300">
                            <i class="fa-brands fa-x-twitter"></i>
                        </a>
                    </div>
                </div>
            </div>

            {/* Línea inferior */}
            <div className="mt-8 border-t border-brown-700 pt-4 text-center">
                <p>© 2025 Más Coffee - Todos los derechos reservados.</p>
            </div>
        </footer>

    )
}

export default Footer