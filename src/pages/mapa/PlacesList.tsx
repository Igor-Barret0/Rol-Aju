import { useState } from 'react';
import './PlacesList.css';

// As interfaces e o categoryMap agora são importados ou passados pelo pai.
// Vamos remover a definição daqui para evitar duplicidade.
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

interface PlacesListProps {
    places: GroupedPlaces;
    loading: boolean;
    onPlaceSelect: (place: Place) => void;
}

export function PlacesList({ places, loading, onPlaceSelect }: PlacesListProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>('Restaurantes');
  const [searchTerm, setSearchTerm] = useState('');

  const toggleCategory = (category: string) => {
    setActiveCategory(activeCategory === category ? null : category);
  };

  // --- NOVA FUNÇÃO PARA NORMALIZAR O TEXTO ---
  const normalizeText = (text: string) => {
    return text
      .toLowerCase()
      .normalize("NFD") // Separa os caracteres dos acentos
      .replace(/[\u0300-\u036f]/g, "") // Remove os acentos
      .replace(/[^\w\s]/gi, ''); // Remove caracteres especiais (exceto letras, números e espaços)
  };

  const normalizedSearchTerm = normalizeText(searchTerm);

  const filteredPlaces = Object.keys(places).reduce((acc, category) => {
    const filtered = places[category].filter((place: Place) =>
        // --- LÓGICA DE BUSCA ATUALIZADA ---
        normalizeText(place.properties.name).includes(normalizedSearchTerm)
    );
    if (filtered.length > 0) {
        acc[category] = filtered;
    }
    return acc;
  }, {} as GroupedPlaces);

  const hasResults = Object.keys(filteredPlaces).length > 0;

  return (
    <div className="places-card">
      <div className="places-card-header">
        <h3>Locais Próximos</h3>
      </div>
      
      {/* --- BARRA DE PESQUISA ADICIONADA AQUI --- */}
      <div className="places-search-container">
        <input
          type="text"
          placeholder="Filtrar locais na lista..."
          className="places-search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {/* --- FIM DA BARRA DE PESQUISA --- */}

      <div className="places-list">
        {loading ? (
          <p className="status-message">Carregando locais...</p>
        ) : !hasResults ? (
          // MENSAGEM QUANDO NÃO HÁ RESULTADOS
          <p className="status-message">Nenhum resultado encontrado.</p>
        ) : (
          Object.keys(filteredPlaces).map(category => (
            <div key={category} className="accordion-item">
              <button onClick={() => toggleCategory(category)} className="accordion-header">
                {category} ({filteredPlaces[category].length})
                <span>{activeCategory === category ? '−' : '+'}</span>
              </button>
              
              {/* ALTERAÇÃO AQUI: Mostra o conteúdo se a categoria estiver ativa OU se o usuário estiver pesquisando */}
              {(activeCategory === category || searchTerm.length > 0) && (
                <div className="accordion-content">
                  <ul>
                    {filteredPlaces[category].map((place: Place, index: number) => (
                      <li key={index} onClick={() => onPlaceSelect(place)}>
                        <strong>{place.properties.name}</strong>
                        <p>{place.properties.address_line2}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}