import type { Place } from './PlacesList';
import './PlaceDetailsCard.css';
import { ForkKnife, MapPinLine } from 'phosphor-react';
import L from 'leaflet';

interface PlaceDetailsCardProps {
    place: Place | null;
    userLocation: [number, number] | null;
    onClose: () => void;
}

const getDistance = (from: [number, number], to: [number, number]) => {
    const fromLatLng = L.latLng(from[0], from[1]);
    const toLatLng = L.latLng(to[0], to[1]);
    const distanceInMeters = fromLatLng.distanceTo(toLatLng);
    return (distanceInMeters / 1000).toFixed(1);
};

export function PlaceDetailsCard({ place, userLocation, onClose }: PlaceDetailsCardProps) {
    if (!place) return null;

    // 1. Remova o fallback 'Comida Variada'. A variável será 'undefined' se não houver dados.
    const cuisine = place.properties.details?.cuisine?.split(';')[0];
    const distance = userLocation ? getDistance(userLocation, [place.properties.lat, place.properties.lon]) : null;
    const isOpen = place.properties.opening_hours?.open_now;

    return (
        <div className="details-card">
            <button onClick={onClose} className="details-close-btn" title="Fechar">×</button>
            
            <div className="details-main-info">
                <div className="details-title-group">
                    <h3 className="details-title">{place.properties.name}</h3>
                </div>
            </div>

            <div className="details-sub-info">
                {/* 2. Adicione uma condição para renderizar a linha apenas se 'cuisine' existir */}
                {cuisine && <p><ForkKnife /> {cuisine}</p>}
                <p><MapPinLine /> {place.properties.address_line2.split(',')[0]} {distance ? `- ${distance} km` : ''}</p>
            </div>

            <div className="details-highlights">
                <ul>
                    {distance && <li>Menos de {Math.ceil(Number(distance))} quilômetros do seu local</li>}
                    {place.properties.details?.wheelchair && <li>Acessível</li>}
                    <li>
                        {isOpen === true && <span className="open">Aberto</span>}
                        {isOpen === false && <span className="closed">Fechado</span>}
                        {isOpen === undefined && 'Horário não informado'}
                    </li>
                </ul>
            </div>
        </div>
    );
}