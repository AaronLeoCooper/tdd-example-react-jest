import React from 'react';
import { shallow } from 'enzyme';

import UsersList from './UsersList';

const render = (props = {}) => shallow(
  <UsersList {...props} />
);

describe('UsersList', () => {
  it('Should display a fetching message when isFetching is true', () => {
    const wrapper = render({ isFetching: true });

    expect(wrapper.find('.UsersList_fetching')).toHaveLength(1);
  });

  it('Should display a list of users when users are passed', () => {
    const wrapper = render({
      users: [{
        id: 1,
        avatar_url: 'avatar_url',
        name: 'name',
        login: 'login'
      }]
    });

    expect(wrapper.find('.UsersList_user')).toHaveLength(1);
  });
});
