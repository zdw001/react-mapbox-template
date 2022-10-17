import React, { useState, useEffect, useRef } from 'react';
import MapComponent from "../components/Map/Map";
import Nav from "../components/Nav/Nav";
import NavMobile from "../components/Nav/NavMobile";
import AddMarkerForm from "../components/AddMarkerForm/AddMarkerForm";
import {getMarkers} from "../utils/api";
import { v4 as uuidv4 } from 'uuid';
import MarkerDetails from "../components/MarkerDetails/MarkerDetails";
import {getRandom, getRandomFloat, getRandomInt} from "../utils/general";
import Loader from "../elements/Loader/Loader";

export default function Core() {
    const [loading, setLoading] = useState(true);
    const [viewState, setViewState] = useState({
        longitude: -117.1611,
        latitude: 32.7157,
        zoom: 8.5
    });
    const [displayAddMarkerForm, setDisplayAddMarkerForm] = useState(false);
    const [displayMarkerDetails, setDisplayMarkerDetails] = useState(false);
    const [markers, setMarkers] = useState([]);
    const [activeMarker, setActiveMarker] = useState(null);
    const [searchParams, setSearchParams] = useState(new URLSearchParams(window.location.search));

    useEffect(() => {

        // Locate user
        navigator.geolocation.getCurrentPosition(pos => {
            setViewState({
                longitude: pos.coords.longitude,
                latitude: pos.coords.latitude,
                zoom: 8.5
            });
            setLoading(false);
        }, err => {
            setLoading(false)
        });

        getMarkers().then(resp => {
            // Add ID field if not present
            resp = resp.map(x => {
                if (!x.id) {
                    x.id = uuidv4();

                    return x
                } else {
                    return x
                }
            });

            let testMarkers = [];

            // Optionally add markers to test performance
            if (searchParams.get('markers')) {
                for (let i=1; i < parseInt(searchParams.get('markers')); i++) {
                    testMarkers.push({
                        id: uuidv4(),
                        type: getRandom(['Type 1', 'Type 2', 'Type 3']),
                        address: getRandom(['123 Easy St', '456 Medium St', '789 Hard St']),
                        lat: getRandomFloat(-90, 90),
                        long: getRandomFloat(-180, 180),
                        image: "https://someurl.com",
                        name: `Marker ${getRandomInt(1, 999999999)}`,
                        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                    })
                }
            }

            setMarkers(resp.concat(testMarkers))
        })
    }, []);

    const createMarker = (marker) => {
        setMarkers(markers => [...markers, marker]);

        // Recenter map
        setMapLocation(marker.lat, marker.long, 13.5);

        // Open details
        handleOpenMarkerDetails(marker);
    };

    const handleShowAddMarkerForm = () => {
        if (activeMarker) {
            handleCloseMarkerDetails();

            setTimeout(() => {
                setDisplayAddMarkerForm(true);
            }, 300);
        } else {
            setDisplayAddMarkerForm(true);
        }
    };

    const handleCloseMarkerDetails = () => {
        setDisplayMarkerDetails(false);

        setTimeout(() => {setActiveMarker(null)}, 300);
    };

    const handleOpenMarkerDetails = (marker) => {
        if (displayAddMarkerForm) {
            setDisplayAddMarkerForm(false);

            setTimeout(() => {
                setActiveMarker(marker);
                setDisplayMarkerDetails(true);
            }, 300)
        } else {
            setActiveMarker(marker);
            setDisplayMarkerDetails(true);
        }
    };

    const setMapLocation = (lat, long, zoom) => {
        setViewState({
            longitude: long,
            latitude:lat,
            zoom: zoom
        })
    };

    return (
        <div>
            <Nav
                viewState={viewState}
                showAddMarker={handleShowAddMarkerForm}
                setMapLocation={setMapLocation}
            />
            <NavMobile
                viewState={viewState}
                showAddMarker={handleShowAddMarkerForm}
                setMapLocation={setMapLocation}
            />
            <AddMarkerForm
                displayAddMarkerForm={displayAddMarkerForm}
                hideAddMarker={() => setDisplayAddMarkerForm(false)}
                createMarker={createMarker}
                viewState={viewState}
                setMapLocation={setMapLocation}
            />
            {
                loading ? (
                    <Loader/>
                ) : (
                    <MapComponent
                        viewState={viewState}
                        setViewState={setViewState}
                        markers={markers}
                        activeMarker={activeMarker}
                        setActiveMarker={handleOpenMarkerDetails}
                    />
                )
            }
            <MarkerDetails
                displayMarkerDetails={displayMarkerDetails}
                activeMarker={activeMarker}
                closeMarkerDetails={handleCloseMarkerDetails}
            />
        </div>
    )
}