import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import withLoading from '../components/withLoading';
import apiClient from '../services/apiClient';

class EditEventForm extends Component {
  state = {
    name: this.props.data.name,
    source: this.props.data.cover.source,
    start_time: this.props.data.start_time,
    end_time: this.props.data.end_time,
    description: this.props.data.description,
    ticket_uri: this.props.data.ticket_uri,
    place: this.props.data.place.name,
    street: this.props.data.place.location.street,
    city: this.props.data.place.location.city,
    latitude: this.props.data.place.location.latitude,
    longitude: this.props.data.place.location.longitude,
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, source, start_time, end_time, description, ticket_uri, place, street, city, latitude, longitude } = this.state;
    const event = {
      data: {
        name,
        cover: { source },
        start_time,
        end_time,
        description,
        ticket_uri,
        place: { name: place, location: { street, city, country: 'Spain', latitude, longitude } },
     },
    };    
    const { id } = this.props;
    apiClient
      .editEvent(id, event)
      .then((response) => {
        this.props.history.push(`/events/${id}`);
      })
      .catch((error) => console.log(error))
  };

  cleanForm = () => this.setState({ event: {} });

  handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { name, source, start_time, end_time, description, ticket_uri, place, street, city, latitude, longitude } = this.state;
    return (
      <div className='edit-event'>
        <h1>Edit Event</h1>
        <form onSubmit={this.handleSubmit}>

          <label htmlFor='name'>Name</label>
          <input
            type='text'
            name='name'
            id='name'
            placeholder={name}
            value={name || ''}
            onChange={this.handleChange}
          />

          <label htmlFor='source'>Image</label>
          <input
            type='text'
            name='source'
            id='source'
            placeholder={source}
            value={source || ''}
            onChange={this.handleChange}
          />

          <label htmlFor='start_time'>Start date & time</label>
          <input
            type='datetime'
            name='start_time'
            id='start_time'
            value={start_time || ''}
            onChange={this.handleChange}
          />

          <label htmlFor='end_time'>End date & time</label>
          <input
            type='datetime'
            name='end_time'
            id='end_time'
            value={end_time || ''}
            onChange={this.handleChange}
          />

          <label htmlFor='name'>Description</label>
          <textarea
            type='text'
            name='description'
            id='description'
            placeholder={description}
            value={description || ''}
            onChange={this.handleChange}
          />

          <label htmlFor='ticket_uri'>Ticket purchase link</label>
          <input
            type='text'
            name='ticket_uri'
            id='ticket_uri'
            placeholder={ticket_uri}
            value={ticket_uri || ''}
            onChange={this.handleChange}
          />

          <label htmlFor='ticket_uri'>Place</label>
          <input
            type='text'
            name='place'
            id='place'
            placeholder={place}
            value={place || ''}
            onChange={this.handleChange}
          />

          <label htmlFor='ticket_uri'>Street</label>
          <input
            type='text'
            name='street'
            id='street'
            placeholder={street}
            value={street || ''}
            onChange={this.handleChange}
          />

          <label htmlFor='City'>City</label>
          <input
            type='text'
            name='city'
            id='city'
            placeholder={city}
            value={city || ''}
            onChange={this.handleChange}
          />

          <label htmlFor='ticket_uri'>Latitude</label>
          <input
            type='number'
            name='latitude'
            id='latitude'
            placeholder={latitude}
            value={latitude || ''}
            onChange={this.handleChange}
          />

          <label htmlFor='ticket_uri'>Longitude</label>
          <input
            type='number'
            name='longitude'
            id='longitude'
            placeholder={longitude}
            value={longitude || ''}
            onChange={this.handleChange}
          />

          <button type='submit' value='submit'>Save event</button>
        </form>
      </div>
    );
  }  
}

export default withRouter(withLoading(EditEventForm));
