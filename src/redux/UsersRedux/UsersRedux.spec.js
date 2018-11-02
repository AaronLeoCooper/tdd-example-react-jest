import usersReducer, {
  startFetch,
  START_FETCH,
  fetchUsers,
  failedFetch,
  successfulFetch
} from './UsersRedux';

import * as UserApi from '../../apis/UserApi';

jest.mock('../../apis/UserApi');

describe('UsersRedux', () => {
  describe('Action Creators', () => {
    describe('startFetch', () => {
      it('Should return action with type START_FETCH', () => {
        expect(
          startFetch()
        ).toEqual({
          type: START_FETCH
        });
      });
    });
  });

  describe('Thunks', () => {
    describe('fetchUsers', () => {
      it('Should dispatch successfulFetch', async () => {
        UserApi.getUsers.mockResolvedValueOnce({ id: '1' });

        const dispatch = jest.fn();

        await fetchUsers('testing')(dispatch);

        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, startFetch());
        expect(dispatch).toHaveBeenNthCalledWith(2, successfulFetch({ id: '1' }));
      });

      it('Should dispatch failedFetch', async () => {
        UserApi.getUsers.mockRejectedValueOnce({ message: 'ERROR' });

        const dispatch = jest.fn();

        await fetchUsers('testing')(dispatch);

        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, startFetch());
        expect(dispatch).toHaveBeenNthCalledWith(2, failedFetch('ERROR'));
      });
    });
  });

  describe('usersReducer', () => {

  });

  describe('Selectors', () => {
  });
});
