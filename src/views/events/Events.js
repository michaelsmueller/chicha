import React, { Component } from 'react';
import apiClient from '../../services/apiClient';
import { generate } from 'shortid';
import { Loading, EventsMap, EventPreview, SortFilterSearch } from '../';
import { DragToResizeDrawer } from '../../components/';
import { filterEvents } from '../../helpers/filter';

export default class Events extends Component {
  state = { events: [], votes: [], filterBy: null, searchBy: null, mapKey: null };

  updateEvents = (events) => this.setState({ events, mapKey: generate() });
  setFilter = (filterBy) => this.setState({ filterBy, mapKey: generate() });

  setSearch = (searchBy) => {
    console.log('Events, setting searchBy', searchBy);
    this.setState({ searchBy, mapKey: generate() });
    apiClient.searchEvents(searchBy)
      .then((response) => {
        console.log('response', response);
      })
      .catch((error) => console.log(error))
  }

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
    const { events, votes, filterBy, searchBy, mapKey } = this.state;
    const { userId } = this.props;
    const filteredEvents = filterEvents(events, filterBy);
    console.log('Events render, searchBy value', searchBy);
    return (
      <div className='events-map-and-listings'>
        <EventsMap events={filteredEvents} key={mapKey} />
        <DragToResizeDrawer>
          <div className='events'>
            <h1 className='title'>Events in Barcelona</h1>
            {events.length
              ? <SortFilterSearch
                  events={events}
                  updateEvents={this.updateEvents}
                  setFilter={this.setFilter}
                  filterBy={filterBy}
                  setSearch={this.setSearch}
                  searchBy={searchBy}
                />
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
