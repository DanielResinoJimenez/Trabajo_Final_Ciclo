import { createContext, useContext, useState } from 'react';
import { useGlobalContext } from './globalContext';
import Swal from "sweetalert2";


const MaquinasContext = createContext();

export const useMaquinasContext = () => useContext(MaquinasContext);

export const MaquinasProvider = ({ children }) => {
    // Estados
    const [maquinasOriginales, setMaquinasOriginales] = useState(null);
    const [maquinas, setMaquinas] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Estados para filtrar
    const [estado, setEstado] = useState('');

    const { mostrarAlerta } = useGlobalContext();

    const getMaquinas = async () => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:3000/api/maquinas');
            const data = await response.json();
            setMaquinasOriginales(data);
            setMaquinas(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
            Swal.close(); // Cierra el loading 
        }
    }

    const getMaquinasStock = async () => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:3000/api/maquinas/stock');
            const data = await response.json();
            setMaquinas(data);
            setMaquinasOriginales(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
            Swal.close(); // Cierra el loading 
        }
    }

    const getMaquinaByMarca = async (marca) => {
        try {
            setLoading(true);
            const response = await fetch(`http://localhost:3000/api/maquinas/${marca}`);
            const data = await response.json();
            setMaquinas(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
            Swal.close(); // Cierra el loading 
        }
    }

    const gestionarSolicitud = async (solicitud) => {
        try {
            const responseComprobar = await fetch('http://localhost:3000/api/solicitudes/existente', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(solicitud)
            });

            const dataComprobar = await responseComprobar.json();

            if (Array.isArray(dataComprobar) && dataComprobar.length === 0) {
                // No existe solicitud, la creamos
                const responseCrear = await fetch('http://localhost:3000/api/solicitudes', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(solicitud)
                });

                const dataCrear = await responseCrear.json();
                Swal.fire({
                    icon: 'success',
                    title: 'Mensaje enviado',
                    text: 'Solicitud enviada correctamente. Nos pondremos en contacto contigo pronto.',
                    confirmButtonColor: '#4a2d1f'
                  });
                return dataCrear;
            } else {
                mostrarAlerta("Ya existe una solicitud similar, no se puede crear otra.", "error")
                return dataComprobar;
            }
        } catch (error) {
            console.error('Error al gestionar la solicitud:', error);
            throw error;
        }
    };

    const aniadirNuevaMaquina = async (maquina) => {
        try {
            const response = await fetch('http://localhost:3000/api/maquinas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(maquina),
            });

            if (!response.ok) {
                throw new Error('Error al añadir el maquina');
            }

            const data = await response.json();
            console.log('maquina añadido con éxito:', data);

            // Actualiza estado:
            setMaquinas(prev => [...prev, data]);
            setMaquinasOriginales(prev => [...prev, data]);
            mostrarAlerta("Se ha creado la máquina correctamente", "success")

        } catch (error) {
            console.error('Error:', error);
        }
    }

    const modificarMaquina = async (id_maquina, maquinaNueva) => {
        try {
            const response = await fetch(`http://localhost:3000/api/maquinas/${id_maquina}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(maquinaNueva)
            });
            if (!response.ok) {
                throw new Error('Error al modificar la máquina');
            }
            const data = await response.json();
            setMaquinas(maquinas.map(maquina => (maquina.id_maquina === id_maquina ? maquinaNueva : maquina)));
            setMaquinasOriginales(maquinasOriginales.map(maquina => (maquina.id_maquina === id_maquina ? maquinaNueva : maquina)));
            mostrarAlerta("Se ha modificado la máquina correctamente", "success")
            getMaquinas();
            return data;
        } catch (error) {
            console.error('Error al modificar la máquina:', error);
            throw error;
        }
    }

    const borrarMaquina = async (id_maquina) => {
        try {
            const response = await fetch(`http://localhost:3000/api/maquinas/${id_maquina}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Error al borrar la máquina');
            }
            const data = await response.json();
            setMaquinas(maquinas.filter(maquina => maquina.id_maquina !== id_maquina));
            setMaquinasOriginales(maquinasOriginales.filter(maquina => maquina.id_maquina !== id_maquina));
            mostrarAlerta("Se ha borrado la máquina correctamente", "success")
            return data;
        } catch (error) {
            console.error('Error al borrar la máquina:', error);
            throw error;
        }
    }

    return (
        <MaquinasContext.Provider value={{ maquinasOriginales, maquinas, setMaquinas, loading, error, getMaquinas, getMaquinasStock, getMaquinaByMarca, gestionarSolicitud, estado, setEstado, aniadirNuevaMaquina, modificarMaquina, borrarMaquina }}>
            {children}
        </MaquinasContext.Provider>
    );
}