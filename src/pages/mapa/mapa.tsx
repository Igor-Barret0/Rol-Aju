import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; // 1. Importe para ler os dados da rota
import { MapComponent } from "./MapComponent";
import { PlacesList } from "./PlacesList";
import { PlaceDetailsCard } from "./PlaceDetailsCard";
import { Notification } from "../../components/Notification/Notification";
import type { Place, GroupedPlaces } from "./PlacesList";
import type { UserPreferences } from "../../components/Modal/MultiStepModal"; // 2. Importe a interface de preferências
import './mapa.css';

// Vamos mover o categoryMap para cá, pois é o componente que faz a busca
const categoryMap: { [key: string]: string } = {
  'catering.restaurant': 'Restaurantes',
  'catering.fast_food': 'Fast Food', // <-- CATEGORIA ADICIONADA
  'catering.bar': 'Bares',
  'leisure.park': 'Parques',
  'entertainment': 'Entretenimento',
  'commercial.shopping_mall': 'Shoppings',
};

// Função para calcular a distância entre dois pontos [lat, lon] em metros
const getDistance = (coord1: [number, number], coord2: [number, number]) => {
    const lat1 = coord1[0] * Math.PI / 180;
    const lon1 = coord1[1] * Math.PI / 180;
    const lat2 = coord2[0] * Math.PI / 180;
    const lon2 = coord2[1] * Math.PI / 180;
  
    const earthRadius = 6371000; // Raio da Terra em metros
  
    const a = Math.sin((lat2 - lat1) / 2) * Math.sin((lat2 - lat1) / 2) +
              Math.cos(lat1) * Math.cos(lat2) *
              Math.sin((lon2 - lon1) / 2) * Math.sin((lon2 - lon1) / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
    return earthRadius * c; // Distância em metros
};

export function Mapa() {
    const location = useLocation(); // 3. Hook para acessar os dados da rota
    const preferences = location.state?.preferences as UserPreferences | null;

    const [places, setPlaces] = useState<GroupedPlaces>({});
    const [allPlaces, setAllPlaces] = useState<Place[]>([]);
    const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
    const [loading, setLoading] = useState(true);
    const [userLocation, setUserLocation] = useState<[number, number] | null>(null); // 1. Estado para a localização do usuário
    const [notification, setNotification] = useState(''); // 2. Estado para a mensagem de notificação

    // 2. Efeito para obter a localização do usuário
    useEffect(() => {
        // 1. Crie um objeto de opções
        const options = {
            enableHighAccuracy: true, // Tenta obter a localização mais precisa possível
            timeout: 10000,           // Aumenta o tempo limite para 10 segundos
            maximumAge: 0             // Não usa uma localização em cache
        };

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setUserLocation([position.coords.latitude, position.coords.longitude]);
            },
            (error) => {
                console.error("Erro ao obter localização do usuário:", error);
                
                // 3. Use o estado da notificação em vez do alert()
                setNotification("Não foi possível obter sua localização. Usaremos o centro de Aracaju como ponto de partida.");

                // Define uma localização padrão (centro de Aracaju) se o usuário negar
                setUserLocation([-10.9472, -37.0731]);
            },
            options // 2. Passe as opções para a função
        );
    }, []);

    useEffect(() => {
        const apiKey = '99f6cc892efa49ba999dcfb9ee7cf421';
        const categories = Object.keys(categoryMap).join(',');
        const cityNames = ['Aracaju', 'Barra dos Coqueiros', 'São Cristóvão', 'Nossa Senhora do Socorro'];

        const fetchAllPlaces = async () => {
            try {
                const allCityPlacesData = await Promise.all(
                    cityNames.map(async (cityName) => {
                        // Etapa 1: Obter o place_id da cidade
                        const geoResponse = await fetch(`https://api.geoapify.com/v1/geocode/search?text=${cityName}, Sergipe, Brazil&apiKey=${apiKey}`);
                        const geoData = await geoResponse.json();

                        if (!geoData.features || geoData.features.length === 0) {
                            console.warn(`Cidade não encontrada: ${cityName}`);
                            return []; // Retorna um array vazio se a cidade não for encontrada
                        }
                        const placeId = geoData.features[0].properties.place_id;

                        // --- ALTERAÇÃO AQUI: Aumentar o limite ---
                        const placesResponse = await fetch(`https://api.geoapify.com/v2/places?categories=${categories}&filter=place:${placeId}&limit=500&fields=details,opening_hours&apiKey=${apiKey}`);
                        const placesData = await placesResponse.json();
                        return placesData.features || [];
                    })
                );

                const combinedPlaces = allCityPlacesData.flat();

                // --- DEBUG: Adicione este console.log para ver todos os nomes ---
                console.log("Locais recebidos da API:", combinedPlaces.map(p => p.properties.name));
                // --- FIM DO DEBUG ---

                // Processa a lista combinada para agrupar e exibir
                const grouped: GroupedPlaces = {};
                const flatList: Place[] = [];
                const uniquePlaceNames = new Set<string>();

                Object.values(categoryMap).forEach(name => {
                    grouped[name] = [];
                });

                combinedPlaces.forEach((place: Place) => {
                    // Evita duplicatas, caso um local seja retornado em mais de uma busca
                    if (place.properties.name && place.geometry && !uniquePlaceNames.has(place.properties.name)) {
                        uniquePlaceNames.add(place.properties.name);
                        flatList.push(place);
                        const mainCategoryKey = place.properties.categories.find(cat => categoryMap[cat]);
                        if (mainCategoryKey) {
                            const categoryName = categoryMap[mainCategoryKey];
                            grouped[categoryName].push(place);
                        }
                    }
                });

                setPlaces(grouped);
                setAllPlaces(flatList);
                setLoading(false);

            } catch (error) {
                console.error('Erro ao buscar locais:', error);
                setLoading(false);
            }
        };

        fetchAllPlaces();

    }, []); // O array de dependências vazio garante que isso rode apenas uma vez

    // 4. NOVO useEffect: Filtra e seleciona o melhor local com base nas preferências
    useEffect(() => {
        // Só executa se tivermos recebido preferências, a localização do usuário e a lista de locais
        if (preferences && userLocation && allPlaces.length > 0) {
            
            // Mapeamento das atividades do modal para as categorias da API
            const activityToCategories: { [key: string]: string[] } = {
                'restaurante': ['catering.restaurant', 'catering.fast_food', 'catering.bar'],
                'passeio': ['leisure.park'],
                'cultura': ['entertainment.culture'],
                'diversao': ['entertainment'],
                'praia': ['natural.beach'] // Adicione esta se tiver a categoria
            };

            // Filtro 1: Atividade
            const categoryFilter = activityToCategories[preferences.activity] || Object.keys(categoryMap);
            let filtered = allPlaces.filter(place => 
                place.properties.categories.some(cat => categoryFilter.includes(cat))
            );

            // Filtro 2: Distância
            filtered = filtered.filter(place => {
                const distanceInKm = getDistance(userLocation, [place.properties.lat, place.properties.lon]) / 1000;
                if (preferences.distance === '<1') return distanceInKm < 1;
                if (preferences.distance === '1-5') return distanceInKm >= 1 && distanceInKm <= 5;
                if (preferences.distance === '5+') return distanceInKm > 5;
                return true;
            });

            // Filtro 3: Acessibilidade
            if (preferences.preferences.includes('acessivel')) {
                filtered = filtered.filter(place => place.properties.details?.wheelchair);
            }

            // Encontrar o melhor resultado
            if (filtered.length > 0) {
                // Ordena os locais filtrados pelo mais próximo
                filtered.sort((a, b) => {
                    const distA = getDistance(userLocation, [a.properties.lat, a.properties.lon]);
                    const distB = getDistance(userLocation, [b.properties.lat, b.properties.lon]);
                    return distA - distB;
                });
                // Seleciona o primeiro da lista (o mais próximo)
                setSelectedPlace(filtered[0]);
                setNotification(`Encontramos o melhor rolê para você: ${filtered[0].properties.name}!`);
            } else {
                setNotification("Nenhum local encontrado com suas preferências. Mostrando todos os locais.");
            }
        }
    }, [preferences, userLocation, allPlaces]); // Dependências do efeito

    const handlePlaceSelect = (place: Place | null) => {
        setSelectedPlace(place);
    };

    return (
        <div className="mapa-container">
            {/* 4. Renderize a notificação */}
            <Notification message={notification} type="info" />

            <div className="mapa-wrapper">
                <MapComponent 
                    selectedPlace={selectedPlace}
                    userLocation={userLocation} // 2. Passe a localização para o componente do mapa
                />
            </div>

            <PlaceDetailsCard 
                place={selectedPlace} 
                userLocation={userLocation}
                onClose={() => handlePlaceSelect(null)} 
            />

            <PlacesList 
                places={places}
                loading={loading}
                onPlaceSelect={handlePlaceSelect}
            />
        </div>
    )
}
