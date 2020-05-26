import React, { Component } from 'react';
import apiClient from '../../services/apiClient';
import { EventsMap, EventPreview, Modal, SortOptions } from '../';

export default class Events extends Component {
  state = { events: [], votes: [], sortBy: null, modalIsOpen: false,  };

  toggleModal = () => this.setState({ modalIsOpen: !this.state.modalIsOpen })

  sort = (sortBy) => {
    const sortedEvents = [...this.state.events];
    switch (sortBy) {
      case 'date':
        sortedEvents.sort((a, b) => new Date(a.data.start_time) - new Date(b.data.start_time));
        break;
      case 'vote':
        sortedEvents.sort((a, b) => b.votes - a.votes);
        break;
      default:
        throw new Error('error attempting to sort');
    }
    this.setState({ events: sortedEvents, sortBy, modalIsOpen: false });
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
    const { events, votes, sortBy, modalIsOpen } = this.state;
    const { userId } = this.props;
    return (
      <div className='events-map-and-listings'>
        <EventsMap events={events} key={events.length} />
        <div className='events'>
          <h1 className='title'>Events in Barcelona</h1>
          <Modal show={modalIsOpen} title='Sort' onClose={this.toggleModal} >
            <SortOptions sort={this.sort} sortBy={sortBy} />
          </Modal>
          <SortFilterSearchButtons sortBy={sortBy} toggleModal={this.toggleModal} />
          <EventPreviews events={events} userId={userId} votes={votes} deleteEvent={this.deleteEvent} />
        </div> 
      </div>
    )
  }
}

const SortFilterSearchButtons = ({ sortBy, toggleModal }) => {
  return (
    <div className='sort-filter-search'>
      <button onClick={toggleModal}>{ sortBy ? `By ${sortBy}` : 'Sort' }</button>
      <button>Dates</button>
      <button>Search</button>
    </div>
  )
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
