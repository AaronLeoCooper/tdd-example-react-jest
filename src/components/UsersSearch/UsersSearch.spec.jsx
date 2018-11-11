import React from 'react';
import { shallow } from 'enzyme';

import UsersSearch from './UsersSearch';

const fetchUsers = jest.fn();

const render = (props = {}) => shallow(
  <UsersSearch
    fetchUsers={fetchUsers}
    {...props}
  />
);

describe('UsersSearch', () => {
  it('Should not call fetchUsers when form is submitted when searchTerm is empty', () => {
    const wrapper = render();

    wrapper.find('form')
      .simulate('submit', { preventDefault: () => {} });

    expect(fetchUsers).toHaveBeenCalledTimes(0);
  });

  it('Should call fetchUsers when form is submitted when searchTerm is not empty', () => {
    const wrapper = render();

    wrapper.find('input')
      .simulate('change', { target: { value: 'testing' } });

    wrapper.find('form')
      .simulate('submit', { preventDefault: () => {} });

    expect(fetchUsers).toHaveBeenCalledTimes(1);
    expect(fetchUsers).toHaveBeenCalledWith('testing');
  });

  it('Should update the input value after user enters text', () => {
    const wrapper = render();

    wrapper.find('input')
      .simulate('change', { target: { value: 'testing' } });

    expect(wrapper.find('input').prop('value')).toBe('testing');
  });
});
