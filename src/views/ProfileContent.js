import React from 'react';
import { Link } from 'react-router-dom';

const ProfileContent = ({ user, deleteUser, onLogout }) => {
  const { username, image, bio, url } = user;
  return (
    <div className='profile'>
      {image && <img alt='portrait' src={image} />}
      <h1>{username}</h1>
      {bio && <p className='bio'>{bio}</p>}
      {url && <a href={url}>{url}</a>}
      <br />
      <Link to='/profile/edit'><button>Edit profile</button></Link>
      <button onClick={deleteUser}>Delete profile</button>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
}

export default ProfileContent;
