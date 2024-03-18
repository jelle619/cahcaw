'use client';

import { useState } from 'react';

import 'mapbox-gl/dist/mapbox-gl.css'; // Mapbox
// import 'maplibre-gl/dist/maplibre-gl.css'; // Maplibre
import Map, { GeolocateControl, NavigationControl, FullscreenControl, ScaleControl, Source, Layer, Marker, Popup, MapRef } from 'react-map-gl';
// import Map, { GeolocateControl, NavigationControl, FullscreenControl, ScaleControl, Source, Layer, Marker, Popup } from 'react-map-gl/maplibre'; // Maplibre

import './commune-map.css';

export default function CommuneMap({ data }: { data: any }) {
  const [popup, setPopup] = useState(null);

  return (
    <Map
      initialViewState={{
        longitude: 10.44783,
        latitude: 51.16382,
        zoom: 5
      }}
      style={{ position: 'absolute', width: '100%', height: '100%' }}

      cooperativeGestures={false}
      attributionControl={false}

      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN} // Mapbox
      mapStyle="mapbox://styles/jelle619/clsewc2fo01rg01pedk0774k7" // Mapbox
    // mapStyle={"https://demotiles.maplibre.org/style.json"} // MapLibre
    >
      <NavigationControl position="bottom-left" />
      <FullscreenControl position="top-left"/>

      {data.map((entry: any, index: any) => (
        <>
          <Marker key={entry.name} longitude={Number(entry.coordinates.split(", ")[1])} latitude={Number(entry.coordinates.split(", ")[0])} anchor="bottom" offset={[0, 6]}
            onClick={e => {
              // If we let the click event propagates to the map, it will immediately close the popup
              // with `closeOnClick: true`
              e.originalEvent.stopPropagation();
              setPopup(entry.name);
            }}
          />

          {popup == entry.name && (
            <Popup
              key={entry.name}
              anchor="top"
              longitude={Number(entry.coordinates.split(", ")[1])}
              latitude={Number(entry.coordinates.split(", ")[0])}
              onClose={() => setPopup(null)}
            >
              <div className="text-white">
                <h1>{entry.name}</h1>
              </div>
            </Popup>
          )}
        </>
      ))}

    </Map>

  )
}