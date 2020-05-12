import React, { Component } from 'react';
import apiClient from '../services/apiClient';
import { EventPreview } from './';

export default class Events extends Component {
  state = { events: [] };

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
        <EventPreviews events={events} />
      </div>
    );
  }
}

const EventPreviews = ({ events }) => {
  return (
    <div>
      {events.map((event, i) => <EventPreview key={event.data.name + i} event={event} />)}
    </div>
  )
}
