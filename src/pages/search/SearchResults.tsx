import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { searchPlaces } from '../../services/placeService';
import './SearchResults.css';

// Adicionando tipos ausentes
type SearchResult = {
  properties: {
    name: string;
    address_line2: string;
    formatted?: string;
    categories?: string[];
    place_id?: string;
    opening_hours?: {
      open_now: boolean;
    };
    details?: {
      contact?: {
        phone?: string;
      };
      website?: string;
    };
    website?: string;
  };
  geometry: {
    coordinates: [number, number];
  };
};

export function SearchResults() {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Efeito para realizar a busca quando o componente é montado ou a query muda
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('q') || '';
    setSearchQuery(query);

    if (query) {
      performSearch(query);
    }
  }, [location.search]);


  const performSearch = async (query: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Usando a função searchPlaces do serviço
      const data = await searchPlaces(query);
      setResults(data);
    } catch (err) {
      setError('Ocorreu um erro ao buscar os resultados.');
      console.error('Search error:', err);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Função para lidar com o clique no botão de tentar novamente
  const handleRetry = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (searchQuery) {
      performSearch(searchQuery);
    }
  };

  const getCategoryName = (category: string) => {
    const parts = category.split('.');
    return parts[parts.length - 1]
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  
  const getPhoneNumber = (place: SearchResult) => {
    return place.properties.details?.contact?.phone || '';
  };
  
  const getWebsite = (place: SearchResult) => {
    return place.properties.details?.website || place.properties.website || '';
  };

  return (
    <div className="search-results">
      <div className="search-header">
        <h1>Resultados para: "{searchQuery}"</h1>
        <p className="results-count">{results.length} resultados encontrados</p>
      </div>
      
      {isLoading && (
        <div className="loading">
          <div className="spinner"></div>
          <p>Buscando lugares...</p>
        </div>
      )}
      
      {error && (
        <div className="error-message">
          <p>Ocorreu um erro ao buscar os resultados.</p>
          <button className="retry-button" onClick={handleRetry}>
            Tentar novamente
          </button>
        </div>
      )}
      
      {!isLoading && results.length === 0 && !error && (
        <div className="no-results">
          <p>Nenhum resultado encontrado para "{searchQuery}"</p>
          <p>Tente usar termos diferentes ou mais gerais.</p>
        </div>
      )}
      
      {!isLoading && results.length > 0 && (
        <div className="results-grid">
          {results.map((place) => (
            <div key={place.properties.place_id || `place-${Math.random().toString(36).substr(2, 9)}`} className="result-card">
              <div className="card-header">
                <h3>{place.properties.name}</h3>
                {place.properties.opening_hours && (
                  <span className={`status ${place.properties.opening_hours.open_now ? 'open' : 'closed'}`}>
                    {place.properties.opening_hours.open_now ? 'Aberto' : 'Fechado'}
                  </span>
                )}
              </div>
              
              <div className="card-body">
                {place.properties.formatted && (
                  <p className="address">
                    <i className="icon-location"></i>
                    {place.properties.formatted}
                  </p>
                )}
                
                {place.properties.address_line2 && (
                  <p className="address">
                    <i className="icon-location"></i>
                    {place.properties.address_line2}
                  </p>
                )}
                
                {place.properties.categories && (
                  <div className="categories">
                    {place.properties.categories.slice(0, 3).map((cat: string) => (
                      <span key={cat} className="category">
                        {getCategoryName(cat)}
                      </span>
                    ))}
                  </div>
                )}
                
                <div className="card-footer">
                  {getPhoneNumber(place) && (
                    <a 
                      href={`tel:${getPhoneNumber(place)}`}
                      className="action-button phone"
                    >
                      <i className="icon-phone"></i> Ligar
                    </a>
                  )}
                  
                  {getWebsite(place) && (
                    <a 
                      href={getWebsite(place)} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="action-button website"
                    >
                      <i className="icon-globe"></i> Site
                    </a>
                  )}
                  
                  <a 
                    href={`https://www.google.com/maps/dir/?api=1&destination=${place.geometry.coordinates[1]},${place.geometry.coordinates[0]}`}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="action-button directions"
                  >
                    <i className="icon-navigation"></i> Como chegar
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
