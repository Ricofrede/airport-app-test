import { useState, useEffect } from 'react'

import {
    getAirportsList,
    Airport
} from '../api';

export default function useFetchAirports() {
    const [airportList, setAirportList] = useState<Airport[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    async function getAirports() {
        try {
            const result = await getAirportsList()
            setAirportList(result)
            setLoading(false)
            setError(null)
        } catch (e) {
            setError(`Error while fetching data from server: ${JSON.stringify(e)}`)
            setLoading(false)
            setAirportList([])
        }
    }

    useEffect(() => {
        setLoading(true)
        getAirports()
    }, [])


    return { airportList, loading, error }
}
