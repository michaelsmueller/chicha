import React from 'react';
import { showLocalDateTime } from '../helpers/dateTime';

const EventDetailContent = ({ event }) => {
  const {
    data: {
      name, description, start_time, end_time, ticket_uri, cover: { source },
      place: { name: place, location: { street } },
    }
  } = event || '';
  return (
    <div className='event-detail'>
      <div className='event-image-container'>
        <img alt={name} src={source} />
      </div>
      <div className='event-info'>
        <h1 className='event-name'>{name}</h1>
        <h2 className='times'>{showLocalDateTime(start_time)} – {showLocalDateTime(end_time)}</h2>
        <h2 className='place'>{place}</h2>
        <p className='street'>{street}</p>
        {ticket_uri && <h2 className='ticket-link'><a href={ticket_uri}>Tickets</a></h2>}
        <p className='description'>{description}</p>
      </div>
    </div>
  );
}

export default EventDetailContent;
