import React, { Component } from 'react';
import { generate } from 'shortid';
import apiClient from '../../services/apiClient';
import { Loading } from '../';
import { EventsMap, EventPreview, SortFilterSearch } from '../';
import { DragToResizeDrawer } from '../../components/';
import { filterEvents } from '../../helpers/filter';

export default class Events extends Component {
  state = { events: [], votes: [], filterBy: null, mapKey: null };

  updateEvents = (events) => this.setState({ events, mapKey: generate() });

  setFilter = (filterBy) => this.setState({ filterBy, mapKey: generate() });

  deleteEvent = (eventId) => {
    apiClient.deleteEvent(eventId)
      .then(() => {
        const { events } = this.state;
        this.setState({ events: events.filterBy((event) => event._id !== eventId) });    
      })
      .catch((error) => console.log(error))
  }

  componentDidMount = async () => {
    const { events, userId } = this.props;
    try {
      const voteResponse = await apiClient.getVotes(userId);
      const { votes } = voteResponse.data;
      this.setState({ events, votes, mapKey: generate() });
    } catch(error) {
      console.log(error);
    }
  }

  render() {
    const { events, votes, filterBy, mapKey } = this.state;
    const { userId } = this.props;
    const filteredEvents = filterEvents(events, filterBy);
    return (
      <div className='events-map-and-listings'>
        <EventsMap events={filteredEvents} key={mapKey} />
        <DragToResizeDrawer>
          <div className='events'>
            <h1 className='title'>Events in Barcelona</h1>
            {events.length
              ? <SortFilterSearch events={events} updateEvents={this.updateEvents} setFilter={this.setFilter} filterBy={filterBy} />
              : <Loading />}
            <EventPreviews events={filteredEvents} userId={userId} votes={votes} deleteEvent={this.deleteEvent} />
          </div>
        </DragToResizeDrawer>
      </div>
    );
  }
}

const EventPreviews = ({ events, userId, votes, deleteEvent }) => {
  return (
    <div className='event-previews'>
      {events.map((event, index) => {
        const vote = votes.find((vote) => vote.event === event._id);
        return <EventPreview key={event._id} rank={index} event={event} userId={userId} vote={vote} deleteEvent={deleteEvent} />;
      })}
    </div>
  );
};
