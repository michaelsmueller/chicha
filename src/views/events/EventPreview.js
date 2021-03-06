import React from 'react';
import { Link } from 'react-router-dom';
import { VoteButtons } from '../';
import { showLocalDateTime } from '../../helpers/dateTime';

const EventPreview = ({ rank, event, userId, vote, deleteEvent }) => {
  const { _id: eventId, creator, data } = event || '';
  const { name, start_time, place } = data || '';
  const { name: placeName } = place || '';
  const source = event.data.cover?.source;
  return (
    <div className='event-preview'>
      {creator === userId ? <EditDeleteButtons eventId={eventId} deleteEvent={deleteEvent} /> : null }
      <Link to={`/events/${eventId}`}>
        <div className='rank'>{rank + 1}</div>
        <div className='event-image-container'><img alt={name} src={source} /></div>
        <div className='event-text-container'>
          <VoteButtons event={event} vote={vote} />
          <EventInfo start_time={start_time} name={name} placeName={placeName} />
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
    <div className='edit-delete'>
      <Link to={`/events/${eventId}/edit`}><i className='material-icons'>create</i></Link>
      <i onClick={confirmDelete} className='material-icons'>delete</i>
    </div>
  );
};

const EventInfo = ({ start_time, name, placeName }) => {
  return (
    <div className='event-info'>
      <p className='start-time'>{showLocalDateTime(start_time)}</p>
      <h2 className='event-name'>{name}</h2>
      <p className='place'>{placeName}</p>
    </div>
  );
};

export default EventPreview;
