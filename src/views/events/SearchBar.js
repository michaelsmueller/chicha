import React, { Component } from 'react';

export default class SearchBar extends Component {
  state = { query: '' };

  handleInput = (e) => {
    const { value } = e.target;
    this.setState({ query: value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { query } = this.state;
    console.log('SearchBar submitting search for', query);
    this.props.search(query);
  };

  handleClick = (e) => {
    e.preventDefault();
    console.log('cancel search');
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className='search-bar'>
        <i className='material-icons'>search</i>
        <input type='text' id='query' autoComplete='off' onChange={this.handleInput} />
        <button type='button' onClick={this.handleClick}><i className='material-icons'>close</i></button>
      </form>
    );
  }
}
