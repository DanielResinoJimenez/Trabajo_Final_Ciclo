import { createContext, useContext, useEffect, useState } from 'react';

const CuentaContext = createContext();

export const useCuentaContext = () => useContext(CuentaContext);

export const CuentaProvider = ({ children }) => {

    const [empresa, setEmpresa] = useState(null);  // Inicialmente null
    const [cuentas, setCuentas] = useState(null);  // Inicialmente null
    const [acciones, setAcciones] = useState([]);
    const [loading, setLoading] = useState(true);  // Mostrar loading hasta que todo esté cargado
    const [error, setError] = useState(null);

    const getEmpresa = async () => {
        setLoading(true);
        const email = JSON.parse(localStorage.getItem('user')).email;
        try {
            const response = await fetch('http://localhost:3000/api/empresas/' + email);
            if (!response.ok) {
                throw new Error('Error fetching empresa');
            }
            const data = await response.json();
            setEmpresa(data);
            await getCuentas(data.id_empresa);
        } catch (error) {
            setError(error);
        }
    }

    const getCuentas = async (id) => {
        try {
            const response = await fetch('http://localhost:3000/api/cuenta/' + id);
            if (!response.ok) {
                throw new Error('Error fetching cuentas');
            }
            const data = await response.json();
            setCuentas(data);
            await getDatos(data.id_cuenta);
        } catch (error) {
            setError(error);
        }
    }

    const getDatos = async (id) => {
        setLoading(true);
        try {
            const [gananciasRes, perdidasRes] = await Promise.all([
                fetch('http://localhost:3000/api/ganancias/' + id),
                fetch('http://localhost:3000/api/perdidas/' + id)
            ]);

            if (!gananciasRes.ok || !perdidasRes.ok) {
                throw new Error('Error fetching datos');
            }

            const ganancias = await gananciasRes.json();
            const perdidas = await perdidasRes.json();

            console.log('Ganancias:', ganancias);  // Verifica las ganancias
            console.log('Pérdidas:', perdidas);    // Verifica las pérdidas

            // Si ganancias no es un array, lo convertimos en un array
            const gananciasArray = Array.isArray(ganancias) ? ganancias : [ganancias];
            const perdidasArray = Array.isArray(perdidas) ? perdidas : [perdidas];

            // Ahora podemos combinar y ordenar como antes
            const accionesCombinadas = [...gananciasArray, ...perdidasArray].sort(
                (a, b) => new Date(b.fecha) - new Date(a.fecha)
            );

            console.log('Acciones Combinadas:', accionesCombinadas);  // Verifica las acciones combinadas

            setAcciones(accionesCombinadas);  // Guarda las acciones combinadas

        } catch (error) {
            console.error('Error en getDatos:', error);  // Verifica si hay algún error
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    // UseEffect para ejecutar la función `getEmpresa` al montar el componente
    useEffect(() => {
        getEmpresa();
    }, []);

    const modifyDatos = async (id, nuevosValores, tipo) => {
        try {
            // Hacer la solicitud PUT al servidor con los nuevos valores
            const response = await fetch(`http://localhost:3000/api/${tipo === 'Ingreso' ? 'ganancias' : 'perdidas'}/${id}`, {
                method: 'PUT', // Utilizamos PUT para actualizar los datos
                headers: {
                    'Content-Type': 'application/json', // Indicamos que los datos son en formato JSON
                },
                body: JSON.stringify(nuevosValores), // Enviamos los nuevos valores como JSON
            });
    
            // Verificar si la solicitud fue exitosa
            if (!response.ok) {
                throw new Error('Error al actualizar los datos');
            }
    
            // Si la actualización fue exitosa, podemos manejar la respuesta si es necesario
            const data = await response.json();
            console.log('Datos actualizados correctamente:', data);
    
        } catch (error) {
            console.error('Error al modificar los datos:', error);
        }
    };
    

    // Añadir un nuevo accion

    const aniadirNuevaAccion = async (accion, tipo) => {
        try {
            const response = await fetch(`http://localhost:3000/api/${tipo == 'ganancia' ? 'ganancias' : 'perdidas'}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(accion),
            });

            if (!response.ok) {
                throw new Error('Error al añadir la accion');
            }

            const data = await response.json();
            console.log('Accion añadida con éxito:', data);

            // Actualiza estado:
            setAcciones(prev => [...prev, data]);
            

        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <CuentaContext.Provider value={{ getEmpresa, getCuentas, getDatos, acciones, empresa, cuentas, loading, aniadirNuevaAccion, modifyDatos }}>
            {children}
        </CuentaContext.Provider>
    );
}

