import mapboxgl from 'mapbox-gl';

export const initalizeMap = (lng, lat, zoom, container) => {
  return new mapboxgl.Map({
    container,
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [lng, lat],
    zoom,
    minZoom: 10,
    maxZoom: 18,
    logoPosition: 'top-right',
  });
};

export const addGeolocateButton = (map) => {
  map.addControl(
    new mapboxgl.GeolocateControl({
      positionOptions: { enableHighAccuracy: true },
      trackUserLocation: true,
    })
  )
};

export const addMarkers = (markers, map) => {
  markers.features.forEach((marker) => {
    const el = document.createElement('div');
    el.className = 'marker';
    new mapboxgl.Marker(el)
      .setLngLat(marker.geometry.coordinates)
      .setPopup(new mapboxgl.Popup({ offset: 25 })
      .setHTML('<h3>' + marker.properties.title + '</h3><p>' + marker.properties.description + '</p>'))
      .addTo(map);
  })
};
