import {
  cleanup,
  fireEvent,
  render
} from '@testing-library/react';

import React from 'react';

import {
  Provider
} from 'react-redux';

import configureStore from 'redux-mock-store';

import Medicine1 from 'app/assets/medicine-1.jpg';

import Medicine2 from 'app/assets/medicine-2.jpg';

import Medicine3 from 'app/assets/medicine-3.jpg';

import Medicine4 from 'app/assets/medicine-4.jpg';

import {
  Popup
} from 'app/components/popup/popup';

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

afterEach(cleanup);

const mockStore = configureStore();

describe('Popup Component', () => {

  const store = mockStore(initState);

  it('should not render popup',() => {

    const { container, } = render(<Popup />);

    expect(container.firstChild).toBeNull();

  });

  it('should not render popup when message is not provided',() => {

    const { container, } = render(<Provider store={store}><Popup show={true} isError={false} /></Provider>);

    expect(container.firstChild).toBeNull();

  });

  it('should render a success popup', () => {

    const onButtonPress = jest.fn();

    const { queryByText, queryByRole, getByRole, } = render(<Provider store={store}><Popup onButtonPress={onButtonPress} show={true} isError={false} message='testing popup' /></Provider>);

    expect(queryByText(/testing popup/i)).toBeTruthy();
    expect(queryByText(/cool beans/i)).toBeTruthy();
    expect(queryByRole('button')).toBeTruthy();

    const button = getByRole('button');

    fireEvent.click(button);

    expect(onButtonPress).toHaveBeenCalled();

  });

  it('should render error popup', () => {

    const onButtonPress = jest.fn();

    const { queryByText, queryByRole, getByRole, } = render(<Provider store={store}><Popup onButtonPress={onButtonPress} show={true} isError={true} message='something went wrong' /></Provider>);

    expect(queryByText(/something went wrong/i)).toBeTruthy();
    expect(queryByText(/ok/i)).toBeTruthy();
    expect(queryByRole('button')).toBeTruthy();

    const button = getByRole('button');

    fireEvent.click(button);

    expect(onButtonPress).toHaveBeenCalled();

  });

  it('should handle keydown event', () => {

    const onButtonPress = jest.fn();

    const { getByRole, } = render(<Provider store={store}><Popup onButtonPress={onButtonPress} show={true} isError={false} message='something went wrong' /></Provider>);

    fireEvent.keyDown(getByRole('button'), {
      key: 'Enter',
      keyCode: 13,
    });

    expect(onButtonPress).toHaveBeenCalled();

  });

  it('should call default function without crashing', () => {

    const { getByRole, } = render(<Provider store={store}><Popup show={true} isError={false} message='something went wrong' /></Provider>);

    // will crash if default function is not a function
    fireEvent.keyDown(getByRole('button'), {
      key: 'Enter',
      keyCode: 13,
    });

  });

});
