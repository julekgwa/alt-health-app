import {
  faFrown,
  faSmile
} from '@fortawesome/free-regular-svg-icons';

import {
  faTimes
} from '@fortawesome/free-solid-svg-icons';

import {
  FontAwesomeIcon
} from '@fortawesome/react-fontawesome';

import PropTypes from 'prop-types';

import React from 'react';

import {
  PopupContainer
} from 'app/components/popup/popupContainer';

import {
  handleKeyDown
} from 'app/utils';

export const Popup = ({ show, message, isError, onButtonPress, }) => (
  <React.Fragment>
    {show && message ? (
      <PopupContainer isError={isError}>
        <div className='container'>
          <FontAwesomeIcon
            onClick={onButtonPress}
            className='icon'
            icon={faTimes}
          />
          <div className='message-area'>
            <FontAwesomeIcon
              size='6x'
              icon={isError ? faFrown : faSmile}
            />
            <p className='status'>
              {isError ? 'Error' : 'Success'}
            </p>
            <p className='message'>
              {message}
            </p>
          </div>
          <div
            tabIndex='0'
            role='button'
            onKeyDown={e => handleKeyDown(e, onButtonPress)}
            onClick={onButtonPress}
            className='button'
          >
            <p>
              {isError ? 'OK!' : 'Cool beans!'}
            </p>
          </div>
        </div>
      </PopupContainer>
    ) : (
      <React.Fragment></React.Fragment>
    )}
  </React.Fragment>
);

Popup.propTypes = {
  show: PropTypes.bool,
  message: PropTypes.string,
  isError: PropTypes.bool,
  onButtonPress: PropTypes.func,
};

Popup.defaultProps = {
  show: false,
  message: '',
  onButtonPress: () => {},
  isError: false,
};
