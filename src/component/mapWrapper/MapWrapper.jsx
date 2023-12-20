import { useState, useCallback, useEffect } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { Oval } from "react-loader-spinner";
import { customTheme } from "./customTheme";

const apiKey = process.env.REACT_APP_API_KEY;

const containerStyle = {
  minWidth: "100%",
  minHeight: 527,
};

const defaultOptions = {
  fullscreenControl: false,
  keyboardShortcuts: false,
  mapTypeControl: false,
  streetViewControl: false,
  clickableIcons: false,
  disableDoubleClickZoom: true,
  maxZoom: 18,
  minZoom: 12,
  styles: customTheme,
};

const center = {
  lat: 50.473316,
  lng: 30.454852,
};

const MapWrapper = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: apiKey,
  });

  const [map, setMap] = useState(null);
  const [showMarker, setShowMarker] = useState(false);

  const onLoad = useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback() {
    setMap(null);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      setTimeout(() => {
        setShowMarker(true);
      }, 400);
    }
  }, [isLoaded]);

  return (
    <>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={13}
          onLoad={onLoad}
          onUnmount={onUnmount}
          options={defaultOptions}
        >
          {showMarker ? (
            <Marker position={center} icon={"/icons/marker.png"} />
          ) : null}
        </GoogleMap>
      ) : null}
      {!isLoaded ? (
        <Oval
          height={80}
          width={80}
          color="#2F80ED"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#fff"
          strokeWidth={4}
          strokeWidthSecondary={2}
        />
      ) : null}
    </>
  );
};

export default MapWrapper;
