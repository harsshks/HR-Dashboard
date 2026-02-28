import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet default icon path issue with Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const customIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

async function geocodeCity(city) {
    try {
        const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(city)}&format=json&limit=1`;
        const res = await fetch(url, { headers: { 'Accept-Language': 'en' } });
        const data = await res.json();
        if (data.length > 0) {
            return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
        }
    } catch {
        // silently ignore geocoding errors
    }
    return null;
}

export default function CityMap({ employees }) {
    const [cityCoords, setCityCoords] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const uniqueCities = [
            ...new Set(
                employees
                    .map((e) => e.city ?? e.City ?? e.location ?? e.Location)
                    .filter(Boolean)
            ),
        ];

        if (!uniqueCities.length) {
            setLoading(false);
            return;
        }

        Promise.all(
            uniqueCities.map(async (city) => {
                const coords = await geocodeCity(city);
                return coords ? { city, ...coords } : null;
            })
        ).then((results) => {
            setCityCoords(results.filter(Boolean));
            setLoading(false);
        });
    }, [employees]);

    if (loading) {
        return (
            <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                height: '256px', gap: '12px', color: '#64748b',
            }}>
                <span style={{
                    width: '20px', height: '20px', border: '2px solid rgba(99,102,241,0.3)',
                    borderTopColor: '#6366f1', borderRadius: '50%',
                    animation: 'spin 0.8s linear infinite', display: 'inline-block',
                }} />
                Geocoding cities…
            </div>
        );
    }

    if (!cityCoords.length) {
        return (
            <p style={{ textAlign: 'center', padding: '32px 0', color: '#64748b' }}>
                No city data could be plotted.
            </p>
        );
    }

    const center = [cityCoords[0].lat, cityCoords[0].lng];

    return (
        <MapContainer center={center} zoom={5} style={{ height: '380px', width: '100%' }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {cityCoords.map(({ city, lat, lng }) => (
                <Marker key={city} position={[lat, lng]} icon={customIcon}>
                    <Popup>
                        <strong style={{ color: '#6366f1' }}>{city}</strong>
                        <br />
                        <span style={{ fontSize: '11px', color: '#94a3b8' }}>
                            {employees.filter((e) =>
                                (e.city ?? e.City ?? e.location ?? e.Location) === city
                            ).length} employee(s)
                        </span>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}
