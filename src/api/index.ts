import axios from "axios";

export interface Airport {
    name: string
    iata_code: string
    icao_code: string
    lat: number
    lng: number
    country_code: string
}

export const backend = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

backend.interceptors.request.use((config) => {
    if (config?.url) {
        config.url = `${config.url}&api_key=${process.env.REACT_APP_API_KEY}`
    }
    return config;
});

export async function getAirportsList() {
    let airports: Airport[] = []

    const { data } = await backend.get('/airports?country_code=US')
    if (data?.response) {
        airports = data.response
    }

    return airports
}
