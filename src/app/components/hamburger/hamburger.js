import PropTypes from 'prop-types';

import React,
{
  useState
} from 'react';

import {
  HamContainer
} from './container';

export function Hamburger({ onClick, }) {

  const [isOpen, setIsOpen] = useState(false);

  const updateHam = () => {

    setIsOpen(!isOpen);
    onClick();

  };

  return (
    <HamContainer isOpen={isOpen} onClick={updateHam}>
      <div className='menu-btn__burger open'></div>
    </HamContainer>
  );

}

Hamburger.propTypes = {
  onClick: PropTypes.func.isRequired,
};

