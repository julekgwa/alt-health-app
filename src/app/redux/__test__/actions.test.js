const { IS_DESKTOP_MENU, UPDATE_SLIDER_INDEX, } = require('app/constants');

const { setIsActive, updateSliderIndex, } = require('../actions');

describe('Actions', () => {

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

});
