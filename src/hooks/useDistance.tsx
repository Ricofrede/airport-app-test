import { useState, useEffect } from 'react';
import { getDistance } from 'geolib'

import {
    Airport
} from '../api';

interface UseDistanceProps {
    isReady: boolean
    start: Airport | null
    end: Airport | null
}

export default function useDistance({ isReady, start, end }: UseDistanceProps) {
    const [distance, setDistance] = useState<string>('')


    useEffect(() => {
        if (isReady && start && end) {
            const newDistanceRaw = getDistance(
                { latitude: start.lat, longitude: start.lng },
                { latitude: end.lat, longitude: end.lng }
            )

            const distanceRawWorld = Math.floor(newDistanceRaw / 1000)
            const distanceRawUSA = Math.floor(distanceRawWorld / 1.609)

            const distanceWorld = new Intl.NumberFormat()
                .format(distanceRawWorld)
            const distanceUSA = new Intl.NumberFormat()
                .format(distanceRawUSA)


            setDistance(`${distanceUSA} Mi (${distanceWorld} Km)`)
        } else {
            setDistance('')
        }
    }, [isReady])

    return distance
}
