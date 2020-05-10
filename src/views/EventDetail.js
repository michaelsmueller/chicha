import React, { Component } from 'react';
import apiClient from '../services/apiClient';

export default class EventDetail extends Component {
  state = {
    event: {},
    isLoading: true,   // I will refactor this away
 };

  componentDidMount = () => {
    const { id } = this.props.match.params;
    apiClient
      .getEvent(id)
      .then(({ data }) => {
        const { event } = data;
        this.setState({ event, isLoading: false });
      })
      .catch((error) => console.log(error))
  }

  render() {
    const { event, isLoading } = this.state;
    if (isLoading) {
      return <div>Loading....</div>
    } else {
      return <EventPage event={event} />
    }
  }
}

const EventPage = ({ event }) => {
  const { data: { name, description, cover, start_time, end_time, place } } = event;
  return (
    <div className='event-preview'>
      <div className='event-image-container'>
        <img alt={name} src={cover.source} />
      </div>
      <div className='event-info'>
        <h1 className='name'>{name}</h1>
        <h2 className='times'>{start_time} – {end_time}</h2>
        <h2 className='place'>{place.name}</h2>
        <p className='street'>{place.street}</p>
        <p className='description'>{description}</p>
      </div>
    </div>
  );
}
