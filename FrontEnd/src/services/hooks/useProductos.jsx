import React, { useEffect, useState } from 'react'
import { useProductosContext } from './productosContext';

const useProductos = () => {

    const { aniadirNuevoProd } = useProductosContext();

    // Variable de estado que contiene la imagen

    const [archivo, setArchivo] = useState(null); // Estado para el archivo

    // Función que adjunta un archivo cuando se hace evento change en el input
    const handleFileChange = (e) => {
        setArchivo(e.target.files[0]); // Guarda el archivo seleccionado
    };

    // Función que se ejecuta al enviar el formulario y carga la imagen en la api
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


    // Variable donde se almacena la imagen de un determinado objeto de la base de datos.
    // Estos objetos podrían ser tanto máquinas como productos.
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

    // Función para abrir una nueva fila y que se pueda insertar un nuevo producto en administración

    const nuevoProducto = () => {
        console.log("Nuevo producto");

        // Referencias
        const tbody = document.getElementById("productosTBody");
        const filaBoton = document.getElementById("fila-boton");

        // Creo el <tr> con su estilo
        const newTr = document.createElement("tr");
        newTr.className = "bg-yellow-50 hover:bg-yellow-100 text-brown-900";

        // 1. Celda “Nuevo producto”
        const newTd1 = document.createElement("td");
        newTd1.textContent = "Nuevo producto";
        newTd1.className = "px-4 py-2 border-b border-brown-800";
        newTd1.colSpan = 2;
        newTr.appendChild(newTd1);
        

        // Helper para crear celdas con input
        const makeTdWithInput = (type, placeholder, id) => {
            const td = document.createElement("td");
            td.className = "px-4 py-2 border-b border-brown-800";
            const input = document.createElement(type === "textarea" ? "textarea" : "input");
            if (type !== "textarea") input.type = type;
            input.placeholder = placeholder;
            input.id = id;
            input.className = `
            w-full
            bg-yellow-50
            border border-brown-300
            text-brown-800
            px-3 py-2
            rounded-md
            focus:outline-none focus:ring-2 focus:ring-green-400
          `.trim().replace(/\s+/g, ' ');
            td.appendChild(input);
            return td;
        };

        newTr.appendChild(makeTdWithInput("text", "Nombre del producto", "nombre_producto"));
        newTr.appendChild(makeTdWithInput("textarea", "Descripción del producto", "desc_prod"));
        newTr.appendChild(makeTdWithInput("number", "Precio", "precio_producto"));
        newTr.appendChild(makeTdWithInput("text", "Marca", "marca_producto"));
        newTr.appendChild(makeTdWithInput("number", "Stock", "stock_producto"));

        // Botón “Añadir producto”
        const newTd7 = document.createElement("td");
        newTd7.className = "px-4 py-2 border-b border-brown-800 text-center";
        const button = document.createElement("button");
        button.textContent = "Añadir producto";
        button.className = `
          bg-green-500 hover:bg-green-600
          text-white
          px-4 py-2
          rounded-lg
          transition
          duration-150
        `.trim().replace(/\s+/g, ' ');
        button.onclick = () => {
            crearNuevoProducto();
        }
        newTd7.appendChild(button);
        newTr.appendChild(newTd7);

        // Inserto antes de la fila del botón
        const parent = filaBoton.parentNode;

        parent.insertBefore(newTr, filaBoton)
    };

    const crearNuevoProducto = () => {
        const nombre_producto = document.getElementById("nombre_producto").value;
        const desc_prod = document.getElementById("desc_prod").value;
        const precio_producto = document.getElementById("precio_producto").value;
        const marca_producto = document.getElementById("marca_producto").value;
        const stock_producto = document.getElementById("stock_producto").value;

        // Validar que los campos no estén vacíos
        if (!nombre_producto || !desc_prod || !precio_producto || !marca_producto || !stock_producto) {
            alert("Por favor, completa todos los campos.");
            return;
        }

        // Crear el nuevo producto
        const nuevoProducto = {
            nombre: nombre_producto,
            precio: precio_producto,
            stock: stock_producto,
            descripcion: desc_prod,
            marca: marca_producto,
            categoria: "No asignada"
        };

        // Llamar a la función para añadir el nuevo producto
        aniadirNuevoProd(nuevoProducto);

        // Borrar la fila de añadir un nuevo producto

        const filaBoton = document.getElementById("fila-boton");

        const deleteRow = filaBoton.previousElementSibling;
        deleteRow.remove();
        


    }

    // Retornamos los valores que necesitamos para la implementación

    return { handleFileChange, handleSubmit, cargarImagen, imagen, nuevoProducto, crearNuevoProducto };

}

export default useProductos;