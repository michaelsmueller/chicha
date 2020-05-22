import React from 'react';

const HeavyweightsList = ({ heavyweights }) => {
  return (
    <div className='heavyweights-list'>
      <HeavyweightPreviews heavyweights={heavyweights} />
    </div>
  );
};

const HeavyweightPreviews = ({ heavyweights }) => {
  return (
    <div className='heavyweight-previews'>
      {heavyweights.map((heavyweight) => <HeavyweightPreview key={heavyweight._id} heavyweight={heavyweight} />)}
    </div>
  )
};

const HeavyweightPreview = ({ heavyweight }) => {
  const { username, image, bio, url, points } = heavyweight || '';
  return (
    <div className='heavyweight-preview'>
      <div className='rank'></div>
      {image && <img alt={username} src={image} />}
      <div className='heavyweight-info'>
        <h2 className='username'>{username}</h2>
        {bio && <p className='bio'>{bio}</p>}
        {url && <div className='link'><a href={url}>{url}</a></div>}
      </div>
      <div className='points'>{points}</div>
    </div>
  );
};

export default HeavyweightsList;
