import React, { Component } from 'react';

class SortOptions extends Component {
  state = { selectedOption: this.props.sortBy ? this.props.sortBy : 'date' };

  handleChange = (e) => this.setState({ selectedOption: e.target.value });

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.sort(this.state.selectedOption);
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.sortBy !== this.props.sortBy) this.setState({ selectedOption: null });
  }

  render() {
    const { selectedOption } = this.state;
    return (
      <form className='sort-options' onSubmit={this.handleSubmit} >
        <div className='sort-option'>
          <p>Start date</p>
          <input
            type='radio'
            name='start-date'
            value='start-date'
            checked={selectedOption === 'start-date'}
            onChange={this.handleChange}
          />
        </div>
        <div className='sort-option'>
          <p>Upvotes</p>
          <input type='radio'
            name='upvotes'
            value='upvotes'
            checked={selectedOption === 'upvotes'}
            onChange={this.handleChange}
          />
        </div>
        <div className='sort-option'>
          <p>Newest</p>
          <input type='radio'
            name='recent-added'
            value='newest'
            checked={selectedOption === 'newest'}
            onChange={this.handleChange}
          />
        </div>
        <button type='submit' value='submit'>Sort</button>
      </form>
    );
  }
}

export default SortOptions;
