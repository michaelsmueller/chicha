import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import { geoTest } from '../helpers/geoJSON';
import { initalizeMap, addGeolocateButton, addMarkers } from '../helpers/mapbox';

mapboxgl.accessToken=process.env.REACT_APP_MAPBOX_TOKEN;

export default class EventsMap extends Component {
  state = { lng: 2.1700556, lat: 41.3869959, zoom: 11 };

  onMapMove = (map) => {
    this.setState({
      lng: map.getCenter().lng.toFixed(4),
      lat: map.getCenter().lat.toFixed(4),
      zoom: map.getZoom().toFixed(2),
    });
  }

  renderMap = () => {
    const { lng, lat, zoom } = this.state;
    const container = this.mapContainer;
    const map = initalizeMap(lng, lat, zoom, container);
    map.on('move', () => this.onMapMove(map));
    addGeolocateButton(map);
    addMarkers(geoTest, map);
  }

  componentDidMount = () => this.renderMap();

  render() {
    const { events } = this.props;
    // console.log('received events', events);
    return (
      <div className='events-map'>
        <div ref={(el) => this.mapContainer = el} className='mapContainer' />
      </div>
    );
  }
}
