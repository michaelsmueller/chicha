import React from 'react';
import { getTitle } from '../../helpers/string';

const SortFilterSearchButtons = ({ sortBy, filterBy, query, search, isSearchOpen, openModal, openSearch }) => {
  const handleClick = (e) => {
    if (e.target.value === 'search') {
      if (isSearchOpen) search(query);
      else openSearch();
    } else openModal(e.target.value);
  }
  const sortButtonStyle = sortBy ? 'highlighted' : 'normal';
  const filterButtonStyle = filterBy ? 'highlighted' : 'normal';
  const searchButtonStyle = isSearchOpen ? 'highlighted' : 'normal';
  return (
    <div className='sort-filter-search'>
      <button className={sortButtonStyle} onClick={handleClick} value='sort'>{ sortBy ? getTitle(sortBy) : 'Sort by' }</button>
      <button className={filterButtonStyle} onClick={handleClick} value='date'>{ filterBy ? getTitle(filterBy) : 'Filter by' }</button>
      <button className={searchButtonStyle} onClick={handleClick} value='search'>Search</button>
    </div>
  )
};

export default SortFilterSearchButtons;
