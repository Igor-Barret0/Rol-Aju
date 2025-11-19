import { useState, useEffect } from "react";
import { MapComponent } from "./MapComponent";
import { PlacesList, categoryMap } from "./PlacesList";
import type { Place, GroupedPlaces } from "./PlacesList"; // <-- ALTERAÇÃO AQUI
import './mapa.css';

export function Mapa() {
    const [places, setPlaces] = useState<GroupedPlaces>({});
    const [allPlaces, setAllPlaces] = useState<Place[]>([]);
    const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const apiKey = '99f6cc892efa49ba999dcfb9ee7cf421';
        const categories = Object.keys(categoryMap).join(',');
        const cityNames = ['Aracaju', 'Barra dos Coqueiros', 'São Cristóvão', 'Nossa Senhora do Socorro'];

        const fetchAllPlaces = async () => {
            try {
                // Executa as buscas para todas as cidades em paralelo
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

                        // Etapa 2: Usar o place_id para buscar locais
                        const placesResponse = await fetch(`https://api.geoapify.com/v2/places?categories=${categories}&filter=place:${placeId}&limit=100&apiKey=${apiKey}`);
                        const placesData = await placesResponse.json();
                        return placesData.features || [];
                    })
                );

                // Junta os resultados de todas as cidades em uma única lista
                const combinedPlaces = allCityPlacesData.flat();

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
                <MapComponent 
                    places={allPlaces} 
                    selectedPlace={selectedPlace}
                    onPlaceSelect={handlePlaceSelect}
                />
            </div>
            <PlacesList 
                places={places}
                loading={loading}
                onPlaceSelect={handlePlaceSelect}
            />
        </div>
    )
}
