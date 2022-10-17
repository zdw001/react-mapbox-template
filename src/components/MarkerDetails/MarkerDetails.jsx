import React, { useState, useEffect, useRef } from 'react';
import './MarkerDetais.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function MarkerDetails({
    displayMarkerDetails,
    activeMarker,
    closeMarkerDetails
}) {
    return (
        <div className={displayMarkerDetails ? "marker-details" : "marker-details hidden"}>
            {
                activeMarker &&
                <div>
                    <div className="close-btn" onClick={closeMarkerDetails}>
                        <FontAwesomeIcon className="icon" icon="times"/>
                    </div>
                    <div className="header">
                        <div className="image-wrapper">
                            <img
                                src={activeMarker.image}
                                onError={({ currentTarget }) => {
                                    currentTarget.onerror = null; // prevents looping
                                    currentTarget.parentElement.style.display="none";
                                }}
                            />
                        </div>
                        <div className="title">
                            <h2>{activeMarker.name}</h2>
                            <span>{activeMarker.address}</span>
                        </div>
                    </div>
                    <div className="detail-section">
                        <div className="details">
                            <span>{activeMarker.description}</span>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}