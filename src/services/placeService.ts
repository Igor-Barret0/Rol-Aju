// OpenStreetMap/Nominatim API - Gratuita e sem necessidade de chave
const NOMINATIM_URL = 'https://nominatim.openstreetmap.org/search';
const NOMINATIM_LOOKUP_URL = 'https://nominatim.openstreetmap.org/lookup';

export interface MapPlace {
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
}



// Busca usando a API do OpenStreetMap/Nominatim
export const searchPlaces = async (query: string): Promise<MapPlace[]> => {
  if (!query.trim()) return [];

  console.log(`Buscando: "${query}" em Sergipe`);

  try {
    // Configura os parâmetros da busca
    const params = new URLSearchParams({
      q: `${query}, Sergipe, Brasil`,
      format: 'json',
      addressdetails: '1',
      limit: '10',
      countrycodes: 'br',
      viewbox: '-38.5,-11.5,-36.0,-10.0', // Área aproximada de Sergipe
      bounded: '1',
      extratags: '1',
      namedetails: '1',
      'accept-language': 'pt-BR,pt',
    });

    // Faz a requisição para a API do Nominatim
    const response = await fetch(`${NOMINATIM_URL}?${params.toString()}`, {
      headers: {
        'User-Agent': 'RolAjuApp/1.0 (igorbarreto@email.com)' // Identificação obrigatória
      }
    });
    
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }
    
    const data = await response.json();

    if (!Array.isArray(data) || data.length === 0) {
      console.log('Nenhum resultado encontrado');
      return [];
    }

    console.log(`Encontrados ${data.length} resultados`);

    // Mapeia os resultados para o formato esperado
    return data.map((place: any) => {
      const address = place.address || {};
      const categories = [];
      
      // Tenta extrair categorias das tags
      if (place.type) categories.push(place.type);
      if (place.class) categories.push(place.class);
      if (place.category) categories.push(place.category);

      // Tenta formatar o endereço
      let formattedAddress = '';
      if (address.road) formattedAddress += address.road;
      if (address.house_number) formattedAddress += `, ${address.house_number}`;
      if (address.suburb && !formattedAddress.includes(address.suburb)) {
        formattedAddress += formattedAddress ? `, ${address.suburb}` : address.suburb;
      }
      if (address.city_district && !formattedAddress.includes(address.city_district)) {
        formattedAddress += formattedAddress ? `, ${address.city_district}` : address.city_district;
      }
      if (address.city && !formattedAddress.includes(address.city)) {
        formattedAddress += formattedAddress ? `, ${address.city}` : address.city;
      }

      return {
        properties: {
          name: place.display_name?.split(',')[0] || 'Local sem nome',
          address_line2: formattedAddress || place.display_name || '',
          formatted: place.display_name || '',
          categories: categories,
          place_id: place.place_id || place.osm_id || String(Math.random()),
          details: {
            contact: {},
            website: place.extratags?.website || ''
          },
          website: place.extratags?.website || ''
        },
        geometry: {
          coordinates: [
            parseFloat(place.lon) || 0,
            parseFloat(place.lat) || 0
          ]
        }
      };
    });

  } catch (error) {
    console.error('Erro na busca por lugares:', error);
    return [];
  }
};

// Função para buscar um lugar pelo ID
export const getPlaceById = async (id: string): Promise<MapPlace | null> => {
  try {
    const params = new URLSearchParams({
      format: 'json',
      osm_ids: id,
      addressdetails: '1',
      'accept-language': 'pt-BR,pt',
    });

    const response = await fetch(`${NOMINATIM_LOOKUP_URL}?${params.toString()}`, {
      headers: {
        'User-Agent': 'RolAjuApp/1.0 (igorbarreto@email.com)'
      }
    });

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    const data = await response.json();
    if (!Array.isArray(data) || data.length === 0) {
      return null;
    }

    const place = data[0];
    const address = place.address || {};
    const categories = [];
    
    if (place.type) categories.push(place.type);
    if (place.class) categories.push(place.class);

    // Formata o endereço
    let formattedAddress = '';
    if (address.road) formattedAddress += address.road;
    if (address.house_number) formattedAddress += `, ${address.house_number}`;
    if (address.suburb && !formattedAddress.includes(address.suburb)) {
      formattedAddress += formattedAddress ? `, ${address.suburb}` : address.suburb;
    }
    if (address.city_district && !formattedAddress.includes(address.city_district)) {
      formattedAddress += formattedAddress ? `, ${address.city_district}` : address.city_district;
    }
    if (address.city && !formattedAddress.includes(address.city)) {
      formattedAddress += formattedAddress ? `, ${address.city}` : address.city;
    }

    return {
      properties: {
        name: place.display_name?.split(',')[0] || 'Local sem nome',
        address_line2: formattedAddress || place.display_name || '',
        formatted: place.display_name || '',
        categories: categories,
        place_id: place.osm_id || String(Math.random()),
        details: {
          contact: {},
          website: place.extratags?.website || ''
        },
        website: place.extratags?.website || ''
      },
      geometry: {
        coordinates: [
          parseFloat(place.lon) || 0,
          parseFloat(place.lat) || 0
        ]
      }
    };
  } catch (error) {
    console.error('Erro ao buscar lugar por ID:', error);
    return null;
  }
};
