import React from 'react';
import { withAuth } from '../context/authContext';
import { Link } from 'react-router-dom';

const EventPreview = ({ event, user, deleteEvent, editEvent }) => {

  const editAndDeleteLinks = ({ _id }) => {
    const handleEdit = () => editEvent(_id);
    const handleDelete = () => deleteEvent(_id);
    return (
      <div>
        <button onclick={handleEdit}>edit</button>
        <button onClick={handleDelete}>delete</button>
      </div>
    )
  };

  const { _id, creator, data: { name, cover, start_time, place } } = event;
  return (
    <div>
      {creator === user._id ? editAndDeleteLinks({ _id }) : null }
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
      <hr />
    </div>
  );
};

export default withAuth(EventPreview);
