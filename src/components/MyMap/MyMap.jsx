import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import './MyMap.css'
mapboxgl.accessToken = 'pk.eyJ1IjoidmFyYWRwYXRpbDIxIiwiYSI6ImNsdWxrZmtkejB2bXoyamxpc2hhNm55bHEifQ.h4QS4f7-hH_6qCTeRa1ptQ';

export const MyMap = () => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(73.761536);
    const [lat, setLat] = useState(18.651674);
    const [zoom, setZoom] = useState(15);

    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [lng, lat],
            zoom: zoom
        });

        
        const marker = new mapboxgl.Marker()
            .setLngLat([73.7632246830617, 18.647798963946705])
            .setPopup(new mapboxgl.Popup().setHTML('<h3>Santosh Hostel</h3>'))
            .addTo(map.current);
    });

    return (
        <div>
            <div ref={mapContainer} className="map-container" />
        </div>
    );
}
