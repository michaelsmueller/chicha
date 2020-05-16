import React from 'react';
import { withAuth } from '../context/authContext';
import { Link } from 'react-router-dom';
import { UpAndDownvoteButtons } from './';
import { showLocalDateTime } from '../helpers/dateTime';

const EventPreview = ({ event, userId, deleteEvent, upvoteEvent, downvoteEvent }) => {
  const { _id: eventId, creator, upvotes, downvotes, data, data: { name, start_time } } = event;
  const source = data.cover?.source;
  const place = data.place?.name;
  return (
    <div className='event-preview'>
      {creator === userId ? <EditAndDeleteButtons eventId={eventId} deleteEvent={deleteEvent} /> : null }
      <Link to={`/events/${eventId}`}>
        <div className='event-image-container'><img alt={name} src={source} /></div>
        <div className='event-text-container'>
          <UpAndDownvoteButtons eventId={eventId} upvotes={upvotes} downvotes={downvotes} />
          <EventInfo start_time={start_time} name={name} place={place} />
        </div>
      </Link>
    </div>
  );
};

const EditAndDeleteButtons = ({ eventId, deleteEvent }) => {
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

const EventInfo = ({ start_time, name, place }) => {
  return (
    <div className='event-info'>
      <p className='start-time'>{showLocalDateTime(start_time)}</p>
      <h2 className='event-name'>{name}</h2>
      <p className='place'>{place}</p>
    </div>
  );
};

export default withAuth(EventPreview);
