import React from 'react';

const SearchBar = ({ query, setSearch, search, clearSearch }) => {

  const handleInput = (e) => setSearch(e.target.value);

  const handleClick = (e) => clearSearch();

  const handleSubmit = (e) => {
    e.preventDefault();
    search(query);
  };

  return (
    <div className='search-bar'>
      <form onSubmit={handleSubmit} autoComplete='off'>
        <input type='text' id='query' autoComplete='off' placeholder='music' onChange={handleInput} />
        <i className='material-icons search-icon'>search</i>
        <i className='material-icons close-icon' onClick={handleClick}>close</i>
      </form>
    </div>
  );
}

export default SearchBar;
