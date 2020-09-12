import {
  IS_DESKTOP_MENU,
  UPDATE_SLIDER_INDEX
} from 'app/constants';

export function setIsActive() {

  return {
    type: IS_DESKTOP_MENU,
  };

}

export function updateSliderIndex() {

  return {
    type: UPDATE_SLIDER_INDEX,
  };

}