import PropTypes from 'prop-types';

import React from 'react';

import {
  HamContainer
} from './container';

export function Hamburger({ onClick, isOpen, }) {

  return (
    <HamContainer isOpen={isOpen} data-testid='ham' onClick={onClick}>
      <div className='menu-btn__burger open'></div>
    </HamContainer>
  );

}

Hamburger.propTypes = {
  onClick: PropTypes.func.isRequired,
  isOpen: PropTypes.bool,
};

