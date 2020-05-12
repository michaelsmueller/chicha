import React, { Component } from 'react';
import { withAuth } from '../context/authContext';
import { Link } from 'react-router-dom';

class EventPreview extends Component {
  
  editAndDeleteLinks = ({ _id }) => {
    const handleDelete = () => this.props.deleteEvent(_id);
    return (
      <div>
        <button>edit</button>
        <button onClick={handleDelete}>delete</button>
      </div>
    )
  }

  render() {
    const { event, user } = this.props;
    const { _id, creator, data: { name, cover, start_time, place } } = event;
    return (
      <div>
        {creator === user._id ? this.editAndDeleteLinks({ _id }) : null }
        <Link to={`/events/${_id}`}>
          <div className='event-preview'>
            <div className='event-image-container'>
              <img alt={name} src={cover.source} />
            </div>
            <div className='event-info'>
              <p className='start-time'>{start_time}</p>
              <h2 className='name'>{name}</h2>
              <p className='place'>{place.name}</p>
            </div>
          </div>
        </Link>
        <hr />
      </div>
    );
  }
}

export default withAuth(EventPreview);
