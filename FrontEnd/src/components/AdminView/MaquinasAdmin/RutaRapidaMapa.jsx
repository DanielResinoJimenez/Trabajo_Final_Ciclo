import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import useLocalizacion from '../../../services/hooks/useLocalizacion';

const RutaRapidaMapa = ({ maquinasSeleccionadas }) => {
    const [coordenadas, setCoordenadas] = useState([]);
    const [ruta, setRuta] = useState(null);
    const { geocodeDireccion } = useLocalizacion();

    useEffect(() => {
        const obtenerCoordenadas = async () => {
            const resultados = await Promise.all(
                maquinasSeleccionadas.map((m) => geocodeDireccion(m.direccion_establecimiento))
            );
            const limpias = resultados.filter(coord => coord !== null);
            setCoordenadas(limpias);

            if (limpias.length > 1) {
                const puntos = limpias.map(c => `${c.lng},${c.lat}`).join(';');
                const response = await fetch(`https://router.project-osrm.org/route/v1/driving/${puntos}?overview=full&geometries=geojson`);
                const data = await response.json();
                if (data.routes && data.routes[0]) {
                    setRuta(data.routes[0].geometry.coordinates.map(([lon, lat]) => [lat, lon]));
                }
            }
        };

        if (maquinasSeleccionadas.length > 0) {
            obtenerCoordenadas();
        }
    }, [maquinasSeleccionadas]);

    if (coordenadas.length === 0) return <p>Cargando mapa...</p>;

    return (
        <MapContainer
            center={coordenadas[0]}
            zoom={13}
            scrollWheelZoom={true}
            style={{ height: '500px', width: '100%' }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {coordenadas.map((pos, idx) => (
                <Marker position={pos} key={idx} />
            ))}
            {ruta && (
                <Polyline positions={ruta} color="blue" />
            )}
        </MapContainer>
    );
}

export default RutaRapidaMapa