import React from 'react';
import ReactDOM from 'react-dom';
// import { Link } from 'react-router-dom';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken=process.env.REACT_APP_MAPBOX_TOKEN;

export const addMarkers = (markers, map) => {
  markers.features.forEach((marker) => {
    const el = document.createElement('div');
    el.className = 'marker';
    const { name, place, rank } = marker.properties;
    el.style.backgroundImage = `url(/markers/${rank + 1}.svg)`;
    const popupContainer = document.createElement('div');
    // const popupContainer = <div><Link to={`/events/${_id}`}><h3>{name}</h3></Link><p>{place}</p></div>;
    const popupContents = <div><h3>{name}</h3><p>{place}</p></div>;
    ReactDOM.render(popupContents, popupContainer);
    new mapboxgl.Marker(el)
      .setLngLat(marker.geometry.coordinates)
      .setPopup(new mapboxgl.Popup({ offset: 20 })
      .setDOMContent(popupContainer))
      .addTo(map);
  })
};

export const initalizeMap = (lng, lat, zoom, container) => {
  return new mapboxgl.Map({
    container,
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [lng, lat],
    zoom,
    minZoom: 11,
    maxZoom: 18,
    logoPosition: 'top-right',
    compact: true,
  });
};

export const getCenter = (geo, map) => map.getCenter()[geo].toFixed(4);

export const getZoom = (map) => map.getZoom().toFixed(2);

export const addGeolocateButton = (map) => {
  map.addControl(
    new mapboxgl.GeolocateControl({
      positionOptions: { enableHighAccuracy: true },
      trackUserLocation: true,
    })
  )
};

export const getMarkers = (events) => {
  const features = [];
  events.forEach((event, index) => {
    if (hasLatAndLng(event)) {
      const feature = createFeature(event, index);
      features.push(feature);
    }
  });
  return { type: 'FeatureCollection', features };
}

const hasLatAndLng = (event) => event.data?.place?.location?.latitude && event.data?.place?.location?.longitude;

const createFeature = (event, rank) => {
  const { _id, data: { name, place: { name: place, location } } } = event || '';
  const { latitude, longitude } = location || 0;
  return {
    type: 'Feature',
    geometry: { type: 'Point', coordinates: [longitude, latitude] },
    properties: { _id, name, place, rank }
  };
};
