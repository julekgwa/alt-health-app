import {
  connect
} from 'react-redux';

import styled,
{
  css
} from 'styled-components';

import {
  Colors
} from 'app/styles/colors';

const mapStateToProps = (state) => ({
  theme: state.theme,
});

const Container = styled.div`
  display: flex;
  flex-direction: column;

  .input-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20px;
  }

  label {
    text-transform: uppercase;
    margin-bottom: 3px;
    font-size: 14px;
    color: ${Colors.White};
  }

  .required {
    color: ${Colors.red};
  }

  .required:after {
    content: ' *';
    color:  ${Colors.red};
  }

  .button {
    background-color: white;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    display: flex;

    p {
      text-transform: uppercase;
      text-align: center;
    }

    div {
      flex: 1;
    }

    &:hover {
      cursor: pointer;
    }
  }

  .form-inputs {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-content: space-between;

    &> div {
      width: 45%;
      padding-right: 5%;
    }
  }

  .min-levels {
    color: ${Colors.red};
    margin-left: 30px;
  }

  ${(props) =>
  props &&
    props.isSubmitting &&
    css`
      .container {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    `}

  ${(props) =>
      props &&
    props.inputEmpty &&
    css`
      .empty {
        border: 2px solid ${Colors.red} !important;

        ::placeholder {
          color: ${Colors.red} !important;
          opacity: 1;
        }
      }
    `}

  input.task-input {
    width: 90%;
    background: ${(props) =>
      props && props.theme && props.theme.backgroundColor};
    box-shadow: inset 5px 5px 10px
        ${(props) =>
        props && props.theme && props.theme.primaryShadowColor},
      inset -5px -5px 10px
        ${(props) =>
          props && props.theme && props.theme.secondaryShadowColor};
    border-radius: 5px;
    outline: none;
    border: none;
    caret-color: ${Colors.softOrange};
    color: ${Colors.darkGrayishBlue};
    font-size: 14px;
    padding: 12px 20px;
    font-family: 'Signika', sans-serif;
    margin-bottom: 30px;

    &:focus {
      outline: none;
    }
  }
`;

export const FormContainer = connect(mapStateToProps)(Container);
