import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { type Place } from './PlacesList'; // Importa a interface

// --- Correção para o ícone padrão do marcador no Leaflet com Webpack ---
// O Leaflet pode ter problemas para encontrar os ícones padrão quando usado com bundlers como o Webpack.
// Este trecho de código corrige isso importando os ícones manualmente.
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

interface MapComponentProps {
    places: Place[];
    selectedPlace: Place | null;
    onPlaceSelect: (place: Place | null) => void;
}

export function MapComponent({ places, selectedPlace, onPlaceSelect }: MapComponentProps) {
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

      {/* Adiciona marcadores para todos os locais */}
      {places.map((place, index) => {
        const [lon, lat] = place.geometry.coordinates;
        return (
            <Marker 
                key={index} 
                position={[lat, lon]}
                eventHandlers={{
                    click: () => {
                        onPlaceSelect(place);
                    },
                }}
            />
        );
      })}

      {/* Mostra um Popup no local selecionado */}
      {selectedPlace && (
        <Popup position={[selectedPlace.geometry.coordinates[1], selectedPlace.geometry.coordinates[0]]}>
            <strong>{selectedPlace.properties.name}</strong>
            <p>{selectedPlace.properties.address_line2}</p>
        </Popup>
      )}

      <SelectedPlaceHandler place={selectedPlace} />
    </MapContainer>
  );
}
