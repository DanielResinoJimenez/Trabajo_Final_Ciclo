import React, { useEffect, useState } from 'react'
import { useProductosContext } from './productosContext';
import { useMaquinasContext } from './maquinasContext';
import { useGlobalContext } from './globalContext';

const useProductos = () => {

    const { aniadirNuevoProd, modificarProducto, productos, setProductos, productosOriginales, setProductosOriginales } = useProductosContext();
    const { maquinas, setMaquinas, maquinasOriginales, setMaquinasOriginales } = useMaquinasContext();
    const {mostrarAlerta} = useGlobalContext();

    const [ archivo, setArchivo ] = useState(null)

    // Función que adjunta un archivo cuando se hace evento change en el input
    const handleFileChange = (e) => {
        console.log(e.target.files[0])
        setArchivo(e.target.files[0]); // Guarda el archivo seleccionado

    };

    // Función que se ejecuta al enviar el formulario y carga la imagen en la api
    const handleSubmit = async (e, id_producto) => {
        e.preventDefault(); // Evita que la página se recargue

        let id_producto_buscado = "";

        let archivo1 = document.getElementById("imagen_producto");

        if (!id_producto) {
            id_producto_buscado = e.target.parentElement.firstChild.textContent;
        }

        if (!archivo1) {
            return;
        }

        const formData = new FormData();
        if (!id_producto) {
            formData.append('id_producto', id_producto_buscado);
        } else {
            formData.append('id_producto', id_producto);
        }

        formData.append('imagen', archivo1.files[0]); // Adjunta la imagen con el nombre del campo 'imagen'

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

            mostrarAlerta("Se ha subido la imagen correctamente")
        } catch (error) {
            console.error('Error:', error);
            mostrarAlerta("Error al subir la imagen", "error");
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

    // Función para borrar una imagen
    const borrarImagen = async (id_producto) => {
        const delImg = {
            imagen: null,
            tipo: null
        };

        try {
            console.log("Borrando imagen para el producto con id:", id_producto);

            const response = await fetch(`http://localhost:3000/api/productos/${id_producto}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',  // Asegúrate de enviar los datos como JSON
                },
                body: JSON.stringify(delImg), // Envía los datos con los campos null
            });

            if (!response.ok) {
                throw new Error('Error al borrar la imagen');
            }

            const data = await response.json();
            console.log('Imagen borrada con éxito:', data);

            alert("Imagen borrada con éxito!");
        } catch (error) {
            console.error("Error al borrar la imagen:", error);
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

    // Función para mostrar un modal con información del producto

    const mostrarModalInfo = (producto) => {
        const modal = document.getElementById("modalProductos");
        const modalContent = document.getElementById("modalProductosContent");

        // Limpiar el contenido del modal
        modalContent.innerHTML = ""; // Limpiar contenido previo

        // Crear el contenido del modal
        const nombre = document.createElement("h2");
        nombre.textContent = `Nombre: ${producto.nombre}`;
        nombre.className = "text-2xl font-bold mb-4";

        const descripcion = document.createElement("p");
        descripcion.textContent = `Descripcion: ${producto.descripcion}`;
        descripcion.className = "mb-4";

        const precio = document.createElement("p");
        precio.textContent = `Precio: ${producto.precio} €`;
        precio.className = "mb-4";

        const marca = document.createElement("p");
        marca.textContent = `Marca: ${producto.marca}`;
        marca.className = "mb-4";

        const stock = document.createElement("p");
        stock.textContent = `Stock: ${producto.stock} unidades`;
        stock.className = "mb-4";

        const categoria = document.createElement("p");
        categoria.textContent = `Categoria: ${producto.categoria}`;
        categoria.className = "mb-4";



        // Añadir los elementos al contenido del modal
        modalContent.appendChild(nombre);
        modalContent.appendChild(descripcion);
        modalContent.appendChild(precio);
        modalContent.appendChild(marca);
        modalContent.appendChild(stock);
        modalContent.appendChild(categoria);

        console.log("Imagen del producto: ", producto.imagen)

        if (producto.imagen) {
            cargarImagen(producto);
            const newImg = document.createElement("img");
            newImg.src = imagen;
            modalContent.appendChild(newImg)
        } else {
            const newP = document.createElement("p");
            newP.textContent = "No hay imagen disponible";
            modalContent.appendChild(newP);
        }

        // Mostrar el modal
        modal.classList.remove("hidden");

    }

    // Función para mostrar un modal con formulario de edición
    const mostrarModalEditar = (producto) => {
        const modal = document.getElementById("modalProductos");
        const modalContent = document.getElementById("modalProductosContent");

        // Limpiar contenido previo
        modalContent.innerHTML = "";

        // Crear el <form>
        const form = document.createElement("form");
        form.id = "formEditarProducto";

        // Helper para cada campo
        const makeField = (labelText, type, name, value) => {
            const wrapper = document.createElement("div");
            wrapper.className = "mb-4";

            const label = document.createElement("label");
            label.htmlFor = name;
            label.textContent = labelText;
            label.className = "block text-gray-700 font-medium mb-1";

            let input;
            if (type === "textarea") {
                input = document.createElement("textarea");
                input.rows = 3;
            } else {
                input = document.createElement("input");
                input.type = type;
            }

            if (type === "number") {
                input.step = "0.01";
            }

            input.id = name;
            input.name = name;
            input.value = value;
            input.className = `
        w-full
        bg-yellow-50
        border border-brown-300
        text-brown-800
        px-3 py-2
        rounded-md
        focus:outline-none focus:ring-2 focus:ring-green-400
      `.trim().replace(/\s+/g, ' ');

            wrapper.appendChild(label);
            wrapper.appendChild(input);
            return wrapper;
        };

        // Agregar campos
        form.appendChild(makeField("Nombre", "text", "nombre", producto.nombre));
        form.appendChild(makeField("Descripción", "textarea", "descripcion", producto.descripcion));
        form.appendChild(makeField("Precio (€)", "number", "precio", producto.precio));
        form.appendChild(makeField("Marca", "text", "marca", producto.marca));
        form.appendChild(makeField("Stock", "number", "stock", producto.stock));


        const newDiv = document.createElement("div");
        newDiv.className = "mb-4";

        const newLabel = document.createElement("label");
        newLabel.htmlFor = "categoria_producto";
        newLabel.textContent = "Categoría";
        newLabel.className = "block text-gray-700 font-medium mb-1";

        const newSelect = document.createElement("select");
        newSelect.id = "categoria_producto";
        newSelect.className = `w-full
    bg-yellow-50
    border border-brown-300
    text-brown-800
    px-3 py-2
    rounded-md
    focus:outline-none focus:ring-2 focus:ring-green-400`;

        const categorias = [
            "No asignada",
            "Café",
            "Lácteos",
            "Chocolate",
            "Capuchino",
            "Té frío",
            "Edulcorantes",
            "Accesorios"
        ];

        categorias.forEach(cat => {
            const option = document.createElement("option");
            option.value = cat === "No asignada" ? "" : cat;
            option.textContent = cat;
            if (producto.categoria === option.value) {
                option.selected = true;
            }
            newSelect.appendChild(option);
        });

        newDiv.appendChild(newLabel);
        newDiv.appendChild(newSelect);
        form.appendChild(newDiv);

        if (producto.imagen) {
            cargarImagen(producto);
            const newDiv = document.createElement("div");
            newDiv.className = "mb-4";
            const newLabel = document.createElement("label");
            newLabel.htmlFor = "imagen_producto";
            newLabel.textContent = "Imagen";
            newLabel.className = "block text-gray-700 font-medium mb-1";
            const newImg = document.createElement("img");
            newImg.src = imagen;
            const newButton = document.createElement("button");
            newButton.textContent = "Borrar imagen";
            newButton.onclick = (e) => {
                e.preventDefault();
                borrarImagen(producto.id_producto);
            }
            newDiv.appendChild(newLabel);
            newDiv.appendChild(newImg);
            newDiv.appendChild(newButton);
            form.appendChild(newDiv);
        } else {
            const newDiv = document.createElement("div");
            newDiv.className = "mb-4";
            const newLabel = document.createElement("label");
            newLabel.htmlFor = "imagen_producto";
            newLabel.textContent = "Imagen";
            newLabel.className = "block text-gray-700 font-medium mb-1";
            const newInput = document.createElement("input");
            newInput.type = "file";
            newInput.id = "imagen_producto";
            newInput.name = "imagen_producto";
            newInput.accept = "image/*"; // Aceptar solo imágenes
            newInput.onchange = handleFileChange;
            newDiv.appendChild(newLabel);
            newDiv.appendChild(newInput);
            form.appendChild(newDiv);
        }

        // Botón Modificar
        const btnWrapper = document.createElement("div");
        btnWrapper.className = "text-right";

        const btnModificar = document.createElement("button");
        btnModificar.type = "submit";
        btnModificar.textContent = "Modificar";
        btnModificar.className = `
      bg-yellow-500 hover:bg-yellow-600
      text-white font-bold
      px-4 py-2 rounded-md
      transition duration-150
    `.trim().replace(/\s+/g, ' ');

        btnWrapper.appendChild(btnModificar);
        form.appendChild(btnWrapper);

        // Manejador submit
        form.addEventListener("submit", (e) => {
            e.preventDefault();


            const actualizado = {
                ...producto,
                nombre: form.nombre.value,
                descripcion: form.descripcion.value,
                precio: form.precio.value,
                marca: form.marca.value,
                stock: form.stock.value,
                categoria: form.categoria_producto.value,
            };

            if (archivo) {
                actualizado.imagen = archivo;
            }

            handleSubmit(e, producto.id_producto);

            modificarProducto(producto.id_producto, actualizado);

            // Actualizar la fila en el DOM sin recargar la página
            actualizarFilaProducto(actualizado);

            modal.classList.add("hidden");
        });

        // Insertar form en el modal y mostrarlo
        modalContent.appendChild(form);

        modal.classList.remove("hidden");
    };

    const actualizarFilaProducto = (productoActualizado) => {
        // Encontrar la fila correspondiente al producto que fue actualizado
        const fila = document.getElementById(`producto-${productoActualizado.id_producto}`);

        if (fila) {
            // Suponiendo que la fila tiene celdas para nombre, descripción, precio, marca y stock
            if (fila) {
                // Actualizar las celdas con los nuevos valores
                fila.querySelector("td:nth-child(3)").textContent = productoActualizado.nombre;
                fila.querySelector("td:nth-child(4)").textContent = productoActualizado.descripcion;
                fila.querySelector("td:nth-child(5)").textContent = `${productoActualizado.precio} €`;
                fila.querySelector("td:nth-child(6)").textContent = productoActualizado.marca;
                fila.querySelector("td:nth-child(7)").textContent = productoActualizado.stock;

            }
        }
    }


    // Función para cerrar el modal
    const cerrarModal = () => {
        const modal = document.getElementById("modalProductos");
        modal.classList.add("hidden"); // Ocultar el modal
    }

    // Retornamos los valores que necesitamos para la implementación

    return { handleFileChange, handleSubmit, cargarImagen, imagen, nuevoProducto, crearNuevoProducto, mostrarModalInfo, mostrarModalEditar, cerrarModal };

}

export default useProductos;