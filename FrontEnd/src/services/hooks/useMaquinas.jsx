import React, { useState } from 'react'
import { useMaquinasContext } from './maquinasContext';

const useMaquinas = () => {
  
    const [price, setPrice] = useState(0);
    const [nombre, setNombre] = useState('');
    const [marca, setMarca] = useState('');
    const { maquinasOriginales, setMaquinas, gestionarSolicitud } = useMaquinasContext();

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

  // Función para cerrar el modal
  const cerrarModal = () => {
    const modal = document.getElementById("modalSolicitud");
    modal.classList.add("hidden"); // Ocultar el modal
}

      return {filterByMarca, filterByNombre, filterByPrice, price, openModalSolicitud, cerrarModal}

}

export default useMaquinas