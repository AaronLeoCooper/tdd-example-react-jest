import React from 'react';
import PropTypes from 'prop-types';

import './UsersList.css';

function UsersList({ users, isFetching }) {
  if (isFetching) {
    return (
      <div className="UsersList_fetching">
        Fetching users...
      </div>
    );
  }

  return (
    <div>
      {
        users.map((user) => (
          <div
            key={user.id}
            className="UsersList_user"
          >
            <img
              className="UsersList_avatar"
              src={user.avatar_url}
            />
            <div>
              <p>Name: <strong>{user.name}</strong></p>
              <p>Login: <strong>{user.login}</strong></p>
            </div>
          </div>
        ))
      }
    </div>
  );
}

UsersList.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string,
      login: PropTypes.string.isRequired,
      avatar_url: PropTypes.string.isRequired
    })
  )
};

export default UsersList;
