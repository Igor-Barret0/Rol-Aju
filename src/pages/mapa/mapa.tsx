import { useEffect } from 'react';
import { MapComponent } from './MapComponent';
import './mapa.css';

export function MapaPage() {
  return (
    <div className="mapa-container">
      <div className="mapa-wrapper">
        <MapComponent />
      </div>
    </div>
  );
}
