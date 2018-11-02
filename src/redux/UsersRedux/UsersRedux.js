import * as UserApi from '../../apis/UserApi';

export const NAMESPACE = 'USER';

export const START_FETCH = `${NAMESPACE}__START_FETCH`;
export const SUCCESSFUL_FETCH = `${NAMESPACE}__SUCCESSFUL_FETCH`;
export const FAILED_FETCH = `${NAMESPACE}__FAILED_FETCH`;

export const startFetch = () => ({ type: START_FETCH });
export const successfulFetch = (user) => ({ type: SUCCESSFUL_FETCH, user });
export const failedFetch = (error) => ({ type: FAILED_FETCH, error });

export function fetchUsers(searchTerm) {
  return async (dispatch) => {
    dispatch(startFetch());

    try {
      const users = await UserApi.getUsers(searchTerm);

      dispatch(successfulFetch(users));
    } catch (err) {
      dispatch(failedFetch(err.message));
    }
  };
}

export const initialState = {
  users: [],
  isFetching: false,
  error: undefined
};

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case START_FETCH:
      return {
        ...state,
        isFetching: true,
        error: initialState.error
      };

    case SUCCESSFUL_FETCH:
      return {
        ...state,
        isFetching: false,
        users: [
          ...state.users,
          action.user
        ]
      };

    case FAILED_FETCH:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };

    default:
      return state;
  }
}

export function getUsers(state) {
  return state[NAMESPACE].users;
}

export function getIsFetching(state) {
  return state[NAMESPACE].isFetching;
}

export function getError(state) {
  return state[NAMESPACE].error;
}
