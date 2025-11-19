import { useState } from 'react';
import './PlacesList.css';

// Interfaces e Mapeamento exportados para serem usados pelo componente pai
export interface Place {
  properties: {
    name: string;
    address_line2: string;
    categories: string[];
    lat: number;
    lon: number;
  };
  geometry: {
    coordinates: [number, number];
  }
}

export interface GroupedPlaces {
  [key: string]: Place[];
}

export const categoryMap: { [key: string]: string } = {
  'catering.restaurant': 'Restaurantes',
  'catering.bar': 'Bares',
  'leisure.park': 'Parques',
  'entertainment': 'Entretenimento',
  'commercial.shopping_mall': 'Shoppings',
};

interface PlacesListProps {
    places: GroupedPlaces;
    loading: boolean;
    onPlaceSelect: (place: Place) => void;
}

export function PlacesList({ places, loading, onPlaceSelect }: PlacesListProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>('Restaurantes');

  const toggleCategory = (category: string) => {
    setActiveCategory(activeCategory === category ? null : category);
  };

  return (
    <div className="places-card">
      <div className="places-card-header">
        <h3>Locais Próximos</h3>
      </div>
      <div className="places-list">
        {loading ? (
          <p style={{ padding: '16px' }}>Carregando locais...</p>
        ) : (
          Object.keys(places).map(category => (
            places[category].length > 0 && (
              <div key={category} className="accordion-item">
                <button onClick={() => toggleCategory(category)} className="accordion-header">
                  {category} ({places[category].length})
                  <span>{activeCategory === category ? '−' : '+'}</span>
                </button>
                {activeCategory === category && (
                  <div className="accordion-content">
                    <ul>
                      {places[category].map((place, index) => (
                        <li key={index} onClick={() => onPlaceSelect(place)}>
                          <strong>{place.properties.name}</strong>
                          <p>{place.properties.address_line2}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )
          ))
        )}
      </div>
    </div>
  );
}