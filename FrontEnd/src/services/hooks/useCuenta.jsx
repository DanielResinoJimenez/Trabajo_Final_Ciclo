import React from 'react'
import { useCuentaContext } from './cuentaContext';
import { useGlobalContext } from './globalContext';

const useCuenta = () => {

    const { cuentas, aniadirNuevaAccion, modifyDatos, deleteAccion } = useCuentaContext();
    const {mostrarAlerta} = useGlobalContext();

     window.turnToModify = function(e) {
        const fila = e.target.closest('tr');
        const celdas = fila.querySelectorAll('td');
        let tipo = "";

        // Marcar visualmente la fila que se está editando
        fila.style.backgroundColor = '#f0f8ff';

        celdas.forEach((celda, index) => {
            // Evitar modificar ID (index 0) y columna de acciones (última)
            if (index === 0 || index === celdas.length - 1) return;

            if (index === 1) tipo = celda.textContent; // Guardamos el tipo (Ingreso/Perdida)

            const valorOriginal = celda.textContent.trim();
            let nuevoElemento;

            if (index === 2 && !isNaN(Date.parse(valorOriginal))) {
                // Input de tipo fecha
                nuevoElemento = document.createElement('input');
                nuevoElemento.type = 'date';
                nuevoElemento.value = new Date(valorOriginal).toISOString().split('T')[0];
            } else if (index === 3) {
                // Motivo como input de texto
                nuevoElemento = document.createElement('input');
                nuevoElemento.type = 'text';
                nuevoElemento.value = valorOriginal;
                nuevoElemento.id = "motivo";
            } else if (index === 4) {
                // Monto como input de numero
                nuevoElemento = document.createElement('input');
                nuevoElemento.type = 'number';
                nuevoElemento.value = parseFloat(valorOriginal.replace('€', '').trim()); // Convertir a número, sin el símbolo €
                nuevoElemento.id = "monto";
            } else {
                return;
            }

            // Estilos para el input/select
            nuevoElemento.style.padding = '4px 6px';
            nuevoElemento.style.border = '1px solid #007bff';
            nuevoElemento.style.borderRadius = '4px';
            nuevoElemento.style.backgroundColor = '#fff';
            nuevoElemento.style.width = '100%';

            celda.textContent = '';
            celda.appendChild(nuevoElemento);
        });

        // Última celda para el botón de guardar
        const ultimaCelda = celdas[celdas.length - 1];

        if (!ultimaCelda.querySelector('.btn-guardar')) {
            const botonGuardar = document.createElement('button');
            botonGuardar.textContent = 'Guardar';
            botonGuardar.className = 'btn-guardar';
            botonGuardar.style.backgroundColor = '#28a745';
            botonGuardar.style.color = '#fff';
            botonGuardar.style.border = 'none';
            botonGuardar.style.borderRadius = '4px';
            botonGuardar.style.padding = '6px 10px';
            botonGuardar.style.cursor = 'pointer';
            botonGuardar.style.transition = '0.3s';

            botonGuardar.addEventListener('mouseenter', () => {
                botonGuardar.style.backgroundColor = '#218838';
            });
            botonGuardar.addEventListener('mouseleave', () => {
                botonGuardar.style.backgroundColor = '#28a745';
            });

            botonGuardar.addEventListener('click', () => {
                const valores = {};  // Objeto donde almacenaremos los nuevos valores

                celdas.forEach((celda, index) => {
                    // Evitar modificar ID (index 0) y columna de acciones (última)
                    if (index === 0 || index === celdas.length - 1) return;

                    // Obtener el input dentro de la celda (si existe)
                    const input = celda.querySelector('input, select');

                    // Si hay un input, almacenamos su valor en el objeto
                    if (input) {
                        if (input.type === 'date') {
                            // Si es un input de tipo fecha (Fecha)
                            valores['fecha'] = input.value;
                        } else if (input.type === 'text') {
                            // Si es un input de texto (Motivo)
                            valores['motivo'] = input.value;
                        } else if (input.type === 'number') {
                            // Si es un input de número (Monto)
                            valores['monto'] = input.value;
                        }
                    }
                });

                // Obtener el id de la acción de la primera columna (ID de la acción)
                const id_accion = celdas[0].textContent.trim();
                console.log('Guardando cambios para ID:', id_accion);
                console.log('Nuevos valores:', valores);

                // Llamamos a la función modifyDatos pasando el ID, los nuevos valores y el tipo de acción
                modifyDatos(id_accion, valores, tipo);

                // Una vez que los datos se han guardado, actualizamos la fila visualmente
                celdas.forEach((celda, index) => {
                    // Evitar modificar ID (index 0) y columna de acciones (última)
                    if (index === 0 || index === celdas.length - 1) return;

                    const input = celda.querySelector('input, select');
                    if (input) {
                        // Actualizar el texto de la celda con el nuevo valor
                        if(input.type != "number"){
                            celda.textContent = input.value;
                        }else{
                            celda.textContent = input.value + " €";
                        }
                        
                    }
                });

                ultimaCelda.innerHTML = `
    <i class="fa-solid fa-pen-to-square text-yellow-500 text-xl cursor-pointer w-6 h-6 flex items-center justify-center transition-transform hover:scale-125"></i>
    <i onClick="eliminarAccion(${id_accion})" class="fa-solid fa-trash text-red-500 text-xl cursor-pointer w-6 h-6 flex items-center justify-center transition-transform hover:scale-125"></i>
`;

                const editarIcono = ultimaCelda.querySelector('.fa-pen-to-square');
                editarIcono.addEventListener('click', (e) => turnToModify(e));

                // Revertir el fondo visual de la fila
                fila.style.backgroundColor = ''; // Quitar el color de fondo
            });

            ultimaCelda.textContent = '';
            ultimaCelda.appendChild(botonGuardar);
        }
    };

    // Función para abrir una nueva fila y que se pueda insertar un nuevo acción en administración

    const nuevaAccion = () => {
        console.log("Nueva Accion");

        // Referencias
        const filaBoton = document.getElementById("fila-boton");

        // Creo el <tr> con su estilo
        const newTr = document.createElement("tr");
        newTr.className = "bg-yellow-50 hover:bg-yellow-100 text-brown-900";

        // 1. Celda “Nuevo acción"
        const newTd1 = document.createElement("td");
        const newSelect = document.createElement("select");
        newSelect.id = "tipo_accion"
        const newOpt = document.createElement("option");
        newOpt.textContent = "-"
        newOpt.value = "";
        const newOpt1 = document.createElement("option");
        newOpt1.textContent = "Ingreso";
        newOpt1.value = "ganancia";
        const newOpt2 = document.createElement("option");
        newOpt2.textContent = "Gasto";
        newOpt2.value = "perdida";
        newTd1.className = "px-4 py-2 border-b border-brown-800";
        newSelect.appendChild(newOpt);
        newSelect.appendChild(newOpt1);
        newSelect.appendChild(newOpt2);
        newTd1.appendChild(newSelect);
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

        newTr.appendChild(makeTdWithInput("date", "Fecha", "fecha_accion"));
        newTr.appendChild(makeTdWithInput("text", "Motivo", "motivo_accion"));
        newTr.appendChild(makeTdWithInput("number", "Monto", "monto_accion"));




        // Botón “Añadir acción"
        const newTd7 = document.createElement("td");
        newTd7.className = "px-4 py-2 border-b border-brown-800 text-center";
        const button = document.createElement("button");
        button.textContent = "Añadir acción";
        button.className = `
          bg-green-500 hover:bg-green-600
          text-white
          px-4 py-2
          rounded-lg
          transition
          duration-150
        `.trim().replace(/\s+/g, ' ');
        button.onclick = () => {
            crearNuevaAccion();
        }
        newTd7.appendChild(button);
        newTr.appendChild(newTd7);

        // Inserto antes de la fila del botón
        const parent = filaBoton.parentNode;

        parent.insertBefore(newTr, filaBoton)
    };

    const crearNuevaAccion = () => {
        const tipo_accion = document.getElementById("tipo_accion").value;
        const fecha_accion = document.getElementById("fecha_accion").value;
        const motivo_accion = document.getElementById("motivo_accion").value;
        const monto_accion = document.getElementById("monto_accion").value;

        // Validar que los campos no estén vacíos
        if (!tipo_accion || !fecha_accion || !motivo_accion || !monto_accion) {
            mostrarAlerta("Todos los campos son obligatorios", "error");
            return;
        }

        // Crear el nuevo acción
        const nuevaAccion = {
            id_cuenta: cuentas.id_cuenta,
            motivo: motivo_accion,
            monto: monto_accion,
            fecha: fecha_accion,
        };

        // Llamar a la función para añadir el nuevo acción
        aniadirNuevaAccion(nuevaAccion, tipo_accion);

        // Borrar la fila de añadir un nuevo acción

        const filaBoton = document.getElementById("fila-boton");

        const deleteRow = filaBoton.previousElementSibling;
        deleteRow.remove();

    }

    // Función para eliminar una acción

    const eliminarAccion = (accion) => {
        deleteAccion(accion);
    }

    return { turnToModify, nuevaAccion, eliminarAccion };

}

export default useCuenta