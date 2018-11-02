import React from 'react';
import PropTypes from 'prop-types';

import UsersListContainer from '../../containers/UsersListContainer';

function HomePage({ location }) {
  return (
    <div>
      <header>
        You're at: {location.pathname}
      </header>
      <UsersListContainer />
    </div>
  );
}

HomePage.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
};

export default HomePage;
