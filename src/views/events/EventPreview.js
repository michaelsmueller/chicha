import React from 'react';
import { Link } from 'react-router-dom';
import { VoteButtons } from '../';
import { showLocalDateTime } from '../../helpers/dateTime';

const EventPreview = ({ rank, event, userId, vote, deleteEvent }) => {
  const {
    _id: eventId, creator,
    data: {
      name, start_time,
      place: { name: place },
    }
  } = event || '';
  const source = event.data.cover?.source;
  return (
    <div className='event-preview'>
      {creator === userId ? <EditDeleteButtons eventId={eventId} deleteEvent={deleteEvent} /> : null }
      <Link to={`/events/${eventId}`}>
        <div className='rank'>{rank + 1}</div>
        <div className='event-image-container'><img alt={name} src={source} /></div>
        <div className='event-text-container'>
          <VoteButtons event={event} vote={vote} />
          <EventInfo start_time={start_time} name={name} place={place} />
        </div>
      </Link>
    </div>
  );
};

const EditDeleteButtons = ({ eventId, deleteEvent }) => {
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

export default EventPreview;
