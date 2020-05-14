import React from 'react';
import withLoading from '../components/withLoading';

const EventPage = ({ event }) => {
  const { data: { name, description, cover, start_time, end_time, ticket_uri, place } } = event;
  return (
    <div className='event-preview'>
      <div className='event-image-container'>
        <img alt={name} src={cover.source} />
      </div>
      <div className='event-info'>
        <h1 className='name'>{name}</h1>
        <h2 className='times'>{start_time} – {end_time}</h2>
        <h2 className='place'>{place.name}</h2>
        {ticket_uri && <h2 className='tickets'><a href={ticket_uri}>Tickets</a></h2>}
        <p className='street'>{place.street}</p>
        <p className='description'>{description}</p>
      </div>
    </div>
  );
}

export default withLoading(EventPage);
