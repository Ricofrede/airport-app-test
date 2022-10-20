import axios from "axios";
export interface Airport {
    name: string
    iata_code: string
    icao_code: string
    lat: number
    lng: number
    country_code: string
    city?: string
    state?: string
}

export const backend = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

export async function getAirportsList() {
    let airports: Airport[] = []

    const data = await fetchFromCache()
    if (data) {
        airports = data
    }


    return airports
}

async function fetchFromCache() {

    let cachedData = localStorage.getItem("finalAirports");

    if (cachedData) {
        return JSON.parse(cachedData)
    } else {
        const { data } = await backend.get('/final-airports/master/finalAirports.json')

        if (!data) return ''

        localStorage.setItem("finalAirports", JSON.stringify(data));

        return data
    }


}
