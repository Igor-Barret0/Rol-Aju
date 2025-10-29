import { useEffect } from 'react';
import { MapComponent } from './MapComponent';
import './mapa.css';

export function MapaPage() {
  useEffect(() => {
    // Adiciona classe ao body quando o componente montar
    document.body.classList.add('sobre-page');
    
    // Remove a classe quando o componente desmontar
    return () => {
      document.body.classList.remove('sobre-page');
    };
  }, []);
  return (
    <div className="mapa-container">
      <div className="mapa-wrapper">
        <MapComponent />
      </div>
    </div>
  );
}
