import React, { Component } from 'react';
import { DateFilter, Modal, SearchBar, SortFilterSearchButtons, SortOptions } from '../';
import { getTitle } from '../../helpers/string';

export default class SortFilterSearch extends Component {
  state = { sortBy: null, activeModal: null };

  openModal = (activeModal) => this.setState({ activeModal })
  closeModal = () => this.setState({ activeModal: null })

  onClear = () => {
    switch (this.state.activeModal) {
      case 'sort': this.clearSort(); break;
      case 'date': this.clearFilter(); break;
      case 'search': this.clearSearch(); break;
      default: return;
    }
  }

  clearSort = () => {
    this.sort('upvotes');
    this.setState({ sortBy: null, activeModal: null });
  }

  clearFilter = () => {
    this.props.setFilter(null);
    this.setState({ activeModal: null });
  }

  clearSearch = () => {
    this.props.setSearch(null);
  }

  sort = (sortBy) => {
    const sortedEvents = [...this.props.events];
    switch (sortBy) {
      case 'start-date': sortedEvents.sort((a, b) => new Date(a.data.start_time) - new Date(b.data.start_time)); break;
      case 'upvotes': sortedEvents.sort((a, b) => b.votes - a.votes); break;
      case 'newest': sortedEvents.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)); break;
      default: return;
    }
    this.props.updateEvents(sortedEvents);
    this.setState({ sortBy, activeModal: null });
  }

  filter = (filterBy) => {
    this.props.setFilter(filterBy);
    this.setState({ activeModal: null });
  }

  search = (searchBy) => {
    console.log('SortFilterSearch searching for ', searchBy)
    this.props.setSearch(searchBy);
  }

  render() {
    const { sortBy, activeModal } = this.state;
    const { filterBy, searchBy } = this.props;
    return (
      <div className='sort-filter-search-container'>
        <Modal activeModal={activeModal} onClose={this.closeModal} title={modalTitle(activeModal, sortBy, filterBy)} onClear={this.onClear} >
          <ModalContent
            activeModal={activeModal}
            sort={this.sort} sortBy={sortBy} clearSort={this.clearSort}
            filter={this.filter} filterBy={filterBy} clearFilter={this.clearFilter}
          />
        </Modal>
        <SortFilterSearchButtons sortBy={sortBy} filterBy={filterBy} searchBy={searchBy} openModal={this.openModal} />
        <SearchBar search={this.search} searchBy={searchBy} />
      </div>
    );
  }
}

const modalTitle = (activeModal, sortBy, filterBy) => {
  switch (activeModal) {
    case 'sort': return sortBy ? getTitle(sortBy) : 'Sort by';
    case 'date': return filterBy ? getTitle(filterBy) : 'Filter by';
    default: return;
  }
};

const ModalContent = ({ activeModal, sort, sortBy, clearSort, filter, filterBy, clearFilter }) => {
  switch (activeModal) {
    case 'sort': return <SortOptions sort={sort} sortBy={sortBy} onClear={clearSort} />
    case 'date': return <DateFilter filter={filter} filterBy={filterBy} onClear={clearFilter} />
    default: return;
  }
};
