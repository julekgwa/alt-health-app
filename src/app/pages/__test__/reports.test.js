import {
  render
} from '@testing-library/react';

import React from 'react';

import {
  Provider
} from 'react-redux';

import {
  BrowserRouter as Router
} from 'react-router-dom';

import configureStore from 'redux-mock-store';

import thunk from 'redux-thunk';

import {
  Report
} from '../reports';

const middleware = [thunk];

const mockStore = configureStore(middleware);

const initState = {
  isActive: false,
  sliderIndex: 0,
};

const store = mockStore(initState);

describe('Reports', () => {

  it('should render without crashing', () => {

    render(<Provider store={store}><Router><Report /></Router></Provider>);

  });

});
