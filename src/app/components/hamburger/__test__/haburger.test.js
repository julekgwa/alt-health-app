import {
  fireEvent,
  render
} from '@testing-library/react';

import React from 'react';

import {
  Hamburger
} from 'app/components/hamburger/hamburger';

describe('Hamburger', () => {

  it('Should toggle isOpen', () => {

    let onHamClick = jest.fn();

    const { getByTestId, } = render(<Hamburger onClick={onHamClick} />);

    fireEvent.click(getByTestId('ham'));
    expect(onHamClick).toHaveBeenCalled();

  });

});
