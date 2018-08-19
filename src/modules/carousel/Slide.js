import React from 'react';

const Slide = ({item: {userImageURL, user}}) => (
  <div className="slide">
    <div className="img-container">
      <img src={userImageURL} alt={user} />
    </div>
    <div className="slide-title">{user}</div>
  </div>
);

export default Slide;
