import React from 'react';
import { withAuth } from '../context/authContext';
import { Link } from 'react-router-dom';
import { showLocalDateTime } from '../helpers/dateTime';

const EventPreview = ({ event, userId, deleteEvent }) => {
  const { _id: eventId, creator, upvotes, downvotes, data: { name, cover, start_time, place } } = event;
  return (
    <div className='event-preview'>
      {creator === userId ? <EditAndDelete eventId={eventId} deleteEvent={deleteEvent} /> : null }
      <Link to={`/events/${eventId}`}>
        <div>
          <div className='event-image-container'>
            <img alt={name} src={cover.source} />
          </div>
          <div className='event-text-container'>
            <div className='votes'>
              <button>↑</button>
              <div>{upvotes - downvotes}</div>
              <button>↓</button>
            </div>
            <div className='event-info'>
              <p className='start-time'>{showLocalDateTime(start_time)}</p>
              <h2 className='event-name'>{name}</h2>
              <p className='place'>{place.name}</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

const EditAndDelete = ({ eventId, deleteEvent }) => {
  const handleDelete = () => deleteEvent(eventId);
  const confirmDelete = () => {
    const confirmed = window.confirm('Ok to delete?');
    if (confirmed) handleDelete();
  };
  return (
    <div>
      <Link to={`/events/${eventId}/edit`}><button>edit</button></Link>
      <button onClick={confirmDelete}>delete</button>
    </div>
  );
};

export default withAuth(EventPreview);
