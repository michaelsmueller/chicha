import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken=process.env.REACT_APP_MAPBOX_TOKEN;

const geojson = {
  type: 'FeatureCollection',
  features: [{
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [2.1815156936646, 41.378692399857]
    },
    properties: {
      title: 'Matsuri 2020',
      description: 'Matsuri Japan'
    }
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [2.14413, 41.37247]
    },
    properties: {
      title: 'TBC: Irish Cultural Dinner Pairing & Live Trad Music',
      description: 'Uncorked Academy & All Zara\'s Events'
    }
  }]
};

export default class EventsMap extends Component {
  state = { lng: 2.1700556, lat: 41.3869959, zoom: 11 };

  componentDidMount = () => {
    const { lng, lat, zoom } = this.state;
 
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom,
      minZoom: 10,
      maxZoom: 18,
      logoPosition: 'top-right',
    });

    map.on('move', () => {
      this.setState({
        lng: map.getCenter().lng.toFixed(4),
        lat: map.getCenter().lat.toFixed(4),
        zoom: map.getZoom().toFixed(2),
      });
    })

    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: { enableHighAccuracy: true },
        trackUserLocation: true,
      })
    )

    geojson.features.forEach((marker) => {
      const el = document.createElement('div');
      el.className = 'marker';
      new mapboxgl.Marker(el)
        .setLngLat(marker.geometry.coordinates)
        .setPopup(new mapboxgl.Popup({ offset: 25 })
        .setHTML('<h3>' + marker.properties.title + '</h3><p>' + marker.properties.description + '</p>'))
        .addTo(map);
    })
  }

  render() {
    const { events } = this.props;
    console.log('received events', events);
    return (
      <div className='events-map'>
        <div ref={(el) => this.mapContainer = el} className='mapContainer' />
      </div>
    );
  }
}
