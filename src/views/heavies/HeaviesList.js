import React from 'react';

const HeaviesList = ({ heavies }) => {
  return (
    <div className='heavies-list'>
      <HeavyPreviews heavies={heavies} />
    </div>
  );
};

const HeavyPreviews = ({ heavies }) => {
  return (
    <div className='heavy-previews'>
      {heavies.map((heavy) => <HeavyPreview key={heavy._id} heavy={heavy} />)}
    </div>
  )
};

const HeavyPreview = ({ heavy }) => {
  const { username, image, bio, url, points } = heavy || '';
  return (
    <div className='heavy-preview'>
      <div className='rank'></div>
      {image && <img alt={username} src={image} />}
      <div className='heavy-info'>
        <h2 className='username'>{username}</h2>
        {bio && <p className='bio'>{bio}</p>}
        {url && <div className='link'><a href={url}>{url}</a></div>}
      </div>
      <div className='points'>{points}</div>
    </div>
  );
};

export default HeaviesList;
