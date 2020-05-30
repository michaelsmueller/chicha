import React, { Component } from 'react';

export default class SearchBar extends Component {
  state = { query: null };

  handleInput = (e) => this.setState({ query: e.target.value });

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.search(this.state.query);
  };

  handleClick = (e) => this.props.clearSearch();

  render() {
    return (
      <div className='search-bar'>
      <form onSubmit={this.handleSubmit}>
        <input type='text' id='query' autoComplete='off' placeholder='music' onChange={this.handleInput} />
        <i className='material-icons search-icon'>search</i>
        <i className='material-icons close-icon' onClick={this.handleClick}>close</i>
      </form>
      </div>
    );
  }
}
