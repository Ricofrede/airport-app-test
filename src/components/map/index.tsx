import React, { useState, useEffect, useCallback, memo } from 'react'
import { GoogleMap, useJsApiLoader, Marker, Polyline } from '@react-google-maps/api';

import {
    Airport
} from '../../api';

const airportIcon = '/assets/images/iconmonstr-airport-9.svg'

const containerStyle = {
    width: '100%',
    height: '86vh'
};

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

    const [map, setMap] = useState(null)
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
        // const bounds = new window.google.maps.LatLngBounds(center);
        // map.fitBounds(bounds);
        map.setZoom(4)
        setMap(map)
    }, [])

    const onUnmount = useCallback(function callback(map: any) {
        setMap(null)
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
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 5,
            fillColor: '#FF0000',
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
            mapContainerStyle={containerStyle}
            center={center}
            zoom={4}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            {isReady ? setPath() : <></>}
            {setMarker(start)}
            {setMarker(end)}
        </GoogleMap>
    ) : <></>
}

export default memo(Map)