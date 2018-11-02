import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './App.store';

import App from './App';

import './index.css';

const render = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(
  render(),
  document.getElementById('root')
);
