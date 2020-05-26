import React, { Component } from 'react';

class SortOptions extends Component {
  state = {
    selectedOption: this.props.sorted ? this.props.sorted : 'by-date'
  };

  handleChange = (e) => this.setState({ selectedOption: e.target.value });

  handleSubmit = (e) => {
    e.preventDefault();
    const { selectedOption } = this.state;
    const { sortByVote, sortByDate } = this.props;
    console.log('submit option', selectedOption);
    if (selectedOption === 'by-date') sortByDate();
    else sortByVote();
  }

  render() {
    const { selectedOption } = this.state;
    return (
      <form className='sort-options' onSubmit={this.handleSubmit} >
        <div className='sort-option'>
          <p>By date</p>
          <input
            type='radio'
            name='by-date'
            value='by-date'
            checked={selectedOption === 'by-date'}
            onChange={this.handleChange}
          />
        </div>
        <div className='sort-option'>
          <p>By vote</p>
          <input type='radio'
            name='by-vote'
            value='by-vote'
            checked={selectedOption === 'by-vote'}
            onChange={this.handleChange}
          />
        </div>
        <button type='submit' value='submit'>Sort</button>
      </form>
    );
  }
}

export default SortOptions;
