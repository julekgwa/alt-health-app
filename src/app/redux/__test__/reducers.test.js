
import Medicine1 from 'app/assets/medicine-1.jpg';

import Medicine2 from 'app/assets/medicine-2.jpg';

import Medicine3 from 'app/assets/medicine-3.jpg';

import Medicine4 from 'app/assets/medicine-4.jpg';

import {
  ERROR,
  GET_DATA,
  IS_DESKTOP_MENU,
  SET_LOADER,
  SHOW_POPUP,
  UPDATE_SLIDER_INDEX
} from 'app/constants';

const { rootReducer, } = require('../reducers');

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

describe('Reducers', () => {

  it('should return the initial state', () => {

    expect(rootReducer(undefined, {})).toEqual(initState);

  });

  it('should handle setActive', () => {

    const isActive = {
      isActive: true,
    };

    expect(rootReducer({
      isActive: false,
    }, {
      type: IS_DESKTOP_MENU,
    })).toEqual(isActive);

  });

  it('should handle updateSliderIndex', () => {

    const slider = {
      sliderIndex: 1,
      sliderImages,
    };

    expect(rootReducer({
      sliderIndex: 0,
      sliderImages,
    }, {
      type: UPDATE_SLIDER_INDEX,
    })).toEqual(slider);

  });

  it('should handle set loader', () => {

    const state = {
      sliderIndex: 1,
      sliderImages,
      isLoading: true,
    };

    expect(rootReducer({
      sliderIndex: 1,
      sliderImages,
      isLoading: false,
    }, {
      type: SET_LOADER,
      payload: true,
    })).toEqual(state);

  });

  it('should handle Error', () => {

    const state = {
      sliderIndex: 0,
      sliderImages,
      showPopup: true,
      isError: true,
      message: 'something went wrong',
    };

    expect(rootReducer({
      sliderIndex: 0,
      sliderImages,
    }, {
      type: ERROR,
      payload: {
        error: true,
        message: 'something went wrong',
      },
    })).toEqual(state);

  });

  it('should handle show popup', () => {

    const state = {
      showPopup: true,
    };

    expect(rootReducer({
      showPopup: false,
    }, {
      type: SHOW_POPUP,
      payload: true,
    })).toEqual(state);

  });

  it('should handle updateSliderIndex', () => {

    const state = {
      data: [{
        title: 'fake',
        id: 'anotherFake',
        status: false,
        dueDate: 'fakeFake',
      }],
      isError: false,
      tableHeadersAndAccessors: [{
        Header: 'Title',
        accessor: 'title',
      }, {
        Header: 'Id',
        accessor: 'id',
      }, {
        Header: 'Status',
        accessor: 'status',
      }, {
        Header: 'DueDate',
        accessor: 'dueDate',
      }],
    };

    expect(rootReducer({
      data: [],
      isError: false,
      tableHeadersAndAccessors: [],
    }, {
      type: GET_DATA,
      payload: [{
        title: 'fake',
        id: 'anotherFake',
        status: false,
        dueDate: 'fakeFake',
      }],
    })).toEqual(state);

  });

});