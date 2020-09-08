import {
  render
} from '@testing-library/react';

import React from 'react';

import {
  App
} from './app/App';

test('renders learn react link', () => {

  const { queryByText, } = render(<App />);

  expect(queryByText(/landing/i)).toBeTruthy();

});
