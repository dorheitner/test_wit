/** @format */

import React from "react";

import GoogleMapReact from "google-map-react";
import styled from "styled-components";
import Marker from "./Marker";

const MapBox = styled.div`
  width: 100%;
  height: 300px;
`;
export default React.memo(function EventMap(props) {
  const center = {
    lat: parseInt(Number(props.lat)),
    lng: parseInt(Number(props.long)),
  };

  return (
    <MapBox>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyCRcKCKoqkVLw043sMV2j7P-0qH9yPy1Hc" }}
        defaultCenter={center}
        defaultZoom={15}
      >
        <Marker
          lat={parseInt(props.lat)}
          lng={parseInt(props.long)}
          text={props.location}
        />
      </GoogleMapReact>
    </MapBox>
  );
});
