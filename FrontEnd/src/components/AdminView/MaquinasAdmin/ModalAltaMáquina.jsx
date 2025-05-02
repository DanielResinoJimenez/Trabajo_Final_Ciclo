import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const ModalAltaMaquina = ({ maquina, onClose, modificarMaquina }) => {
    const [nombreEstablecimiento, setNombreEstablecimiento] = useState("");
    const [direccion, setDireccion] = useState("");
    const [latlng, setLatlng] = useState(null);

    const mapContainerRef = useRef(null);
    const mapInstance = useRef(null);
    const markerRef = useRef(null);

    const getDireccionDesdeCoords = async (lat, lng) => {
        try {
            const res = await fetch(
                `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
            );
            const data = await res.json();
            return data.display_name || "";
        } catch (e) {
            console.error("Error obteniendo dirección", e);
            return "";
        }
    };

    // const buscarDireccion = async (query) => {
    //     try {
    //         const res = await fetch(
    //             `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1`
    //         );
    //         const data = await res.json();
    //         if (data && data.length > 0) {
    //             const { lat, lon } = data[0];
    //             const coords = { lat: parseFloat(lat), lng: parseFloat(lon) };
    //             setLatlng(coords);
    //             setDireccion(data[0].display_name);

    //             if (mapInstance.current) {
    //                 mapInstance.current.setView(coords, 16);
    //                 if (markerRef.current) {
    //                     markerRef.current.setLatLng(coords);
    //                 } else {
    //                     markerRef.current = L.marker(coords).addTo(mapInstance.current);
    //                 }
    //             }
    //         }
    //     } catch (e) {
    //         console.error("Error buscando dirección", e);
    //     }
    // };

    useEffect(() => {
        if (!mapContainerRef.current || mapInstance.current) return;

        const map = L.map(mapContainerRef.current).setView([39.9634, -4.8308], 15); // Talavera de la Reina
        mapInstance.current = map;

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: "&copy; OpenStreetMap contributors",
        }).addTo(map);

        map.on("click", async (e) => {
            const { lat, lng } = e.latlng;
            setLatlng({ lat, lng });

            if (markerRef.current) {
                markerRef.current.setLatLng(e.latlng);
            } else {
                markerRef.current = L.marker(e.latlng).addTo(map);
            }

            const direccionObtenida = await getDireccionDesdeCoords(lat, lng);
            setDireccion(direccionObtenida);
        });

        return () => {
            map.remove();
            mapInstance.current = null;
        };
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const actualizado = {
            nombre: maquina.nombre,
            nombre_establecimiento: nombreEstablecimiento,
            direccion_establecimiento: direccion,
            estado: "En servicio",
            reposicion: "N",
        };

        modificarMaquina(maquina.id_maquina, actualizado);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-xl relative">
                <h2 className="text-xl font-bold mb-4">Dar de alta máquina</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block font-medium text-gray-700 mb-1">Nombre</label>
                        <input
                            type="text"
                            value={maquina.nombre}
                            disabled
                            className="w-full bg-yellow-50 border border-brown-300 text-brown-800 px-3 py-2 rounded-md"
                        />
                    </div>
                    <div>
                        <label className="block font-medium text-gray-700 mb-1">Nombre del establecimiento</label>
                        <input
                            type="text"
                            value={nombreEstablecimiento}
                            onChange={(e) => setNombreEstablecimiento(e.target.value)}
                            required
                            className="w-full bg-yellow-50 border border-brown-300 text-brown-800 px-3 py-2 rounded-md"
                        />
                    </div>
                    <div>
                        <label className="block font-medium text-gray-700 mb-1">Dirección del establecimiento</label>
                        <input
                            type="text"
                            value={direccion}
                            // onChange={(e) => buscarDireccion(e.target.value)}
                            placeholder="Buscar dirección o clic en el mapa"
                            className="w-full bg-yellow-50 border border-brown-300 text-brown-800 px-3 py-2 rounded-md"
                        />
                    </div>
                    <div>
                        <label className="block font-medium text-gray-700 mb-1">Selecciona ubicación en el mapa:</label>
                        <div
                            ref={mapContainerRef}
                            className="w-full h-64 rounded border"
                            style={{ zIndex: 1 }}
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold px-4 py-2 rounded-md transition duration-150"
                        >
                            Modificar
                        </button>
                    </div>
                </form>
                <button
                    onClick={onClose}
                    className="absolute top-4 right-6 text-xl font-bold text-gray-600 hover:text-red-500"
                >
                    &times;
                </button>
            </div>
        </div>
    );
};

export default ModalAltaMaquina;
