import usersReducer, {
  START_FETCH,
  SUCCESSFUL_FETCH,
  FAILED_FETCH,
  startFetch,
  fetchUsers,
  failedFetch,
  successfulFetch,
  initialState
} from './UsersRedux';

import * as UserApi from '../../apis/UserApi';

jest.mock('../../apis/UserApi');

describe('UsersRedux', () => {
  describe('Action Creators', () => {
    describe('startFetch', () => {
      it('Should return action with type START_FETCH', () => {
        const result = startFetch();

        expect(result).toEqual({
          type: START_FETCH
        });
      });
    });

    describe('successfulFetch', () => {
      it('Should return action with type SUCCESSFUL_FETCH', () => {
        const result = successfulFetch({ id: '1' });

        expect(result).toEqual({
          type: SUCCESSFUL_FETCH,
          user: { id: '1' }
        });
      });
    });

    describe('failedFetch', () => {
      it('Should return action with type FAILED_FETCH', () => {
        const result = failedFetch('error');

        expect(result).toEqual({
          type: FAILED_FETCH,
          error: 'error'
        });
      });
    });
  });

  describe('Thunks', () => {
    describe('fetchUsers', () => {
      // Promise-based test case
      it('Should dispatch successfulFetch', () => {
        expect.assertions(3);

        UserApi.getUsers.mockResolvedValueOnce({ id: '1' });

        const dispatch = jest.fn();

        return fetchUsers('testing')(dispatch)
          .then(() => {
            expect(dispatch).toHaveBeenCalledTimes(2);
            expect(dispatch).toHaveBeenNthCalledWith(1, startFetch());
            expect(dispatch).toHaveBeenNthCalledWith(2, successfulFetch({ id: '1' }));
          });
      });

      // async/await test case
      it('Should dispatch failedFetch', async () => {
        expect.assertions(3);

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
    describe('START_FETCH', () => {
      it('Should set isFetching to true and reset error', () => {
        const result = usersReducer(
          { ...initialState, error: 'error' },
          { type: START_FETCH }
        );

        expect(result).toEqual({
          ...initialState,
          isFetching: true
        });
      });
    });

    describe('SUCCESSFUL_FETCH', () => {
      it('Should set isFetching to false and add new user to users state', () => {
        const result = usersReducer(
          { ...initialState, users: [{ id: '1' }], isFetching: true },
          { type: SUCCESSFUL_FETCH, user: { id: '2' } }
        );

        expect(result).toEqual({
          ...initialState,
          isFetching: false,
          users: [{ id: '1' }, { id: '2' }]
        });
      });
    });

    describe('FAILED_FETCH', () => {
      it('Should set isFetching to false and update state with error', () => {
        const result = usersReducer(
          { ...initialState, isFetching: true },
          { type: FAILED_FETCH, error: 'error' }
        );

        expect(result).toEqual({
          ...initialState,
          isFetching: false,
          error: 'error'
        });
      });
    });

    describe('UNKNOWN_ACTION', () => {
      it('Should not change the existing state', () => {
        const result = usersReducer(
          undefined,
          { type: 'UNKNOWN_ACTION' }
        );

        expect(result).toEqual(initialState);
      });
    });
  });

  describe('Selectors', () => {
  });
});
