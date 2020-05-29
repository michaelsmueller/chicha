import React, { Component } from 'react';
import apiClient from '../../services/apiClient';
import { EventsMap, EventPreview, SortFilterSearch } from '../';
import { DragToResizeDrawer } from '../../components/';

export default class Events extends Component {
  state = { events: [], votes: [] };

  updateEvents = (events) => {
    this.setState({ events })
  }

  deleteEvent = (eventId) => {
    apiClient.deleteEvent(eventId)
      .then(() => {
        const { events } = this.state;
        this.setState({ events: events.filter((event) => event._id !== eventId) });    
      })
      .catch((error) => console.log(error))
  }

  componentDidMount = async () => {
    const { events, userId } = this.props;
    try {
      const voteResponse = await apiClient.getVotes(userId);
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
      <div className='events-map-and-listings'>
        {/* <EventsMap events={events} key={`${events.length} + ${sortBy} + ${filterBy}`} /> */}
        <EventsMap events={events} key={`${events.length}`} />
        <DragToResizeDrawer>
          <div className='events'>
            <h1 className='title'>Events in Barcelona</h1>
            {events.length && <SortFilterSearch events={events} updateEvents={this.updateEvents} />}
            <EventPreviews events={events} userId={userId} votes={votes} deleteEvent={this.deleteEvent} />
          </div>
        </DragToResizeDrawer>
      </div>
    )
  }
}

const EventPreviews = ({ events, userId, votes, deleteEvent }) => {
  return (
    <div className='event-previews'>
      {events.map((event, index) => {
        const vote = votes.find((vote) => vote.event === event._id);
        return <EventPreview key={event._id} rank={index} event={event} userId={userId} vote={vote} deleteEvent={deleteEvent} />
      })}
    </div>
  )
};
