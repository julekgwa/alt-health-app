import {
  act,
  fireEvent,
  render
} from '@testing-library/react';

import React from 'react';

import {
  MenuBar
} from 'app/components/window-buttons/menubar';

describe('MenuBar', () => {

  beforeEach(() => {

    window.ipcRenderer = {
      send: ()=>{},
    };

  });

  it('Should click menu bar buttons without crashing the app', () => {

    const { getByTestId, } = render(<MenuBar />);

    act(() => {

      // Change the viewport to 500px.
      window.innerWidth = 500;
      window.innerHeight = 500;

    });

    fireEvent.click(getByTestId('max'));
    fireEvent.click(getByTestId('min'));
    fireEvent.click(getByTestId('close'));

  });

  afterEach(() => {

    window.ipcRenderer = null;

  });

});
