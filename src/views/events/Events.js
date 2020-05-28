import React, { Component } from 'react';
import apiClient from '../../services/apiClient';
import { EventsMap, EventPreview, Modal, SortOptions } from '../';

export default class Events extends Component {
  state = { events: [], votes: [], sortBy: undefined, modalIsOpen: false, isResizing: false, lastTouchY: 350, newHeight: {} };

  onTouchStart = (e) => {

    e.persist();
    // document.body.style.overflowY = 'hidden';
    // e.stopPropagation();
    // document.body.classList.add("no-sroll")
    // console.log('onTouchStart e', e.touches[0]);
    this.setState({ isResizing: true, lastDownY: e.clientY });
  }

  onTouchEnd = (e) => {
    // e.persist();
    // document.body.classList.add("no-sroll")
    // document.body.style.overflowY = 'hidden';
    // e.stopPropagation();
    // console.log('onTouchEnd y position', this.state.lastTouchY);
    this.setState({ isResizing: false });
  };

  onTouchMove = e => {
    // e.stopPropagation();
    // e.preventDefault();
    // document.body.style.overflowY = 'hidden';
    e.persist();
    // console.log('onTouchMove e', e.touches[0]);
    this.setState({ isResizing: true, lastTouchY: e.touches[0].clientY})
    // if (!this.state.isResizing) {
    //   return;
    // }
    // console.log('offsetTop', document.body.offsetTop);
    // console.log('offsetHeight', document.body.offsetHeight);
    // let offsetRight =
    //   document.body.offsetWidth - (e.clientX - document.body.offsetLeft);
    // let minHeight = 300;
    // let maxHeight = 10000;
    // if (offsetRight > minWidth && offsetRight < maxWidth) {
    //   this.setState({ newWidth: { width: offsetRight } });
    // }
  };

  toggleModal = () => this.setState({ modalIsOpen: !this.state.modalIsOpen })

  onClear = () => {
    this.sort('upvotes');
    this.setState({ sortBy: null });
  }

  sort = (sortBy) => {
    const sortedEvents = [...this.state.events];
    switch (sortBy) {
      case 'start-date':
        sortedEvents.sort((a, b) => new Date(a.data.start_time) - new Date(b.data.start_time));
        break;
      case 'upvotes':
        sortedEvents.sort((a, b) => b.votes - a.votes);
        break;
      case 'newest':
        sortedEvents.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        break;
      default:
        return;
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
    document.addEventListener('onTouchStart', this.onTouchStart, false);
    document.addEventListener('onTouchMove', this.onTouchMove, false);
    document.addEventListener('onTouchEnd', this.onTouchEnd, false);
    const { events, userId } = this.props;
    try {
      const voteResponse = await apiClient.getVotes(userId);
      const { votes } = voteResponse.data;
      this.setState({ events, votes });
    } catch(error) {
      console.log(error);
    }
  }

  componentWillUnmount = () => {
    document.removeEventListener('onTouchStart', this.onTouchStart);
    document.removeEventListener('onTouchMove', this.onTouchMove);
    document.removeEventListener('onTouchEnd', this.onTouchEnd);
  }

  render() {
    const { events, votes, sortBy, modalIsOpen } = this.state;
    const { userId } = this.props;
    console.log(this.state.lastTouchY);
    const maxHeight = window.innerHeight * 0.8;
    const marginTop = Math.max(0, this.state.lastTouchY < maxHeight ? this.state.lastTouchY : maxHeight );
    const draggerStyle = {
      backgroundColor: 'red',
      marginTop,
      overflow: this.state.isResizing ? 'hidden' : 'scroll',
    }
    return (
      <div className='events-map-and-listings'>
        <EventsMap events={events} key={`${events.length} + ${sortBy}`} />
        <div className='dragger' style={draggerStyle} onTouchStart={this.onTouchStart} onTouchMove={this.onTouchMove} onTouchEnd={this.onTouchEnd}>
          handle
          <div className='events'>
            <h1 className='title'>Events in Barcelona</h1>
            <Modal show={modalIsOpen} onClose={this.toggleModal} title={sortBy ? `By ${sortBy.replace('-', ' ')}` : 'Sort by'} onClear={this.onClear} >
              <SortOptions sort={this.sort} sortBy={sortBy} onClear={this.onClear} />
            </Modal>
            <SortFilterSearchButtons sortBy={sortBy} toggleModal={this.toggleModal} />
            <EventPreviews events={events} userId={userId} votes={votes} deleteEvent={this.deleteEvent} />
          </div>
        </div>
      </div>
    )
  }
}

const SortFilterSearchButtons = ({ sortBy, toggleModal }) => {
  const sortButtonStyle = { backgroundColor: sortBy ? '#ccfcff' : 'white' };
  return (
    <div className='sort-filter-search'>
      <button style={sortButtonStyle} onClick={toggleModal}>{ sortBy ? `By ${sortBy.replace('-', ' ')}` : 'Sort' }</button>
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
