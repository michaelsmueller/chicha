import React, { Component } from 'react';

class SortOptions extends Component {
  state = { selectedOption: this.props.sortBy ? this.props.sortBy : 'date' };

  handleChange = (e) => this.setState({ selectedOption: e.target.value });

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.sort(this.state.selectedOption);
  }

  render() {
    const { selectedOption } = this.state;
    return (
      <form className='sort-options' onSubmit={this.handleSubmit} >
        <div className='sort-option'>
          <p>By date</p>
          <input
            type='radio'
            name='date'
            value='date'
            checked={selectedOption === 'date'}
            onChange={this.handleChange}
          />
        </div>
        <div className='sort-option'>
          <p>By vote</p>
          <input type='radio'
            name='vote'
            value='vote'
            checked={selectedOption === 'vote'}
            onChange={this.handleChange}
          />
        </div>
        <button type='submit' value='submit'>Sort</button>
      </form>
    );
  }
}

export default SortOptions;
