import React, {useEffect, useState} from "react";
import './SearchResults.scss';


export default function SearchResults({
    results,
    setMapLocation,
    styles,
    onclick,
    setSearchValue
}) {

    const handleResultClick = (result) => {
        setMapLocation(result.center[1], result.center[0], 13.5);

        if (setSearchValue) {
            setSearchValue(result.place_name.split(/,(.*)/s)[0]);
        }

        // Optional onclick event
        if (onclick) {
            onclick(result)
        }
    };

    return (
        <div style={styles} className="search-results">
            {
                results.map(result => {
                    return (
                        <div key={result.id} className="result" onMouseDown={() => handleResultClick(result)}>
                            <div className="name">
                                <span>{result.place_name.split(/,(.*)/s)[0]}</span>
                            </div>
                            <div className="address">
                                <span>{result.place_name.split(/,(.*)/s)[1]}</span>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    );
};
