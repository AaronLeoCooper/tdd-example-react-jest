import { combineReducers, applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

import usersReducer, {
  NAMESPACE as USERS
} from './redux/UsersRedux/UsersRedux';

const reducers = combineReducers({
  [USERS]: usersReducer
});

const store = createStore(
  reducers,
  applyMiddleware(thunk)
);

export default store;
