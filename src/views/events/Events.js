import React, { Component } from 'react';
import shortid from 'shortid';
import apiClient from '../../services/apiClient';
import { EventsMap, EventPreview, SortFilterSearch } from '../';
import { DragToResizeDrawer } from '../../components/';

export default class Events extends Component {
  state = { events: [], votes: [], mapKey: 'foo' };

  updateEvents = (events) => {
    this.setState({ events });
    this.updateMapKey();
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
      this.updateMapKey();
    } catch(error) {
      console.log(error);
    }
  }

  updateMapKey = () => this.setState({ mapKey: shortid.generate() })

  render() {
    const { events, votes, mapKey } = this.state;
    const { userId } = this.props;
    return (
      <div className='events-map-and-listings'>
        <EventsMap events={events} key={mapKey} />
        <DragToResizeDrawer>
          <div className='events'>
            <h1 className='title'>Events in Barcelona</h1>
            {events.length ? <SortFilterSearch events={events} updateEvents={this.updateEvents} /> : null }
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
