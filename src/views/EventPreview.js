import React, { Component } from 'react';
import { withAuth } from '../context/authContext';
import { Link } from 'react-router-dom';

class EventPreview extends Component {
  render() {
    console.log('props', this.props);
    const { event, user } = this.props;
    const { _id, creator, data: { name, cover, start_time, place } } = event;
    console.log('creator', creator);
    console.log('user', user);
    return (
      <div>
        {/* {creator === user._id ? <EditLinks /> : '' } */}
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
      </div>
    );
  }
}

// const EditLinks = () => {
//   return (
//     <div>
//       edit
//       delete
//     </div>
//   )
// }

export default withAuth(EventPreview);
