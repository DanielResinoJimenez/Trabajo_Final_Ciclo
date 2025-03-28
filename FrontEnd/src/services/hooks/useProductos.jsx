import React, { useState } from 'react'

const useProductos = () => {

    // Variable de estado que contiene la imagen

    const [archivo, setArchivo] = useState(null); // Estado para el archivo

    const handleFileChange = (e) => {
        setArchivo(e.target.files[0]); // Guarda el archivo seleccionado
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Evita que la página se recargue

        const id_producto = e.target.parentElement.firstChild.textContent;

        if (!archivo) {
            alert("Por favor, selecciona una imagen");
            return;
        }

        const formData = new FormData();
        formData.append('id_producto', id_producto);
        formData.append('imagen', archivo); // Adjunta la imagen con el nombre del campo 'imagen'

        try {
            const response = await fetch('http://localhost:3000/api/productos/create', {
                method: 'POST',
                body: formData, // Envía los datos del formulario
            });

            if (!response.ok) {
                throw new Error('Error al subir la imagen');
            }

            const data = await response.json();
            console.log('Imagen subida con éxito:', data);
            alert("Imagen subida con éxito!");
        } catch (error) {
            console.error('Error:', error);
            alert("Hubo un error al subir la imagen");
        }
    }

    const [imagen, setImagen] = useState([]); // Estado para representar las imagenes correctamente

    // Función para cargar las imágenes desde la API
    const cargarImagen = (producto) => {
        try {
            const buffer = new Uint8Array(producto.imagen.data); // Convertir Buffer a Uint8Array
            const blob = new Blob([buffer], { type: producto.tipo }); // Crear un Blob
            const imageUrl = URL.createObjectURL(blob); // Generar URL del Blob
            setImagen(imageUrl); // Actualizar estado con las URLs generadas
        } catch (error) {
            console.error("Error al cargar la imagen:", error);
        }
    };

    // Retornamos los valores que necesitamos para la implementación

    return { handleFileChange, handleSubmit, cargarImagen, imagen };

}

export default useProductos;