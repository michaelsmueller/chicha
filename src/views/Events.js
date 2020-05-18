import React, { Component } from 'react';
import apiClient from '../services/apiClient';
import { withAuth } from '../context/authContext';
import { EventPreview } from './';

class Events extends Component {
  state = { events: [], user: {}, votes: [] };

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

      const voteResponse = await apiClient.getVotes(userId);
      const { votes } = voteResponse.data;

      console.log('Events, votes received', votes);
      this.setState({ events, user, votes });
    } catch(error) {
      console.log(error);
    }
  }

  render() {
    const { events, user, votes } = this.state;
    return (
      <div>
        <h1>Events</h1>
        <EventPreviews events={events} user={user} votes={votes} deleteEvent={this.deleteEvent} />
      </div>
    );
  }
}

const EventPreviews = ({ events, user, votes, deleteEvent }) => {
  return (
    <div className='event-previews'>
      {events.map((event, i) => {
        const vote = votes.find((vote) => vote.event === event._id);
        return <EventPreview key={event.data.name + i} event={event} user={user} vote={vote} deleteEvent={deleteEvent} />
      })}
    </div>
  )
};

export default withAuth(Events);
