
import {
  faShoppingCart
} from '@fortawesome/free-solid-svg-icons';

import {
  FontAwesomeIcon
} from '@fortawesome/react-fontawesome';

import PropTypes from 'prop-types';

import React from 'react';

import Placeholder from 'app/assets/placeholder.png';

import {
  handleKeyDown
} from 'app/utils';

import {
  ItemContainer
} from './itemContainer';

export const Supplement = ({ description, price, onClick, image, }) => {

  return (
    <ItemContainer>
      <img src={image} alt='img' />
      <div className='supplement-info'>
        <div className='supplement-description'>{description}</div>
        <div onKeyDown={(e) => handleKeyDown(e, onClick)} role='button' tabIndex='0' onClick={onClick} className='add-to-cart'>+<FontAwesomeIcon icon={faShoppingCart} /> {`${price}`}</div>
      </div>
    </ItemContainer>
  )
  ;

};

Supplement.propTypes = {
  description: PropTypes.string,
  price: PropTypes.string,
  onClick: PropTypes.func,
  image : PropTypes.string,
};

Supplement.defaultProps = {
  image: Placeholder,
};
