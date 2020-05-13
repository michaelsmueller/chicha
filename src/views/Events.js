import React, { Component } from 'react';
import apiClient from '../services/apiClient';
import { EventPreview } from './';

export default class Events extends Component {
  state = { events: [] };

  deleteEvent = (_id) => {
    apiClient.deleteEvent(_id);
    const { events } = this.state;
    this.setState({ events: events.filter((event) => event._id !== _id) });
  }

  editEvent = (_id) => {
    console.log('editEvent');
    apiClient.editEvent(_id);
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

  eventPreviews = () => {
    const { events } = this.state;
    console.log('props', this.props);
    return (
      <div>
        {events.map((event, i) =>
          <EventPreview key={event.data.name + i} event={event} deleteEvent={this.deleteEvent} editEvent={this.editEvent} />)}
      </div>
    )
  }

  render() {
    return (
      <div>
        <h1>Events</h1>
        {this.eventPreviews()}
      </div>
    );
  }
}

