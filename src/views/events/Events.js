import React, { Component } from 'react';
import apiClient from '../../services/apiClient';
import { DateFilter, EventsMap, EventPreview, Modal, SortOptions } from '../';
import { DragToResizeDrawer } from '../../components/';
import { isToday, isThisWeek, isThisWeekend } from '../../helpers/dateTime';
import { getTitle } from '../../helpers/string';

export default class Events extends Component {
  state = { events: [], eventsBackup: [], votes: [], sortBy: null, filterBy: null, activeModal: null };

  openModal = (activeModal) => this.setState({ activeModal })
  closeModal = () => this.setState({ activeModal: null })

  onClear = () => {
    switch (this.state.activeModal) {
      case 'sort': this.clearSort();
        break;
      case 'date': this.clearFilter();
        break;
      default: return;
    }
  }

  clearSort = () => {
    this.sort('upvotes');
    this.setState({ sortBy: null });
    this.closeModal();
  }

  clearFilter = () => {
    const { eventsBackup } = this.state;
    this.setState({ events: eventsBackup, filterBy: null });
    this.closeModal();
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
      default: return;
    }
    this.setState({ events: sortedEvents, sortBy });
    this.closeModal();
  }

  filter = (filterBy) => {
    const { eventsBackup } = this.state;
    const filteredEvents = [];
    switch (filterBy) {
      case 'today':
        filteredEvents.push(...eventsBackup.filter((event) => isToday(new Date(event.data?.start_time))));
        break;
      case 'this-week':
        filteredEvents.push(...eventsBackup.filter((event) => isThisWeek(new Date(event.data?.start_time))));
        break;
      case 'this-weekend':
        filteredEvents.push(...eventsBackup.filter((event) => isThisWeekend(new Date(event.data?.start_time))));
        break;
      default: return;
    }
    this.setState({ events: filteredEvents, filterBy });
    this.closeModal();
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
      this.setState({ events, eventsBackup: events, votes });
    } catch(error) {
      console.log(error);
    }
  }

  render() {
    const { events, votes, filterBy, sortBy, activeModal } = this.state;
    const { userId } = this.props;
    return (
      <div className='events-map-and-listings'>
        <EventsMap events={events} key={`${events.length} + ${sortBy} + ${filterBy}`} />
        <DragToResizeDrawer>
          <div className='events'>
            <h1 className='title'>Events in Barcelona</h1>
            <Modal show={activeModal} onClose={this.closeModal} title={modalTitle(activeModal, sortBy, filterBy)} onClear={this.onClear} >
              <ModalContent
                activeModal={activeModal} 
                sort={this.sort} sortBy={sortBy} clearSort={this.clearSort}
                filter={this.filter} filterBy={filterBy} clearFilter={this.clearFilter}
              />
            </Modal>
            <SortFilterSearchButtons sortBy={sortBy} filterBy={filterBy} openModal={this.openModal} />
            <EventPreviews events={events} userId={userId} votes={votes} deleteEvent={this.deleteEvent} />
          </div>
        </DragToResizeDrawer>
      </div>
    )
  }
}

const modalTitle = (activeModal, sortBy, filterBy) => {
  switch (activeModal) {
    case 'sort':
      return sortBy ? getTitle(sortBy) : 'Sort by';
    case 'date':
      return filterBy ? getTitle(filterBy) : 'Filter by';
    default:
      return 'title';
  }
}

const ModalContent = ({ activeModal, sort, sortBy, clearSort, filter, filterBy, clearFilter }) => {
  switch (activeModal) {
    case 'sort':
      return <SortOptions sort={sort} sortBy={sortBy} onClear={clearSort} />
    case 'date':
      return <DateFilter filter={filter} filterBy={filterBy} onClear={clearFilter} />
    default:
      return <div>default ModalContent</div>
  }
}

const SortFilterSearchButtons = ({ sortBy, filterBy, openModal }) => {
  const handleClick = (e) => openModal(e.target.value);
  const sortButtonStyle = { backgroundColor: sortBy ? '#ccfcff' : 'white' };
  const filterButtonStyle = { backgroundColor: filterBy ? '#ccfcff' : 'white' };
  return (
    <div className='sort-filter-search'>
      <button style={sortButtonStyle} onClick={handleClick} value='sort'>{ sortBy ? getTitle(sortBy) : 'Sort by' }</button>
      <button style={filterButtonStyle} onClick={handleClick} value='date'>{ filterBy ? getTitle(filterBy) : 'Filter by' }</button>
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
