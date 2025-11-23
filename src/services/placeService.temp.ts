const API_KEY = '99f6cc892efa49ba999dcfb9ee7cf421';

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

// Função auxiliar para fazer busca na API
async function searchApi(url: string): Promise<{ features: MapPlace[] }> {
  try {
    console.log('Buscando:', url);
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Erro na requisição:', error);
    return { features: [] };
  }
}

// Busca direta e simples, priorizando resultados exatos
export const searchPlaces = async (query: string): Promise<MapPlace[]> => {
  if (!query.trim()) return [];
  
  console.log(`Buscando: "${query}"`);
  
  try {
    // 1. Tenta busca exata pelo nome
    const exactUrl = `https://api.geoapify.com/v2/places?` + new URLSearchParams({
      name: query,
      filter: 'rect:-37.2,-11.1,-37.0,-10.9',
      limit: '10',
      apiKey: API_KEY
    });
    
    console.log('URL de busca exata:', exactUrl);
    const exactResults = await searchApi(exactUrl);
    
    if (exactResults.features?.length > 0) {
      console.log(`Encontrados ${exactResults.features.length} resultados exatos`);
      return exactResults.features;
    }
    
    // 2. Se não encontrar, tenta busca por texto
    console.log('Nenhum resultado exato, tentando busca por texto...');
    const textUrl = `https://api.geoapify.com/v2/places?` + new URLSearchParams({
      text: query,
      filter: 'rect:-37.2,-11.1,-37.0,-10.9',
      limit: '20',
      apiKey: API_KEY
    });
    
    console.log('URL de busca por texto:', textUrl);
    const textResults = await searchApi(textUrl);
    
    if (textResults.features?.length > 0) {
      console.log(`Encontrados ${textResults.features.length} resultados por texto`);
      return textResults.features;
    }
    
    console.log('Nenhum resultado encontrado');
    return [];
    
  } catch (error) {
    console.error('Erro na busca:', error);
    return [];
  }
};

// Função para buscar um lugar pelo ID
export const getPlaceById = async (id: string): Promise<MapPlace | null> => {
  try {
    const url = `https://api.geoapify.com/v2/place-details?id=${id}&apiKey=${API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }
    const data = await response.json();
    return data.features?.[0] || null;
  } catch (error) {
    console.error('Erro ao buscar lugar por ID:', error);
    return null;
  }
};
