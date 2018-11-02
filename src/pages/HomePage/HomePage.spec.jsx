import React from 'react';
import { shallow } from 'enzyme';

import HomePage from './HomePage';

const render = (props = {}) => shallow(
  <HomePage
    location={{ pathname: '/test' }}
    {...props}
  />
);

describe('HomePage', () => {
  it('Should render', () => {
    const wrapper = render();

    expect(wrapper).toMatchSnapshot();
  });
});
