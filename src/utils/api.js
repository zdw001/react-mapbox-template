import axios from 'axios';

export {
    getMarkers,
    getPlaces
}

const getMarkers = () => {
    return new Promise(resolve => {
        resolve([{
            type: "Type 1",
            address: "1351 Test Street, Anytown, CA 90124",
            lat: 32.7514233,
            long: -117.2123596,
            image: "https://via.placeholder.com/150",
            name: "Test Marker",
            description: "This is a marker"
        }])
    })
};

const getPlaces = (payload) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${payload.searchText}.json?proximity=${payload.lng},${payload.lat}&access_token=${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}&types=${payload.types}`;

    return axios.get(
        url,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.data
    )
};