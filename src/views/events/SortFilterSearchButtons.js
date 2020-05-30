import React from 'react';
import { getTitle } from '../../helpers/string';

const SortFilterSearchButtons = ({ sortBy, filterBy, openModal, openSearch }) => {
  const handleClick = (e) => {
    if (e.target.value === 'search') openSearch();
    else openModal(e.target.value);
  }
  const sortButtonStyle = { backgroundColor: sortBy ? '#ccfcff' : 'white' };
  const filterButtonStyle = { backgroundColor: filterBy ? '#ccfcff' : 'white' };
  return (
    <div className='sort-filter-search'>
      <button style={sortButtonStyle} onClick={handleClick} value='sort'>{ sortBy ? getTitle(sortBy) : 'Sort by' }</button>
      <button style={filterButtonStyle} onClick={handleClick} value='date'>{ filterBy ? getTitle(filterBy) : 'Filter by' }</button>
      <button onClick={handleClick} value='search'>Search</button>
    </div>
  )
};

export default SortFilterSearchButtons;
