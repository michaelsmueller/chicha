import React, { Component } from 'react';

class DateFilter extends Component {
  state = { selectedOption: this.props.filterBy ? this.props.filterBy : null };

  handleChange = (e) => this.setState({ selectedOption: e.target.value });

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.filter(this.state.selectedOption);
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.filterBy !== this.props.filterBy) this.setState({ selectedOption: null });
  }

  render() {
    const { selectedOption } = this.state;
    return (
      <form className='date-filter' onSubmit={this.handleSubmit} >
        <div className='filter-option'>
          <p>Today</p>
          <input type='radio'
            name='today'
            value='today'
            checked={selectedOption === 'today'}
            onChange={this.handleChange}
          />
        </div>
        <div className='filter-option'>
          <p>This week</p>
          <input type='radio'
            name='this-week'
            value='this-week'
            checked={selectedOption === 'this-week'}
            onChange={this.handleChange}
          />
        </div>
        <div className='filter-option'>
          <p>This Weekend</p>
          <input
            type='radio'
            name='this-weekend'
            value='this-weekend'
            checked={selectedOption === 'this-weekend'}
            onChange={this.handleChange}
          />
        </div>
        <button type='submit' value='submit'>Filter</button>
      </form>
    );
  }
}

export default DateFilter;
