import React, { Component } from 'react';
import { DateFilter, Modal, SortOptions } from '../';
import { isToday, isThisWeek, isThisWeekend } from '../../helpers/dateTime';
import { getTitle } from '../../helpers/string';

export default class SortFilterSearch extends Component {
  state = { eventsBackup: [], sortBy: null, filterBy: null, activeModal: null };

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
    this.props.updateEvents(this.state.eventsBackup);
    this.setState({ filterBy: null });
    this.closeModal();
  }

  sort = (sortBy) => {
    const sortedEvents = [...this.props.events];
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
    this.props.updateEvents(sortedEvents);
    this.setState({ sortBy });
    this.closeModal();
  }

  filter = (filterBy) => {
    const { eventsBackup } = this.state;
    console.log('eventsBackup', eventsBackup);
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
    this.props.updateEvents(filteredEvents);
    this.setState({ filterBy });
    this.closeModal();
  }

  // should this be done with Memoization_
  componentDidMount = () => this.setState({ eventsBackup: this.props.events });

  render() {
    const { filterBy, sortBy, activeModal } = this.state;
    return (
      <div className='sort-filter-search-container'>
        <Modal show={activeModal} onClose={this.closeModal} title={modalTitle(activeModal, sortBy, filterBy)} onClear={this.onClear} >
          <ModalContent
            activeModal={activeModal} 
            sort={this.sort} sortBy={sortBy} clearSort={this.clearSort}
            filter={this.filter} filterBy={filterBy} clearFilter={this.clearFilter}
          />
        </Modal>
        <SortFilterSearchButtons sortBy={sortBy} filterBy={filterBy} openModal={this.openModal} />
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
