import { useState, useEffect } from "react";
import { MapComponent } from "./MapComponent";
import { PlacesList } from "./PlacesList";
import { PlaceDetailsCard } from "./PlaceDetailsCard";
import type { Place, GroupedPlaces } from "./PlacesList";
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

export function Mapa() {
    const [places, setPlaces] = useState<GroupedPlaces>({});
    const [allPlaces, setAllPlaces] = useState<Place[]>([]);
    const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
    const [loading, setLoading] = useState(true);
    const [userLocation, setUserLocation] = useState<[number, number] | null>(null); // 1. Estado para a localização do usuário

    // 2. Efeito para obter a localização do usuário
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setUserLocation([position.coords.latitude, position.coords.longitude]);
            },
            (error) => {
                console.error("Erro ao obter localização do usuário:", error);
                // Define uma localização padrão (centro de Aracaju) se o usuário negar
                setUserLocation([-10.9472, -37.0731]);
            }
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

    const handlePlaceSelect = (place: Place | null) => {
        setSelectedPlace(place);
    };

    return (
        <div className="mapa-container">
            <div className="mapa-wrapper">
                {/* ALTERAÇÃO AQUI: Remova as props 'places' e 'onPlaceSelect' */}
                <MapComponent 
                    selectedPlace={selectedPlace}
                />
            </div>

            <PlaceDetailsCard 
                place={selectedPlace} 
                userLocation={userLocation} // 4. Passe a localização do usuário para o card
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
