
import Medicine1 from 'app/assets/medicine-1.jpg';

import Medicine2 from 'app/assets/medicine-2.jpg';

import Medicine3 from 'app/assets/medicine-3.jpg';

import Medicine4 from 'app/assets/medicine-4.jpg';

import {
  IS_DESKTOP_MENU,
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

  default:
    return state;

  }

}