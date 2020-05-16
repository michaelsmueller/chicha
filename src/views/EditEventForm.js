import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import apiClient from '../services/apiClient';
import { getLocalDateTime, getUtcDateTime } from '../helpers/dateTime';

class EditEventForm extends Component {
  state = {
    name: this.props.data.name,
    source: this.props.data.cover.source,
    start_time: this.props.data.start_time,
    start_time_local: '',
    end_time: this.props.data.end_time,
    end_time_local: '',
    description: this.props.data.description,
    ticket_uri: this.props.data.ticket_uri,
    place: this.props.data.place.name,
    street: this.props.data.place.location.street,
    city: this.props.data.place.location.city,
    latitude: this.props.data.place.location.latitude,
    longitude: this.props.data.place.location.longitude,
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    await this.setUtcDateTimes();
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
      .then((response) => this.props.history.push(`/events/${id}`))
      .catch((error) => console.log(error))
  };

  handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

  componentDidMount = () => this.setLocalDateTimes();

  setLocalDateTimes = () => {
    const { start_time, end_time } = this.state;
    const start_time_local = getLocalDateTime(start_time);
    const end_time_local = getLocalDateTime(end_time);
    this.setState({ start_time_local, end_time_local });
  }

  setUtcDateTimes = () => {
    const { start_time_local, end_time_local } = this.state;
    const start_time = getUtcDateTime(start_time_local);
    const end_time = getUtcDateTime(end_time_local);
    this.setState({ start_time, end_time });
  }

  render() {
    const { name, source, start_time_local, end_time_local, description, ticket_uri, place, street, city, latitude, longitude } = this.state;
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

          <label htmlFor='start_time_local'>Start date & time</label>
          <input
            type='datetime-local'
            name='start_time_local'
            id='start_time_local'
            value={start_time_local || ''}
            onChange={this.handleChange}
          />

          <label htmlFor='end_time_local'>End date & time</label>
          <input
            type='datetime-local'
            name='end_time_local'
            id='end_time_local'
            value={end_time_local || ''}
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

export default withRouter(EditEventForm);
