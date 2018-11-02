import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  fetchUsers,
  getUsers,
  getIsFetching,
  getError
} from '../../redux/UsersRedux/UsersRedux';

import UsersSearch from '../../components/UsersSearch';
import UsersSearchError from '../../components/UsersSearchError';
import UsersList from '../../components/UsersList';

function UsersListContainer(props) {
  const { users, isFetching, error } = props;

  return (
    <div>
      <UsersSearch fetchUsers={props.fetchUsers} />
      <UsersSearchError error={error} />
      <UsersList
        users={users}
        isFetching={isFetching}
      />
    </div>
  );
}

UsersListContainer.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.object
  ),
  isFetching: PropTypes.bool,
  error: PropTypes.string,
  fetchUsers: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  users: getUsers(state),
  isFetching: getIsFetching(state),
  error: getError(state)
});

const mapDispatchToProps = { fetchUsers };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersListContainer);
