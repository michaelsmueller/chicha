import React from 'react';
import { Link } from 'react-router-dom';

const ProfileContent = ({ user, deleteUser, onLogout }) => {
  const confirmDelete = () => {
    const confirmed = window.confirm('Ok to delete?');
    if (confirmed) deleteUser();
  }

  const { username, image, bio, url } = user;
  return (
    <div className='profile'>
      {image && <img alt='portrait' src={image} />}
      <h1 className='title'>{username}</h1>
      {bio && <p className='bio'>{bio}</p>}
      {url && <div className='link'><a href={url}>{url}</a></div>}
      <br />
      <Link to='/profile/edit'><button>Edit profile</button></Link>
      <button onClick={confirmDelete}>Delete profile</button>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
}

export default ProfileContent;
