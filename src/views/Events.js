import React, { Component } from 'react';
import apiClient from '../services/apiClient';
import { withAuth } from '../context/authContext';
import { EventPreview } from './';

class Events extends Component {
  state = { events: [], user: {} };

  deleteEvent = (eventId) => {
    apiClient.deleteEvent(eventId)
      .then(() => {
        const { events } = this.state;
        this.setState({ events: events.filter((event) => event._id !== eventId) });    
      })
      .catch((error) => console.log(error))
  }

  componentDidMount = async () => {
    try {
      const eventsResponse = await apiClient.getEvents();
      const { events } = eventsResponse.data;
      const { userId } = this.props;
      const userResponse = await apiClient.getUser(userId);
      const { user } = userResponse.data;
      this.setState({ events, user });
    } catch(error) {
      console.log(error);
    }
  }

  render() {
    const { events, user } = this.state;
    return (
      <div>
        <h1>Events</h1>
        <EventPreviews events={events} user={user} deleteEvent={this.deleteEvent} />
      </div>
    );
  }
}

const EventPreviews = ({ events, user, deleteEvent }) => {
  return (
    <div className='event-previews'>
      {events.map((event, i) =>
        <EventPreview key={event.data.name + i} event={event} user={user} deleteEvent={deleteEvent} />)}
    </div>
  )
};

export default withAuth(Events);
