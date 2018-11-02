import React from 'react';
import { shallow } from 'enzyme';

import UsersList from './UsersList';

const render = (props = {}) => shallow(
  <UsersList {...props} />
);

describe('UsersList', () => {
  
});
