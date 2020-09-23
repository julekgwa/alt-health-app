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
    color: ${Colors.darkGrayishBlue};
  }

  .loader {
    justify-content: center;
    align-content: center;
    display: flex;
  }

  .fetch-error {
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${Colors.White};
    min-height: 200px;
  }

  .table-container {
    padding: 10px;

    p {
      color: ${Colors.White};
    }
  }

  table:not(.invoice-tbl) {
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

  .supplement-shop {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 0 auto;
    width: 90%;
  }

  .supplement-shop > div {
    flex-grow: 1;
    width: 30%;
    border: 2px solid ${Colors.veryDarkGrayishBlue};
  }

  /* select style */

  .invoice-select {
    width: 200px;
    margin-left: 30px;
  }

  .select-container {
    display: flex;
    align-items: center;
    flex-direction: row;
    margin-bottom: 10px;
  }

  .button-container {
    display: flex;
    justify-content: flex-end;
    padding-right: 30px;
  }

`;

export const Container = connect(mapStateToProps)(MainContainer);
