import React, { Component } from 'react';
import apiClient from '../services/apiClient';
import { withAuth } from '../context/authContext';
import { EventPreview } from './';

class Events extends Component {
  state = { events: [], votes: [] };

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
      const { userId } = this.props;
      const eventsResponse = await apiClient.getEvents();
      const voteResponse = await apiClient.getVotes(userId);
      const { events } = eventsResponse.data;
      const { votes } = voteResponse.data;
      this.setState({ events, votes });
    } catch(error) {
      console.log(error);
    }
  }

  render() {
    const { events, votes } = this.state;
    const { userId } = this.props;
    return (
      <div>
        <h1>Events</h1>
        <EventPreviews events={events} userId={userId} votes={votes} deleteEvent={this.deleteEvent} />
      </div>
    );
  }
}

const EventPreviews = ({ events, userId, votes, deleteEvent }) => {
  return (
    <div className='event-previews'>
      {events.map((event, i) => {
        const vote = votes.find((vote) => vote.event === event._id);
        return <EventPreview key={event.data.name + i} event={event} userId={userId} vote={vote} deleteEvent={deleteEvent} />
      })}
    </div>
  )
};

export default withAuth(Events);
