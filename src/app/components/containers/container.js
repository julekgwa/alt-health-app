import {
  connect
} from 'react-redux';

import styled from 'styled-components';

import {
  Colors
} from 'app/styles/colors';

const mapStateToProps = (state) => ({
  active: state.isActive,
});
const MainContainer = styled.div`
  width: 100%;
  z-index: 1;

    .company-title {
      color: ${Colors.White};
      text-transform: uppercase;
      margin-left: 60px;
    }

    .tagline {
      display: block;
      font-size: 14px;
      color: ${Colors.darkGrayishBlue}
    }

    .loader {
      justify-content: center;
      align-content: center;
      display: flex;
    }

    table {
    border-spacing: 0;
    border: 1px solid black;
    font-size: 70%;
    background-color: ${Colors.White};
    width: 100%;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`;

export const Container = connect(mapStateToProps)(MainContainer);
