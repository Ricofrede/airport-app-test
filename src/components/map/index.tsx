import { useState, useEffect, useCallback, memo } from 'react'
import { GoogleMap, useJsApiLoader, Marker, Polyline } from '@react-google-maps/api';

import {
    Airport
} from '../../api';
import styles from './mui';

const airportIcon = '/assets/images/iconmonstr-airport-9.svg'

const center = {
    lat: 37.0902,
    lng: -95.7129
};

interface MapProps {
    start: Airport | null
    end: Airport | null
    isReady: boolean
}

function Map({
    start,
    end,
    isReady
}: MapProps): JSX.Element {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_MAPS_KEY || ''
    })

    const [resetMap, setResetMap] = useState(false)

    useEffect(() => {
        if (!start) {
            setResetMap(true)
        }
    }, [start])

    useEffect(() => {
        if (resetMap) {
            setResetMap(false)
        }
    }, [resetMap])

    const onLoad = useCallback(function callback(map: any) {
        map.setZoom(4)
    }, [])

    function setMarker(airport: Airport | null) {
        if (!airport) return <></>

        return (
            <Marker
                title={`${airport.name} (${airport.iata_code})`}
                icon={airportIcon}
                position={{
                    lat: airport.lat,
                    lng: airport.lng
                }}
            />
        )
    }

    function setPath() {
        if (!start || !end) return <></>

        const path = [
            { lat: start.lat, lng: start.lng },
            { lat: end.lat, lng: end.lng }
        ];

        const options = {
            strokeColor: '#f00',
            strokeOpacity: 0.9,
            strokeWeight: 5,
            fillColor: '#000000',
            fillOpacity: 0.35,
            clickable: false,
            draggable: false,
            editable: false,
            visible: true,
            radius: 30000,
            paths: path,
            zIndex: 10
        };

        return (
            <Polyline
                path={path}
                options={options}
            />
        )
    }

    return isLoaded && !resetMap ? (
        <GoogleMap
            mapContainerStyle={styles.containerStyle}
            center={center}
            zoom={4}
            onLoad={onLoad}
        >
            {isReady ? setPath() : <></>}
            {setMarker(start)}
            {setMarker(end)}
        </GoogleMap>
    ) : <></>
}

export default memo(Map)