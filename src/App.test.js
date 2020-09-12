import {
  act,
  fireEvent,
  render
} from '@testing-library/react';

import platform from 'electron-platform';

import React from 'react';

import {
  Provider
} from 'react-redux';

import {
  BrowserRouter as Router
} from 'react-router-dom';

import configureStore from 'redux-mock-store';

import thunk from 'redux-thunk';

import Medicine1 from 'app/assets/medicine-1.jpg';

import Medicine2 from 'app/assets/medicine-2.jpg';

import Medicine3 from 'app/assets/medicine-3.jpg';

import Medicine4 from 'app/assets/medicine-4.jpg';

import {
  App
} from './app/App';

const middleware = [thunk];

const mockStore = configureStore(middleware);

const sliderImages = [
  {
    slider1: Medicine2,
    slider2: Medicine3,
  },
  {
    slider1: Medicine1,
    slider2: Medicine4,
  }
];

const initState = {
  isActive: false,
  sliderIndex: 0,
  sliderImages,
};

const store = mockStore(initState);

describe('App', () => {

  beforeEach(() => {

    jest.useFakeTimers();

  });

  it('renders without crashing', () => {

    const { queryByText, } = render(<App />);

    expect(queryByText(/alt health/i)).toBeTruthy();

  });

  it('should render mobile view without crashing', () => {

    // to cover test in /components/containers/animated.js
    platform.isPureWeb = true;
    const { getByTestId, } = render(<Provider store={store}><Router><App /></Router></Provider>);

    act(() => {

      // Change the viewport to 500px.
      window.innerWidth = 500;
      window.innerHeight = 500;

    });

    expect(getByTestId('ham')).not.toBeNull();
    fireEvent.click(getByTestId('ham'));
    expect(getByTestId('mobile-view')).toBeTruthy();

  });

  afterEach(() => {

    jest.runOnlyPendingTimers();
    jest.useRealTimers();

  });

});
