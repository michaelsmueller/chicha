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
      <form onSubmit={this.handleSubmit} className='search-bar'>
        <i className='material-icons'>search</i>
        <input type='text' id='query' autoComplete='off' onChange={this.handleInput} />
        <button type='button' onClick={this.handleClick}><i className='material-icons'>close</i></button>
      </form>
    );
  }
}
