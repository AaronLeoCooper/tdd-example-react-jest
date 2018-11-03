import axios from 'axios';

import getUsers from './getUsers';

jest.mock('axios');

describe('getUsers', () => {
  it('Should resolve with response data', async () => {
    axios.get.mockResolvedValueOnce({ data: { id: '1' } });

    const result = await getUsers('testing');

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(
      expect.stringContaining('/testing')
    );

    expect(result).toEqual({ id: '1' });
  });

  it('Should reject with an error when API call fails', async () => {
    const err = new Error('test error');

    axios.get.mockRejectedValueOnce(err);

    try {
      await getUsers('testing');
    } catch (e) {
      expect(e).toEqual(err);
    }
  });
});
