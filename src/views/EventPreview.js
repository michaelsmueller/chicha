import React from 'react';
import { withAuth } from '../context/authContext';
import { Link } from 'react-router-dom';
import { showLocalDateTime } from '../helpers/dateTime';

const EventPreview = ({ event, userId, deleteEvent }) => {

  const editAndDeleteLinks = ({ _id }) => {
    const handleDelete = () => deleteEvent(_id);
    const confirmDelete = () => {
      const confirmed = window.confirm('Ok to delete?');
      if (confirmed) handleDelete();
    }
    return (
      <div>
        <Link to={`/events/${_id}/edit`}><button>edit</button></Link>
        <button onClick={confirmDelete}>delete</button>
      </div>
    )
  };

  const { _id, creator, data: { name, cover, start_time, place } } = event;
  return (
    <div className='event-preview'>
      {creator === userId ? editAndDeleteLinks({ _id }) : null }
      <Link to={`/events/${_id}`}>
        <div>
          <div className='event-image-container'>
            <img alt={name} src={cover.source} />
          </div>
          <div className='event-info'>
            <p className='start-time'>{showLocalDateTime(start_time)}</p>
            <h2 className='event-name'>{name}</h2>
            <p className='place'>{place.name}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default withAuth(EventPreview);
