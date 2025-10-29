import { useEffect, useRef } from 'react';
import { Map, NavigationControl, GeolocateControl, Marker } from '@maptiler/sdk';
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
      navigationControl: false, // Desabilita os controles padrão de navegação
      geolocateControl: false,  // Desabilita o controle de geolocalização padrão
    });

    // Adiciona controles de navegação no canto inferior esquerdo
    map.current.addControl(new NavigationControl(), 'bottom-left');
    
    // Adiciona controle de geolocalização no canto inferior esquerdo
    map.current.addControl(new GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true
    }), 'bottom-left');

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
        height: '100%',
      }}
    />
  );
}
