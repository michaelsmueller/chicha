import React, { Component } from 'react';
import apiClient from '../../services/apiClient';
import { generate } from 'shortid';
import { Theme } from "../../context/themeContext";
import { Loading, EventsMap, EventPreview, SortFilterSearch } from '../';
import { DragToResizeDrawer } from '../../components/';
import { filterEvents } from '../../helpers/filter';

export default class Events extends Component {
  state = { events: null, votes: null, filterBy: null, query: null, mapKey: null };

  saveEvents = (events) => this.setState({ events, mapKey: generate() })

  setFilter = (filterBy) => this.setState({ filterBy, mapKey: generate() })

  setSearch = (query) => {
    this.setState({ query, mapKey: generate() });
    apiClient.searchEvents(query)
      .then(({ data: { events } }) => this.setState({ events, mapKey: generate() }))
      .catch((error) => console.log(error))
  }

  clearSearch = () => {
    apiClient.getEvents()
      .then(({ data: { events } }) => this.setState({ events, filterBy: null, mapKey: generate() }))
      .catch((error) => console.log(error))
  }

  deleteEvent = (eventId) => {
    apiClient.deleteEvent(eventId)
      .then(() => {
        const { events } = this.state;
        this.setState({ events: events.filter((event) => event._id !== eventId), mapKey: generate() });
      })
      .catch((error) => console.log(error))
  }

  getVotes = async () => {
    try {
      const voteResponse = await apiClient.getVotes();
      const { votes } = voteResponse.data;
      this.setState({ votes });
    } catch (error) {
      console.log(error);
    }
  }

  componentDidMount = async () => {
    try {
      await this.getVotes();
      const { events } = this.props;
      this.setState({ events, mapKey: generate() });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { events, votes, filterBy, mapKey } = this.state;
    const { userId } = this.props;
    const filteredEvents = filterEvents(events, filterBy);
    return (
      <div className='events-map-and-listings'>
        <Theme.Consumer>{({ theme }) => <EventsMap events={filteredEvents} key={mapKey} theme={theme} />}</Theme.Consumer>
        <DragToResizeDrawer>
          <div className='events'>
            <h1 className='title'>Events in Barcelona</h1>
            {events
              ? <>
                <SortFilterSearch events={events} saveEvents={this.saveEvents} setFilter={this.setFilter} filterBy={filterBy} setSearch={this.setSearch} clearSearch={this.clearSearch} />
                <EventPreviews events={filteredEvents} userId={userId} votes={votes} deleteEvent={this.deleteEvent} />
                </>
              : <Loading />
            }
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
