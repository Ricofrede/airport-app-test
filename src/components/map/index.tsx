import React, { useState, useCallback, memo } from 'react'
import { GoogleMap, useJsApiLoader, Marker, Polygon } from '@react-google-maps/api';

import {
    Airport
} from '../../api';

const airportIcon = '/assets/images/iconmonstr-airport-9.svg'

const containerStyle = {
    width: '100vh',
    height: '100vh'
};

const center = {
    lat: 37.0902,
    lng: -95.7129
};

interface MapProps {
    start: Airport | null
    end: Airport | null
}

function Map({
    start,
    end
}: MapProps): JSX.Element {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_MAPS_KEY || ''
    })

    const [map, setMap] = useState(null)

    const onLoad = useCallback(function callback(map: any) {
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
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
            <Polygon
                path={path}
                options={options}
            />
        )
    }

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={3}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            {setPath()}
            {setMarker(start)}
            {setMarker(end)}
        </GoogleMap>
    ) : <></>
}

export default memo(Map)