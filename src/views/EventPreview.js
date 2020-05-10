import React from 'react';
import { Link } from 'react-router-dom';

const EventPreview = ({ event }) => {
  const { _id, data: { name, cover, start_time, place } } = event;
  return (
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
  );
}

export default EventPreview;
