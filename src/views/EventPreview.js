import React from 'react';
import { withAuth } from '../context/authContext';
import { Link } from 'react-router-dom';
import { showLocalDateTime } from '../helpers/dateTime';

const EventPreview = ({ event, userId, deleteEvent }) => {
  const { _id: eventId, creator, upvotes, downvotes, data, data: { name, start_time } } = event;
  const source = data.cover?.source;
  const place = data.place?.name;
  return (
    <div className='event-preview'>
      {creator === userId ? <EditAndDeleteButtons eventId={eventId} deleteEvent={deleteEvent} /> : null }
      <Link to={`/events/${eventId}`}>
        <div>
          <div className='event-image-container'>
            <img alt={name} src={source} />
          </div>
          <div className='event-text-container'>
            <UpAndDownVoteButtons eventId={eventId} upvotes={upvotes} downvotes={downvotes} />
            <div className='event-info'>
              <p className='start-time'>{showLocalDateTime(start_time)}</p>
              <h2 className='event-name'>{name}</h2>
              <p className='place'>{place}</p>
            </div>
          </div>
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

const UpAndDownVoteButtons = ({ eventId, upvotes, downvotes }) => {
  const handleUpvote = (e) => {
    e.preventDefault();
    console.log('upvote');
  }

  const handleDownvote = (e) => {
    e.preventDefault();
    console.log('downvote')
  }

  return (
    <div className='votes'>
      <button onClick={handleUpvote}>↑</button>
      <div>{upvotes - downvotes}</div>
      <button onClick={handleDownvote}>↓</button>
    </div>
  );
};

export default withAuth(EventPreview);
