import React from 'react';
import { Link } from 'react-router-dom';

const ProfileContent = ({ user, deleteUser, onLogout }) => {
  const confirmDelete = () => {
    const confirmed = window.confirm('Ok to delete?');
    if (confirmed) deleteUser();
  }

  const { username, image, bio, url, points, balance } = user;
  return (
    <div className='profile'>
      {image && <img alt='portrait' src={image} />}
      <h1 className='title'>{username}</h1>
      {bio && <p className='bio'>{bio}</p>}
      {url && <div className='link'><a href={url}>{url}</a></div>}
      <p className='chicha'>Lifetime Chicha: {points}</p>
      <p className='balance'>Balance to spend: {balance}</p>
      <br />
      <Link to='/profile/edit'><button className='secondary'>Edit profile</button></Link>
      <button className='secondary' onClick={confirmDelete}>Delete profile</button>
      <button className='secondary' onClick={onLogout}>Logout</button>
    </div>
  );
}

export default ProfileContent;
