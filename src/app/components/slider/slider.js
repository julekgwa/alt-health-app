import PropTypes from 'prop-types';

import styled from 'styled-components';

export const Slider = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  animation: none;

  img {
    min-height: 100%;
    width: 300px;
  }

  div {
    padding: 10px;
  }

  /* .add-animation {
    animation-name: animate-image;
    animation-duration: 2s;
    animation-fill-mode: forwards;
  }

  .remove-animation {
    animation: none;
  } */

  @keyframes animate-image {
    0% {
      margin-left: -75px;
    }
    25% {
      margin-left: -150px;
    }
    50% {
      margin-left: -225px;
    }
    100% {
      margin-left: 0;
    }
  }
`;

Slider.propTypes = {
  first: PropTypes.bool,
  second: PropTypes.bool,
};
