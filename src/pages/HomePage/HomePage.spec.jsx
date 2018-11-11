import React from 'react';
import { shallow } from 'enzyme';

import HomePage from './HomePage';

describe('HomePage', () => {
  it('Should match rendered snapshot', () => {
    const wrapper = shallow(
      <HomePage location={{ pathname: '/test' }}/>
    );

    expect(wrapper).toMatchSnapshot();
  });
});
