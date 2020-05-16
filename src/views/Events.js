import React, { Component } from 'react';
import apiClient from '../services/apiClient';
import { EventPreview } from './';

export default class Events extends Component {
  state = { events: [] };

  deleteEvent = (eventId) => {
    apiClient.deleteEvent(eventId);
    const { events } = this.state;
    this.setState({ events: events.filter((event) => event._id !== eventId) });
  }

  componentDidMount = () => {
    apiClient
      .getEvents()
      .then(({ data }) => {
        const { events } = data;
        this.setState({ events });
      })
      .catch((error) => console.log(error))
  }

  render() {
    const { events } = this.state;
    return (
      <div>
        <h1>Events</h1>
        <EventPreviews events={events} deleteEvent={this.deleteEvent} />
      </div>
    );
  }
}

const EventPreviews = ({ events, deleteEvent }) => {
  return (
    <div className='event-previews'>
      {events.map((event, i) =>
        <EventPreview key={event.data.name + i} event={event} deleteEvent={deleteEvent} />)}
    </div>
  )
};
