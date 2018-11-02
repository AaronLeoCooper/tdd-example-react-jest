import React, { Component } from 'react';
import PropTypes from 'prop-types';

class UsersSearch extends Component {
  state = { searchTerm: '' };

  handleChange = (e) => {
    const searchTerm = e.target.value;

    this.setState({ searchTerm });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { fetchUsers } = this.props;
    const { searchTerm } = this.state;

    if (searchTerm) {
      fetchUsers(searchTerm);
    }
  };

  render() {
    const { searchTerm } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <input
          value={searchTerm}
          onChange={this.handleChange}
        />
        <button type="submit">
          Search
        </button>
      </form>
    );
  }
}

UsersSearch.propTypes = {
  fetchUsers: PropTypes.func.isRequired
};

export default UsersSearch;
