import styled from 'styled-components';

import {
  Colors
} from 'app/styles/colors';

export const PopupContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  opacity: 1;
  background-color: rgba(236, 240, 243, 0.5);

  .container {
    background-color: ${props =>
  (props && props.isError && Colors.verySoftRed) ||
      Colors.verySoftCyan};
    width: 600px;
    min-height: 359px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    opacity: 1;
    margin: 100px auto;
    position: relative;
    box-shadow: 9px 9px 18px ${Colors.darkGrayishBlue},
      -9px -9px 18px
        ${Colors.veryDarkGrayishBlue};
  }

  .form {
    background: ${Colors.veryDarkBlue};
  }

  .message-area {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .status {
    text-transform: uppercase;
    color: white;
  }

  .message {
    color: ${Colors.White};
    text-align: center;
    padding: 0 10px 0 10px;
  }

  .icon {
    position: absolute;
    top: 10px;
    right: 15px;
    color: white;

    &:hover {
      cursor: pointer;
    }
  }

  .button {
    background-color: white;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;

    p {
      text-transform: uppercase;
      text-align: center;
    }

    &:hover {
      cursor: pointer;
    }
  }

  /* Extra small devices (phones, 600px and down) */
  @media only screen and (max-width: 600px) {
    .container {
      width: 100%;
    }
  }
`;
