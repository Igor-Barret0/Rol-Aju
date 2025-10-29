import { useEffect, useRef } from 'react';
import { Map, NavigationControl, Marker } from '@maptiler/sdk';
import '@maptiler/sdk/dist/maptiler-sdk.css';

const center = {
  lat: -10.9472, // Latitude de Aracaju
  lng: -37.0731  // Longitude de Aracaju
};

export function MapComponent() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<Map | null>(null);
  const apiKey = 'GKt099mQ3IYZEYjavswP';

  useEffect(() => {
    if (map.current || !mapContainer.current) return;

    // Inicializa o mapa
    map.current = new Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${apiKey}`,
      center: [center.lng, center.lat],
      zoom: 12,
    });

    // Adiciona controles de navegação
    map.current.addControl(new NavigationControl());

    // Adiciona um marcador
    new Marker({ color: '#FF0000' })
      .setLngLat([center.lng, center.lat])
      .addTo(map.current);

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, []);

  return (
    <div 
      ref={mapContainer} 
      style={{
        width: '100%',
        height: '70vh',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}
    />
  );
}
