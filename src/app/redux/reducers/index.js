
import Medicine1 from 'app/assets/medicine-1.jpg';

import Medicine2 from 'app/assets/medicine-2.jpg';

import Medicine3 from 'app/assets/medicine-3.jpg';

import Medicine4 from 'app/assets/medicine-4.jpg';

import {
  ERROR,
  GET_DATA,
  IS_DESKTOP_MENU,
  SET_LOADER,
  UPDATE_SLIDER_INDEX
} from 'app/constants';

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
};

export function rootReducer(state = initState, action) {

  switch (action.type) {

  case IS_DESKTOP_MENU:
    return {
      ...state,
      isActive: !state.isActive,
    };

  case UPDATE_SLIDER_INDEX:
    return {
      ...state,
      sliderIndex: state.sliderIndex === state.sliderImages.length - 1 ? 0 : ++state.sliderIndex,
    };

  case SET_LOADER:
    return {
      ...state,
      isLoading: action.payload,
    };

  case ERROR:
    return {
      ...state,
      isError: action.payload.error,
      message: action.payload.message,
    };

  case GET_DATA:
    return {
      ...state,
      data: action.payload,
    };

  default:
    return state;

  }

}