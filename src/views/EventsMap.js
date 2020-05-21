import React, { Component } from 'react';
import { initalizeMap, getCenter, getZoom, addGeolocateButton, addMarkers, getMarkers } from '../helpers/mapbox';

export default class EventsMap extends Component {
  state = { lng: 2.1700556, lat: 41.3869959, zoom: 11 };

  onMapMove = () => this.setState({
    lng: getCenter('lng', this.map),
    lat: getCenter('lat', this.map),
    zoom: getZoom(this.map),
  });

  renderMap = () => {
    const { lng, lat, zoom } = this.state;
    this.map = initalizeMap(lng, lat, zoom, this.mapContainer);
    this.map.on('move', () => this.onMapMove());
    addGeolocateButton(this.map);
    const markers = getMarkers(this.props.events);
    addMarkers(markers, this.map);
  }

  componentDidMount = () => this.renderMap();

  render() {
    return (
      <div className='events-map'>
        <div ref={(el) => this.mapContainer = el} className='mapContainer' />
      </div>
    );
  }
}
