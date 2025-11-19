import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import type { Place } from './PlacesList';

// --- Correção para o ícone padrão do marcador no Leaflet com Webpack ---
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
});

L.Marker.prototype.options.icon = DefaultIcon;
// --- Fim da correção ---

const center: L.LatLngExpression = [-10.9472, -37.0731];

// Componente para lidar com a mudança do local selecionado
function SelectedPlaceHandler({ place }: { place: Place | null }) {
    const map = useMap();
    useEffect(() => {
        if (place) {
            const [lon, lat] = place.geometry.coordinates;
            map.flyTo([lat, lon], 16); // Anima o mapa para o local
        }
    }, [place, map]);

    return null; // Este componente não renderiza nada
}

// 1. Simplifique a interface de props
interface MapComponentProps {
    selectedPlace: Place | null;
    userLocation: [number, number] | null; // 1. Adicione a prop userLocation
}

// 2. Crie um ícone azul para o usuário
const userIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

export function MapComponent({ selectedPlace, userLocation }: MapComponentProps) { // 3. Receba a prop
  return (
    <MapContainer 
      center={center} 
      zoom={13} 
      style={{ width: '100%', height: '100%' }}
    >
      <TileLayer
        attribution='Powered by <a href="https://www.geoapify.com/" target="_blank">Geoapify</a> | © <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors'
        url={`https://maps.geoapify.com/v1/tile/carto/{z}/{x}/{y}.png?&apiKey=99f6cc892efa49ba999dcfb9ee7cf421`}
      />

      {/* Marcador para o local selecionado (vermelho) */}
      {selectedPlace && (
        <Marker position={[selectedPlace.geometry.coordinates[1], selectedPlace.geometry.coordinates[0]]}>
            <Popup>
                <strong>{selectedPlace.properties.name}</strong>
                <p>{selectedPlace.properties.address_line2}</p>
            </Popup>
        </Marker>
      )}

      {/* 4. Marcador para a localização do usuário (azul) */}
      {userLocation && (
        <Marker position={userLocation} icon={userIcon}>
            <Popup>
                Você está aqui (ou este é o ponto de partida padrão).
            </Popup>
        </Marker>
      )}

      <SelectedPlaceHandler place={selectedPlace} />
    </MapContainer>
  );
}
