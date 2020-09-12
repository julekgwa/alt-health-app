
import Medicine1 from 'app/assets/medicine-1.jpg';

import Medicine2 from 'app/assets/medicine-2.jpg';

import Medicine3 from 'app/assets/medicine-3.jpg';

import Medicine4 from 'app/assets/medicine-4.jpg';

import {
  IS_DESKTOP_MENU,
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

});