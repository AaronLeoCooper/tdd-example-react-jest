# TDD Example - React, Redux, Jest & Enzyme

This is an example project used to showcase a basic project setup and TDD workflow involving
**React, Redux, Jest & Enzyme** 

## Installation

[Yarn](https://yarnpkg.com) is the preferred package manager for this project, although *NPM*
commands should also still work as expected.

- Initial setup: `yarn install` (or `npm install`)
- Run locally: `yarn start` (or `npm start`)
- Run tests once, with coverage: `yarn test` (or `npm test`)
- Run tests continuously as files change: `yarn test:watch` (or `npm run test:watch`)
- Run ESLint once: `yarn lint` (or `npm run lint`)
- Building the application for serving: `yarn build` (or `npm run build`)

## Philosophies

Given the countless possibly ways of testing various things, it's daunting to know where to start.
Here's a break-down of the types of tests I prefer to employ for various different types of modules
typically used in a ReactJS app.

### API request handlers

Firstly, I prefer to place all API request handlers into their own directory, e.g. `apis`. This
clearly delineates them from other concerns (redux, components, etc).

Testing API handlers is pretty simple. Here's a complete example that tests once endpoint call that
uses the [Axios](https://github.com/axios/axios) API library:

```js
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
```

### Redux

Redux modules are a mixed bag because they usually contain: action creators, async action
creators (AKA "thunks"), reducers and sometimes selectors. Let's go through an example for each one.

#### Reducers

Since reducers should always be just a pure function, it's easy to test them, just as you would
any other function that doesn't have side-effects. Do remember though that you should not only aim
to test all cases that a reducer supports, but also to test cases that it *doesn't* support, too.
Here's an example showing one expected action and one unexpected:

```js
describe('UsersRedux', () => {
  describe('usersReducer', () => {
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
});
```

## Useful resources

These are a few resources I've found myself going back to many times during React app development
over the last few years:

- [DevDocs](https://devdocs.io) - very nice, simple, customisable, to-the-point documentation for
  many, many languages, frameworks and libraries. Already includes complete documentations for some
  of the below links.
- [Create React App Docs](https://facebook.github.io/create-react-app/) - Official CRA docs
- [Enzyme Docs](https://airbnb.io/enzyme/) - Official Enzyme docs
- [Jest Docs](https://jestjs.io/) - Official Jest docs
