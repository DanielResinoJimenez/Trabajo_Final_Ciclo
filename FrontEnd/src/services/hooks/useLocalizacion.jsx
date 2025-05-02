import { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const useLocalizacion = () => {

    const [coordenadas, setCoordenadas] = useState({ lat: null, lng: null });
    const [direccion, setDireccion] = useState('');
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState(null);

    const mapSelection = () => {
        const mapContainerRef = useRef(null);

        useEffect(() => {
            if (!mapContainerRef.current) return;

            const map = L.map(mapContainerRef.current).setView([39.9634, -4.8308], 15);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; OpenStreetMap contributors',
            }).addTo(map);

            let marker;

            map.on('click', (e) => {
                if (marker) marker.setLatLng(e.latlng);
                else marker = L.marker(e.latlng).addTo(map);

                actualizarDesdeMapa(e.latlng);
            });

            return () => map.remove();
        }, []);

        return (
            <div>
                <input
                    type="text"
                    value={direccion}
                    onChange={(e) => setDireccion(e.target.value)}
                    placeholder="Buscar o haz clic en el mapa"
                    className="w-full p-2 mb-2 border rounded"
                />
                {cargando && <p>Obteniendo dirección...</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <div ref={mapContainerRef} id="map" style={{ height: '400px', width: '100%' }}></div>
            </div>
        );
    };


    // Llamar esto cuando se hace clic en el mapa
    // Hay que rellenar los props con la latitud y longitud del mapa para que la función lo convierta en una dirección real
    const actualizarDesdeMapa = async ({ lat, lng }) => {
        setCoordenadas({ lat, lng });
        setCargando(true);
        setError(null);

        try {
            const res = await fetch(
                `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
            );
            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }
            setDireccion(data.display_name);
        } catch (err) {
            setError('No se pudo obtener la dirección');
            console.error(err);
        } finally {
            setCargando(false);
        }
    };

    return {
        coordenadas,
        direccion,
        mapSelection,
        actualizarDesdeMapa,
        cargando,
        error,
    };
};

export default useLocalizacion;