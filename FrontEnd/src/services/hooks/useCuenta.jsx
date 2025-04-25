import React from 'react'
import { useCuentaContext } from './cuentaContext';

const useCuenta = () => {

    const {cuentas, aniadirNuevaAccion} = useCuentaContext();
  
    const turnToModify = (e) => {
        const fila = e.target.parentElement.parentElement;
        console.log(fila)
        
    }

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
            alert("Por favor, completa todos los campos.");
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

    return { turnToModify, nuevaAccion };

}

export default useCuenta