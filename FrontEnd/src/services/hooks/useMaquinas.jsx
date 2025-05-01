import React, { useEffect, useState } from 'react'
import { useMaquinasContext } from './maquinasContext';

const useMaquinas = () => {

  const [price, setPrice] = useState(0);
  const [nombre, setNombre] = useState('');
  const [marca, setMarca] = useState('');
  const [archivo, setArchivo] = useState(null);
  const [imagen, setImagen] = useState(null);
  const { maquinasOriginales, setMaquinas, gestionarSolicitud, modificarMaquina } = useMaquinasContext();

  // FUNCIONES PARA ADMINISTRAR LAS IMAGENES DE LAS MÁQUINAS

  // Función que adjunta un archivo cuando se hace evento change en el input
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log("Archivo seleccionado:", file);
    setArchivo(file);
  };

  // Función para subir la imagen a la bd
  const handleSubmit = async (e, id_maquina) => {
    e.preventDefault();

    const fileInput = e.target.querySelector('#imagen_maquina'); // Asegúrate de que el input tiene este ID
    const file = fileInput?.files?.[0];

    if (!file) {
      alert("No se ha seleccionado un archivo.");
      return;
    }

    const formData = new FormData();
    formData.append('id_maquina', id_maquina || e.target.parentElement.firstChild.textContent);
    formData.append('imagen', file);

    try {
      const response = await fetch('http://localhost:3000/api/maquinas/create', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Error al subir la imagen');
      }

      const data = await response.json();
      console.log('Imagen subida con éxito:', data);
    } catch (error) {
      console.error('Error:', error);
      alert("Hubo un error al subir la imagen");
    }
  }

  // Función para cargar las imágenes desde la API
  const cargarImagen = (maquina) => {
    try {
      const buffer = new Uint8Array(maquina.imagen.data); // Convertir Buffer a Uint8Array
      const blob = new Blob([buffer], { type: maquina.tipo }); // Crear un Blob
      const imageUrl = URL.createObjectURL(blob); // Generar URL del Blob
      setImagen(imageUrl); // Actualizar estado con las URLs generadas
    } catch (error) {
      console.error("Error al cargar la imagen:", error);
    }
  };

  // Función para borrar una imagen
  const borrarImagen = async (id_maquina) => {
    const delImg = {
      imagen: null,
      tipo: null
    };

    try {
      console.log("Borrando imagen para el producto con id:", id_maquina);

      const response = await fetch(`http://localhost:3000/api/maquinas/${id_maquina}`, {
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

  // FUNCIONES DE FILTRADO DE MÁQUINAS

  const filterByPrice = (e) => {
    const value = e.target.value;
    setPrice(value);
    const filtered = maquinasOriginales.filter(maquina =>
      maquina.precio <= value &&
      maquina.nombre.toLowerCase().includes(nombre.toLowerCase()) &&
      (marca ? maquina.marca.toLowerCase() === marca.toLowerCase() : true)
    );
    setMaquinas(filtered);
  };

  const filterByNombre = (e) => {
    const value = e.target.value;
    setNombre(value);
    const filtered = maquinasOriginales.filter(maquina =>
      maquina.nombre.toLowerCase().includes(value.toLowerCase()) &&
      maquina.precio <= price &&
      (marca ? maquina.marca.toLowerCase() === marca.toLowerCase() : true)
    );
    setMaquinas(filtered);
  };

  const filterByMarca = (e) => {
    const value = e.target.value;
    setMarca(value);
    const filtered = maquinasOriginales.filter(maquina =>
      (value ? maquina.marca.toLowerCase() === value.toLowerCase() : true) &&
      maquina.precio <= price &&
      maquina.nombre.toLowerCase().includes(nombre.toLowerCase())
    );
    setMaquinas(filtered);
  };

  // FUNCIONES PARA MANEJAR LOS MODALES DE LAS MÁQUINAS

  // Función para mostrar un modal con formulario de edición
  const openModalSolicitud = (id) => {
    const modal = document.getElementById("modalSolicitud");
    const modalContent = document.getElementById("modalSolicitudContent");
    const id_maquina = id;
    const id_usuario = JSON.parse(localStorage.getItem('user')).id;

    // Limpiar contenido previo
    modalContent.innerHTML = "";

    // Crear el <form>
    const form = document.createElement("form");
    form.id = "formSolicitud";

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
      input.value = "";
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
    form.appendChild(makeField("Nombre", "text", "nombre"));
    form.appendChild(makeField("Dirección", "text", "direccion"));
    form.appendChild(makeField("Teléfono", "number", "telefono"));

    // Botón Enviar Solicitud
    const btnWrapper = document.createElement("div");
    btnWrapper.className = "text-right";

    const btnEnviarSolicitud = document.createElement("button");
    btnEnviarSolicitud.type = "submit";
    btnEnviarSolicitud.textContent = "Enviar Solicitud";
    btnEnviarSolicitud.className = `
    bg-yellow-500 hover:bg-yellow-600
    text-white font-bold
    px-4 py-2 rounded-md
    transition duration-150
  `.trim().replace(/\s+/g, ' ');

    btnWrapper.appendChild(btnEnviarSolicitud);
    form.appendChild(btnWrapper);

    // Manejador submit
    form.addEventListener("submit", (e) => {
      e.preventDefault();


      const nuevaSolicitud = {
        id_maquina: id_maquina,
        id_usuario: id_usuario,
        nombre_solicitante: form.nombre.value,
        direccion_establecimiento: form.direccion.value,
        fecha_solicitud: new Date(),
        telefono_solicitante: form.telefono.value,
        estado: "pendiente"
      };

      gestionarSolicitud(nuevaSolicitud);

      modal.classList.add("hidden");
    });

    // Insertar form en el modal y mostrarlo
    modalContent.appendChild(form);

    modal.classList.remove("hidden");
  };

  const openModalModificar = (maquina) => {
    setArchivo(null);
    const modal = document.getElementById("modalMaquinas");
    const modalContent = document.getElementById("modalMaquinasContent");

    // Limpiar contenido previo
    modalContent.innerHTML = "";

    // Crear el <form>
    const form = document.createElement("form");
    form.id = "formEditarMaquina";

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
    form.appendChild(makeField("Nombre", "text", "nombre", maquina.nombre));
    form.appendChild(makeField("Descripción", "textarea", "descripcion", maquina.descripcion));
    form.appendChild(makeField("Precio (€)", "number", "precio", maquina.precio));


    // Agregar select con marcas de maquinas
    const newDiv = document.createElement("div");
    newDiv.className = "mb-4";

    const newLabel = document.createElement("label");
    newLabel.htmlFor = "marca_maquina";
    newLabel.textContent = "Marca";
    newLabel.className = "block text-gray-700 font-medium mb-1";

    const newSelect = document.createElement("select");
    newSelect.id = "marca_maquina";
    newSelect.className = `w-full
    bg-yellow-50
    border border-brown-300
    text-brown-800
    px-3 py-2
    rounded-md
    focus:outline-none focus:ring-2 focus:ring-green-400`;

    const marcas = [
      "Saeco",
      "Nescafé",
      "Colibrí",
    ];

    marcas.forEach(cat => {
      const option = document.createElement("option");
      option.value = cat === "No asignada" ? "" : cat;
      option.textContent = cat;
      if (maquina.marca === option.value) {
        option.selected = true;
      }
      newSelect.appendChild(option);
    });

    newDiv.appendChild(newLabel);
    newDiv.appendChild(newSelect);
    form.appendChild(newDiv);


    // Agregar select con estados de la máquina
    const newDiv2 = document.createElement("div");
    newDiv2.className = "mb-4";

    const newLabel2 = document.createElement("label");
    newLabel2.htmlFor = "estado_maquina";
    newLabel2.textContent = "Marca";
    newLabel2.className = "block text-gray-700 font-medium mb-1";

    const newSelect2 = document.createElement("select");
    newSelect2.id = "estado_maquina";
    newSelect2.className = `w-full
    bg-yellow-50
    border border-brown-300
    text-brown-800
    px-3 py-2
    rounded-md
    focus:outline-none focus:ring-2 focus:ring-green-400`;

    const estados = [
      "En stock",
      "En mantenimiento",
    ];

    estados.forEach(cat => {
      const option = document.createElement("option");
      option.value = cat === "No asignada" ? "" : cat;
      option.textContent = cat;
      if (maquina.estado === option.value) {
        option.selected = true;
      }
      newSelect2.appendChild(option);
    });

    newDiv2.appendChild(newLabel2);
    newDiv2.appendChild(newSelect2);
    form.appendChild(newDiv2);

    if (maquina.imagen) {
      cargarImagen(maquina);
      const newDiv = document.createElement("div");
      newDiv.className = "mb-4";
      const newLabel = document.createElement("label");
      newLabel.htmlFor = "imagen_maquina";
      newLabel.textContent = "Imagen";
      newLabel.className = "block text-gray-700 font-medium mb-1";
      const newImg = document.createElement("img");
      newImg.src = imagen;
      const newButton = document.createElement("button");
      newButton.textContent = "Borrar imagen";
      newButton.onclick = (e) => {
        e.preventDefault();
        borrarImagen(maquina.id_maquina);
      }
      newDiv.appendChild(newLabel);
      newDiv.appendChild(newImg);
      newDiv.appendChild(newButton);
      form.appendChild(newDiv);
    } else {
      const newDiv = document.createElement("div");
      newDiv.className = "mb-4";
      const newLabel = document.createElement("label");
      newLabel.htmlFor = "imagen_maquina";
      newLabel.textContent = "Imagen";
      newLabel.className = "block text-gray-700 font-medium mb-1";
      const newInput = document.createElement("input");
      newInput.type = "file";
      newInput.id = "imagen_maquina";
      newInput.name = "imagen_maquina";
      newInput.accept = "image/*"; // Aceptar solo imágenes
      newInput.onchange = (e) => {
        e.preventDefault();
        handleFileChange(e);
      }
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

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const actualizado = {
        ...maquina,
        nombre: form.nombre.value,
        descripcion: form.descripcion.value,
        precio: form.precio.value,
        marca: form.marca_maquina.value,
        estado: form.estado_maquina.value,
      };

      handleSubmit(e, maquina.id_maquina)

      modificarMaquina(maquina.id_maquina, actualizado);
      modal.classList.add("hidden");
    });


    // Insertar form en el modal y mostrarlo
    modalContent.appendChild(form);

    modal.classList.remove("hidden");
  }

  // Función para cerrar el modal
  const cerrarModal = (id) => {
    const modal = document.getElementById(id);
    modal.classList.add("hidden"); // Ocultar el modal
  }

  return { filterByMarca, filterByNombre, filterByPrice, price, openModalSolicitud, openModalModificar, cerrarModal }

}

export default useMaquinas