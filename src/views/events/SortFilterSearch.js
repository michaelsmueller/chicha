import React, { Component } from 'react';
import { Modal } from '../../components/';
import { DateFilter, SearchBar, SortFilterSearchButtons, SortOptions } from '../';
import { getTitle } from '../../helpers/string';

export default class SortFilterSearch extends Component {
  state = { sortBy: null, query: null, activeModal: null, isSearchOpen: false };

  openModal = (activeModal) => this.setState({ activeModal });
  closeModal = () => this.setState({ activeModal: null });
  openSearch = () => this.setState({ isSearchOpen: true });

  onClear = () => {
    switch (this.state.activeModal) {
      case 'sort': this.clearSort(); break;
      case 'date': this.clearFilter(); break;
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
    this.setState({ sortBy: null, isSearchOpen: false });
    this.props.clearSearch();
  }

  sort = (sortBy) => {
    const sortedEvents = [...this.props.events];
    switch (sortBy) {
      case 'start-date': sortedEvents.sort((a, b) => new Date(a.data.start_time) - new Date(b.data.start_time)); break;
      case 'upvotes': sortedEvents.sort((a, b) => b.votes - a.votes); break;
      case 'newest': sortedEvents.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)); break;
      default: return;
    }
    this.props.saveEvents(sortedEvents);
    this.setState({ sortBy, activeModal: null });
  }

  filter = (filterBy) => {
    this.props.setFilter(filterBy);
    this.setState({ activeModal: null });
  }

  setSearch = (query) => this.setState({ query });

  search = (query) => {
    this.clearSort();
    this.clearFilter();
    this.props.setSearch(query);
  }

  render() {
    const { sortBy, activeModal, query, isSearchOpen } = this.state;
    const { filterBy } = this.props;
    return (
      <div className='sort-filter-search-container'>
        <Modal activeModal={activeModal} onClose={this.closeModal} title={sortFilterModalTitle(activeModal, sortBy, filterBy)} onClear={this.onClear}>
          {/* this should be a render prop here instead of passing in all the possibilities right ? */}
          <SortFilterModalContent
            activeModal={activeModal}
            sort={this.sort} sortBy={sortBy} clearSort={this.clearSort}
            filter={this.filter} filterBy={filterBy} clearFilter={this.clearFilter}
          />
        </Modal>
        {isSearchOpen && <SearchBar setSearch={this.setSearch} query={query} search={this.search} clearSearch={this.clearSearch} />}
        <SortFilterSearchButtons sortBy={sortBy} filterBy={filterBy} query={query} search={this.search} isSearchOpen={isSearchOpen} openModal={this.openModal} openSearch={this.openSearch} />
      </div>
    );
  }
}

const sortFilterModalTitle = (activeModal, sortBy, filterBy) => {
  switch (activeModal) {
    case 'sort': return sortBy ? getTitle(sortBy) : 'Sort by';
    case 'date': return filterBy ? getTitle(filterBy) : 'Filter by';
    default: return;
  }
};

const SortFilterModalContent = ({ activeModal, sort, sortBy, clearSort, filter, filterBy, clearFilter }) => {
  switch (activeModal) {
    case 'sort': return <SortOptions sort={sort} sortBy={sortBy} onClear={clearSort} />
    case 'date': return <DateFilter filter={filter} filterBy={filterBy} onClear={clearFilter} />
    default: return;
  }
};
