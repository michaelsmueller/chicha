import React, { Component } from 'react';
import withLoading from '../components/withLoading';

class EditEventForm extends Component {
  state = {};

  componentDidMount = () => {
    const { event } = this.props;
    this.setState({ event });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { event } = this.state;
    console.log('submit event', event);
    // apiClient
    //   .addEvent({ url })
    //   .then((response) => {
    //     this.props.history.push('/events');
    //   })
    //   .catch((error) => console.log(error))
  };

  cleanForm = () => this.setState({ event: {} });

  handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { event } = this.state;
    console.log('EditEventForm has this event data in state:', event);
    return (
      <div className='edit-event'>
        <h1>Edit Event</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            name='name'
            id='name'
            placeholder='Craft Beer Festival'
            // value={data.name}
            onChange={this.handleChange}
          />
          <button type='submit' value='submit'>Save event</button>
        </form>
      </div>
    );
  }  
}

export default withLoading(EditEventForm);
