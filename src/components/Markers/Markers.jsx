import React, {Fragment, useEffect} from "react";
import { Marker } from "react-map-gl";
import MarkerSvg from "../Svg/MarkerSvg";

export const Markers = ({
    markers,
    activeMarker,
    setActiveMarker
}) => {
    const handleMarkerClick = (m) => {
        setActiveMarker(m)
    };

    return (
        <Fragment>
            {markers.map((m) => {
                let active = activeMarker && activeMarker.id === m.id;

                return (
                    <Marker
                        key={m.id}
                        longitude={m.long}
                        latitude={m.lat}
                        onClick={() => handleMarkerClick(m)}
                    >
                        <MarkerSvg active={active}/>
                    </Marker>
                )
            })}
        </Fragment>
    );
};
