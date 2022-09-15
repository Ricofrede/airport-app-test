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
        config.url = `${config.url}?api_key=${process.env.REACT_APP_API_KEY}`
    }
    return config;
});

const testing = [
    {
        "name": "Chicago 1",
        "iata_code": "ORD1",
        "icao_code": "KORD1",
        "lat": 41.978367,
        "lng": -87.904712,
        "country_code": "US"
    },
    {
        "name": "Chicago 2",
        "iata_code": "ORD2",
        "icao_code": "KORD2",
        "lat": 41.978367,
        "lng": -87.904712,
        "country_code": "US"
    },
]

export async function getAirportsList() {
    let airports: Airport[] = testing //[]

    /* try {
        const { data } = await backend.get('/airports')
        if (data.response) {
            airports = data.response
        }
    } catch (e) {
        console.log('Failed while fetching the airports\' API:', e)
    } */

    return airports
} 
