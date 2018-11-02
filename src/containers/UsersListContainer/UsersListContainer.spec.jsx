import React from 'react';
import { shallow } from 'enzyme';

import UsersListContainer from './UsersListContainer';

const render = (props = {}) => shallow(
  <UsersListContainer
    {...props}
  />
);

describe('UsersListContainer', () => {
});
