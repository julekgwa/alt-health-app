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

import Medicine1 from 'app/assets/medicine-1.jpg';

import Medicine2 from 'app/assets/medicine-2.jpg';

import Medicine3 from 'app/assets/medicine-3.jpg';

import Medicine4 from 'app/assets/medicine-4.jpg';

import {
  Home
} from 'app/pages/home';

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
  sliderImages: sliderImages,
  isLoading: false,
  data: [],
  tableHeadersAndAccessors: [],
  showPopup: false,
};

const store = mockStore(initState);

describe('Home', () => {

  it('should render without crashing', () => {

    render(<Provider store={store}>
      <Router>
        <Home />
      </Router>
    </Provider>);

  });

});
