import configureStore from 'redux-mock-store';

import thunk from 'redux-thunk';

const { IS_DESKTOP_MENU, UPDATE_SLIDER_INDEX, ERROR, SHOW_POPUP, } = require('app/constants');

const { setIsActive, updateSliderIndex, setError, showPopup, getInfo, } = require('../actions');

const middleware = [thunk];

const mockStore = configureStore(middleware);

describe('Actions', () => {

  afterEach(() => {

    fetch.resetMocks();

  });

  it('Should set isActive to true', () => {

    const expectedAction = {
      type: IS_DESKTOP_MENU,
    };

    expect(setIsActive()).toEqual(expectedAction);

  });

  it('Should update slider index', () => {

    const expectedAction = {
      type: UPDATE_SLIDER_INDEX,
    };

    expect(updateSliderIndex()).toEqual(expectedAction);

  });

  it('should create an action for setting error', () => {

    const expectedAction = {
      type: ERROR,
      payload: {
        error: true,
        message: 'Something went wrong',
      },
    };

    expect(setError(ERROR,expectedAction.payload)).toEqual(expectedAction);

  });

  it('should create an action for closing popup', () => {

    const expectedAction = {
      type: SHOW_POPUP,
      payload: true,
    };

    expect(showPopup(true)).toEqual(expectedAction);

  });

  it('should create an action for setting error message', () => {

    const store = mockStore({
      isError: false,
      message: '',
    });

    const expectedActions = [
      {
        type: 'SET_LOADER',
        payload: true,
      },
      {
        type: 'ERROR',
        payload: {
          error: true,
          message: 'something went wrong',
        },
      },
      {
        type: 'SET_LOADER',
        payload: false,
      }
    ];

    const result = '{"message": "something went wrong"}';

    fetch.mockResponseOnce(
      result,
      {
        status: 400,
      }
    );

    return store.dispatch(getInfo('clients')).then(() => {

      expect(store.getActions()).toEqual(expectedActions);

    });

  });

});
