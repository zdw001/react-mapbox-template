import React, {useEffect, useState} from "react";
import './Nav.scss';
import {
    getPlaces
} from "../../utils/api";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import SearchResults from "../SearchResults/SearchResults";


export default function Nav({
    showAddMarker,
    setMapLocation,
    viewState
}) {
    const [searchValue, setSearchValue] = useState("");
    const [showResults, setShowResults] = useState(false);
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        if (searchValue) {
            // Search within proximity to map center
            let params = {
                searchText: searchValue,
                lat: viewState.latitude,
                lng: viewState.longitude,
                types: "country,region,postcode,district,place,locality,neighborhood,address,poi"
            };

            getPlaces(params).then(resp => {
                setSearchResults(resp.features);
            })
        }
    }, [searchValue]);

    return (
       <div className={"nav"}>
            <div className="nav-section">
            {/*    Insert Logo     */}
            </div>
            <div className="nav-section">
                <div className="search-bar">
                    <FontAwesomeIcon className="icon" icon="search"/>
                    <input
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        onFocus={() => setShowResults(true)}
                        onBlur={() =>setShowResults(false)}
                        placeholder={"San Diego, CA"}
                        type="text"
                    />
                </div>
                {
                    showResults && searchValue &&
                    <SearchResults
                        results={searchResults}
                        setMapLocation={setMapLocation}
                        setSeachValue={setSearchValue}
                    />
                }
            </div>
            <div className="nav-section">
                <div className="list-marker">
                    <button onClick={showAddMarker} className="primary">Add Marker</button>
                </div>
            </div>
       </div>
    );
};
