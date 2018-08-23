import React from 'react';
import PropTypes from 'prop-types';

/**
 * Functional react component for carousel slide.
 * @function
 * @param {object} props - React props.
 * @returns {JSX.Element} - Render componet based on passed image and title.
 */
const Slide = ({item: {userImageURL, user}}) => (
  <div className="slide">
    <div className="img-container">
      <img src={userImageURL} alt={user} />
    </div>
    <div className="slide-title">{user}</div>
  </div>
);

Slide.propTypes = {
  item: PropTypes.shape({
    userImageURL: PropTypes.string.isRequired,
    user: PropTypes.string,
  }),
};

export default Slide;
