import React, { useState, useEffect, useRef } from 'react';
import './AddMarkerForm.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Toggle from "../../elements/Toggle/Toggle";
import { v4 as uuidv4 } from 'uuid';
import {getPlaces} from "../../utils/api";
import SearchResults from "../SearchResults/SearchResults";
import {validURL} from "../../utils/general";

export default function AddMarkerForm({
    displayAddMarkerForm,
    hideAddMarker,
    createMarker,
    viewState,
    setMapLocation
}) {
    const [markerType, setMarkerType] = useState("Type 2");
    const [address, setAddress] = useState("");
    const [lat, setLat] = useState("");
    const [long, setLong] = useState("");
    const [addressError, setAddressError] = useState(false);
    const [image, setImage] = useState("");
    const [imageError, setImageError] = useState(false);
    const [name, setName] = useState("");
    const [nameError, setNameError] = useState(false);
    const [description, setDescription] = useState("");
    const [descriptionError, setDescriptionError] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        if (address) {
            // Search within proximity to map center
            let params = {
                searchText: address,
                lat: viewState.latitude,
                lng: viewState.longitude,
                types: "address"
            };

            getPlaces(params).then(resp => {
                setSearchResults(resp.features);
            })
        }
    }, [address]);

    const submitAddMarker = () => {
        // Validations
        let valid = true;

        if (!address) { setAddressError(true); valid = false}
        if (!validURL(image)) { setImageError(true); valid = false}
        if (!name) { setNameError(true); valid = false}
        if (!description) { setDescriptionError(true); valid = false}

        if (valid) {
            // Format marker object
            let newMarker = {
                id: uuidv4(),
                type: markerType.toLowerCase(),
                address: address,
                lat: lat,
                long: long,
                image: image,
                name: name,
                description: description
            };

            // Create marker
            createMarker(newMarker);

            closeForm();
        }
    };

    const closeForm = () => {
        // Hide form
        hideAddMarker();

        // Clear states
        setMarkerType("Type 2");
        setAddress("");
        setAddressError(false);
        setLat("");
        setLong("");
        setImage("");
        setImageError(false);
        setName("");
        setNameError(false);
        setDescription("");
        setDescriptionError(false);
        setSearchResults([]);
    };

    const handleAddressSelection = (result) => {
        setLat(result.center[1]);
        setLong(result.center[0]);
        setAddress(result.place_name)
    };

    return (
        <div className={displayAddMarkerForm ? 'add-marker' : 'add-marker hidden'}>
            <div className="close-btn" onClick={closeForm}>
                <FontAwesomeIcon className="icon" icon="times"/>
            </div>
            <h2>Add Marker</h2>
            <div className="form">
                <div className="form-section">
                    <Toggle options={['Type 1', 'Type 2', 'Type 3']} active={markerType} change={setMarkerType}/>
                </div>
                <div className="form-section">
                    <div className={addressError ? "form-input error" : "form-input"}>
                        <FontAwesomeIcon className="icon" icon={"location-dot"}/>
                        <input
                            value={address}
                            onChange={(e) => {setAddressError(false);setAddress(e.target.value)}}
                            onFocus={() => setShowResults(true)}
                            onBlur={() =>setShowResults(false)}
                            placeholder={"Address"}
                            type="text"
                        />
                        {
                            showResults && address &&
                            <SearchResults
                                results={searchResults}
                                setMapLocation={setMapLocation}
                                styles={{width: 280, top: 230, left: "auto", right: "70px"}}
                                onclick={handleAddressSelection}
                            />
                        }
                    </div>
                </div>
                <div className="form-section">
                    <div className={imageError ? "form-input error" : "form-input"}>
                        <FontAwesomeIcon className="icon" icon={"image"}/>
                        <input
                            value={image}
                            onChange={(e) => {setImageError(false); setImage(e.target.value)}}
                            placeholder={"Image Url"}
                            type="text"
                        />
                    </div>
                </div>
                <div className="form-section">
                    <div className={nameError ? "form-input error" : "form-input"}>
                        <FontAwesomeIcon className="icon" icon={"signature"}/>
                        <input
                            value={name}
                            onChange={(e) => {setNameError(false); setName(e.target.value)}}
                            placeholder={"Marker Name"}
                            type="text"/>
                    </div>
                </div>
                <div className="form-section">
                    <div className={descriptionError ? "form-input error" : "form-input"}>
                        <textarea
                            value={description}
                            onChange={(e) => {setDescriptionError(false); setDescription(e.target.value)}}
                            className="description"
                            placeholder={"Description"}
                            type="text"/>
                    </div>
                </div>
                <div className="form-submit">
                    <button className="primary" onClick={submitAddMarker}>
                        Submit
                    </button>
                </div>
            </div>
        </div>
    )
}