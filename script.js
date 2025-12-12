const NOMINATIM_API_URL = "https://nominatim.openstreetmap.org/search";
const OPENMETEO_API_URL = "https://api.open-meteo.com/v1/forecast";

const cityInput = document.getElementById("cityInput");
const searchButton = document.querySelector(".city-search button");
const cityDisplay = document.getElementById("city");
const gpsDisplay = document.getElementById("gps");
const temperatureDisplay = document.getElementById("temperature");
const detailsDisplay = document.getElementById("details");
const weatherContainer = document.querySelector(".weather-container");

const limitApi = 1 // le système choisi le premier résultat pertinent uniquement

async function fetchCoordinates(cityName) {
    try {
        
        const response = await fetch(
            `${NOMINATIM_API_URL}?q=${encodeURIComponent(cityName)}&format=json&limit=${limitApi}`,
            {
                headers: {
                    "User-Agent": "mini_station_meteo (educational-project)" // cf personal_data_policy
                }
            }
        );

        if (!response.ok) {
            throw new Error("Erreur lors de la récupération des coordonnées");
        }

        const data = await response.json();
        
        console.log(data)
        
        
        if (!data || data.length === 0) {
            console.warn(`Aucune coordonnée trouvée pour: ${cityName}`);
            return null;
        }

        const location = data[0];

        console.log(location)
        
        
        if (!location.lat || !location.lon) {
            console.warn("Coordonnées invalides reçues");
            return null;
        }

        
        return {
            lat: parseFloat(location.lat),
            lon: parseFloat(location.lon),
            display_name: location.display_name
        };

    } catch (error) {
        console.error("Erreur dans fetchCoordinates:", error);
        return null;
    }
}


async function fetchWeather(lat, lon) {
    try {
        
        const params = new URLSearchParams({
            latitude: lat,
            longitude: lon,
            current: "temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m",
            timezone: "auto"
        });

        const response = await fetch(`${OPENMETEO_API_URL}?${params}`);

        if (!response.ok) {
            throw new Error("Erreur lors de la récupération des données météo");
        }

        const data = await response.json();
        
        console.log("Données météo reçues:", data);
        
        return data;

    } catch (error) {
        console.error("Erreur dans fetchWeather:", error);
        return null;
    }
}


async function searchWeather(cityName) {
    
    showLoadingState();

    
    const coordinates = await fetchCoordinates(cityName);

    
    if (!coordinates || !coordinates.lat || !coordinates.lon) {
        showError("Vérifier le nom de la ville");
        return;
    }

    
    const weatherData = await fetchWeather(coordinates.lat, coordinates.lon);

    if (!weatherData) {
        showError("Impossible de récupérer les données météo");
        return;
    }

    
    displayWeatherData(weatherData, coordinates);
}


function showLoadingState() {
    weatherContainer.classList.add("loading");
    cityDisplay.textContent = "Chargement...";
    temperatureDisplay.textContent = "-°C";
    detailsDisplay.textContent = "Mise à jour en cours...";
    gpsDisplay.textContent = "";
}


function showError(message) {
    weatherContainer.classList.remove("loading");
    cityDisplay.textContent = "Ville non trouvée";
    temperatureDisplay.textContent = "-°C";
    detailsDisplay.textContent = message;
    gpsDisplay.textContent = "";
}


function getWeatherDescription(code) {
    const weatherCodes = {
        0: "Ciel dégagé",
        1: "Principalement dégagé",
        2: "Partiellement nuageux",
        3: "Couvert",
        45: "Brouillard",
        48: "Brouillard givrant",
        51: "Bruine légère",
        53: "Bruine modérée",
        55: "Bruine dense",
        61: "Pluie faible",
        63: "Pluie modérée",
        65: "Pluie forte",
        71: "Neige faible",
        73: "Neige modérée",
        75: "Neige forte",
        77: "Grains de neige",
        80: "Averses faibles",
        81: "Averses modérées",
        82: "Averses violentes",
        85: "Averses de neige faibles",
        86: "Averses de neige fortes",
        95: "Orage",
        96: "Orage avec grêle légère",
        99: "Orage avec grêle forte"
    };
    
    return weatherCodes[code] || "Conditions inconnues";
}

function displayWeatherData(data, coordinates) {
    weatherContainer.classList.remove("loading");

    
    const cityName = coordinates.display_name.split(",")[0];
    cityDisplay.textContent = cityName;
    
    gpsDisplay.textContent = `GPS: ${coordinates.lat.toFixed(2)}°, ${coordinates.lon.toFixed(2)}°`;

    const temp = Math.round(data.current.temperature_2m);
    temperatureDisplay.textContent = `${temp}°C`;
    
    const description = getWeatherDescription(data.current.weather_code);
    const humidity = data.current.relative_humidity_2m;
    const windSpeed = (data.current.wind_speed_10m * 3.6).toFixed(1);
    const feelsLike = Math.round(data.current.apparent_temperature);

    detailsDisplay.innerHTML = `
        <div>${description}</div>
        <div>Ressenti: ${feelsLike}°C</div>
        <div>Humidité: ${humidity}%</div>
        <div>Vent: ${windSpeed} km/h</div>
    `;
}

searchButton.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city) {
        searchWeather(city);
        cityInput.value = "";
    }
});

cityInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        const city = cityInput.value.trim();
        if (city) {
            searchWeather(city);
            cityInput.value = "";
        }
    }
});

cityDisplay.textContent = "Station Météo";
temperatureDisplay.textContent = "--°C";
detailsDisplay.textContent = "Entrez une ville pour commencer";
gpsDisplay.textContent = "";
