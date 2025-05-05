import React, { useEffect } from 'react'
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useMaquinasContext } from '../../../services/hooks/maquinasContext';
import { useCuentaContext } from '../../../services/hooks/cuentaContext';
import { useFiltrosContext } from '../../../services/hooks/useFiltrosContext';

// Registramos los componentes de Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const GraficoIngresosMaquinas = () => {

    const { maquinas, maquinasOriginales, getMaquinas } = useMaquinasContext();
    const { acciones } = useCuentaContext();
    const { selectedYear, selectedMonth } = useFiltrosContext();

    useEffect(() => {
        getMaquinas();
    }, [])

    if (!maquinas || !acciones) return <p>Cargando...</p>

    // Generamos las etiquetas dinámicamente basándonos en los nombres de las máquinas
    let labels = maquinas.filter(maquina => maquina.estado === "En servicio").map(maquina => maquina.nombre_establecimiento);
    let ingresos = acciones.filter((accion) => accion.id_ganancia != null);

    // Función para calcular el total de un mes dado
    const calcularTotalMes = (maquina, mes) => {
        let total = 0;
        ingresos.forEach((accion) => {

            if (accion.id_maquina == maquina.id_maquina) {
                const fecha = new Date(accion.fecha); // Creamos el objeto de fecha

                // Verificamos si la fecha de la acción está dentro del mes que estamos buscando
                if (fecha.getMonth() == mes && fecha.getFullYear() == selectedYear.getFullYear()) {
                    total += parseFloat(accion.monto); // Sumamos el monto de la acción
                }
            }

        });
        return total;
    }

    // Definimos los datos para cada máquina
    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Dinero Generado por Mes',
                data: maquinas.map(maquina => calcularTotalMes(maquina, selectedMonth)), // Dinero generado por cada máquina
                backgroundColor: 'rgba(54, 162, 235, 0.6)', // Color de las barras
                borderColor: 'rgba(54, 162, 235, 1)', // Borde de las barras
                borderWidth: 1,
            },
        ],
    };

    // Opciones de personalización
    const options = {
        indexAxis: 'y', // ← Esto invierte los ejes para que las barras sean horizontales
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Dinero Generado por Cada Máquina',
            },
        },
        scales: {
            x: {
                beginAtZero: true, // El eje X ahora muestra el dinero
                title: {
                    display: true,
                    text: '€ Generados',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Máquinas',
                },
            },
        },
    };


    return (
        <div>
            <h2>Gráfico de Dinero Generado por Máquina</h2>
            <Bar data={data} options={options} />
        </div>
    );
}

export default GraficoIngresosMaquinas