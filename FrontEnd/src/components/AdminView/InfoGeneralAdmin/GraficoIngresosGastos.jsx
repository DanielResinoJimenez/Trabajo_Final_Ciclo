import React, { useEffect } from 'react'
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useCuentaContext } from '../../../services/hooks/cuentaContext';


// Registramos los componentes de Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const GraficoIngresosGastos = () => {

    // Recogemos las acciones de la cuenta
    const { acciones } = useCuentaContext();

    let ingresos = acciones.filter((accion) => accion.id_ganancia != null);
    let gastos = acciones.filter((accion) => accion.id_perdida != null);

    useEffect(() => {
        ingresos = acciones.filter((accion) => accion.id_ganancia != null);
        gastos = acciones.filter((accion) => accion.id_perdida != null);
    }, [acciones])

    // Función para calcular el total de un mes dado
    const calcularTotalMes = (tipoAcciones, mes) => {
        let total = 0;
        tipoAcciones.forEach((accion) => {
            const fecha = new Date(accion.fecha); // Creamos el objeto de fecha

            // Verificamos si la fecha de la acción está dentro del mes que estamos buscando
            if (fecha.getMonth() === mes) {
                console.log(accion)
                total += parseFloat(accion.monto); // Sumamos el monto de la acción
            }
        });
        return total;
    }

    // Aquí definimos los datos que vamos a mostrar en el gráfico
    const data = {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'], // Los meses del año
        datasets: [
            {
                label: 'Dinero Generado',
                data: [calcularTotalMes(ingresos, 0), calcularTotalMes(ingresos, 1), calcularTotalMes(ingresos, 2), calcularTotalMes(ingresos, 3), calcularTotalMes(ingresos, 4), calcularTotalMes(ingresos, 5)],
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
            {
                label: 'Dinero Perdido',
                data: [calcularTotalMes(gastos, 1), calcularTotalMes(gastos, 2), calcularTotalMes(gastos, 3), calcularTotalMes(gastos, 4), calcularTotalMes(gastos, 5), calcularTotalMes(gastos, 6)],
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            }
        ],
    };

    // Opciones de personalización del gráfico
    const options = {
        responsive: true, // Hace que el gráfico sea responsive
        plugins: {
            title: {
                display: true,
                text: 'Dinero Generado y Perdido Mensualmente',
            },
            tooltip: {
                mode: 'index',
                intersect: false,
            },
        },
        scales: {
            y: {
                beginAtZero: true, // El gráfico empieza en cero
            },
        },
    };

    return (
        <div>
            <h2>Gráfico de Dinero Generado y Perdido</h2>
            <Bar data={data} options={options} />
        </div>
    );
}

export default GraficoIngresosGastos