import React, { useState, useEffect, useRef } from 'react';
import Map, {GeolocateControl} from 'react-map-gl';
import mapboxgl from 'mapbox-gl';
import './Map.scss';
import {Markers} from "../Markers/Markers";
// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

export default function MapComponent({
    viewState,
    setViewState,
    markers,
    activeMarker,
    setActiveMarker
}) {
    const [filteredMarkers, setFilteredMarkers] = useState([]);

    const mapRef = useRef(null);

    const onMove = ({viewState}) => {
        setViewState(viewState)

        // filter displayed markers
        if (mapRef.current) {
            let bounds = mapRef.current.getMap().getBounds();
            let latRange = [Math.max(-90, bounds._sw.lat), Math.min(90, bounds._ne.lat)];
            let longRange = [Math.max(bounds._sw.lng, -180), Math.min(180, bounds._ne.lng)];

            let filtered = markers.filter(x => {
                let inView = false;

                if ((latRange[0] <= x.lat && x.lat <= latRange[1]) && (longRange[0] <= x.long && x.long <= longRange[1])) {
                    inView = true;
                }

                return inView
            });

            setFilteredMarkers(filtered.slice(0, 50));
        }
    };

    return (
        <div className={"map-container"}>
            <Map
                {...viewState}
                style={{width: "100%", height: "100%"}}
                mapStyle="mapbox://styles/mapbox/streets-v9"
                onMove={(e) => onMove(e)}
                ref={mapRef}
            >
                <Markers
                    markers={filteredMarkers}
                    activeMarker={activeMarker}
                    setActiveMarker={setActiveMarker}
                />
            </Map>
        </div>
    )
}