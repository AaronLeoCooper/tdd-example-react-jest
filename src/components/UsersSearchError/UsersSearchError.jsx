import React from 'react';
import PropTypes from 'prop-types';

function UsersSearchError({ error }) {
  if (!error) {
    return null;
  }

  return (
    <div>
      {error}
    </div>
  );
}

UsersSearchError.propTypes = {
  error: PropTypes.string
};

export default UsersSearchError;
