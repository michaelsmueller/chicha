import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken=process.env.REACT_APP_MAPBOX_TOKEN;

export default class EventsMap extends Component {
  state = { lng: 2.1700556, lat: 41.3869959, zoom: 13 };

  componentDidMount = () => {
    const { lng, lat, zoom } = this.state;
 
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom,
    });

    map.on('move', () => {
      this.setState({
        lng: map.getCenter().lng.toFixed(4),
        lat: map.getCenter().lat.toFixed(4),
        zoom: map.getZoom().toFixed(2),
      });
    })
  }

  render() {
    const { lng, lat, zoom } = this.state;
    return (
      <div className='events-map'>
        <div ref={(el) => this.mapContainer = el} className='mapContainer' />
      </div>
    );
  }
}
