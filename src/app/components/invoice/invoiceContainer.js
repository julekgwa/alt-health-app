import styled from 'styled-components';

import {
  Colors
} from 'app/styles/colors';

export const InvoiceContainer = styled.div`
  width: 93%;
  background-color: ${Colors.White};
  margin: 0 auto;
  border-radius: 2px;

  .invoice-body {
    display: flex;
    margin-left: 30px;
    margin-right: 30px;
  }

  .line-items {
    flex-grow: 2;

    table {
      border-collapse: collapse;
      width: 95%;

      th,
      td {
        padding: 8px;
        border-bottom: 1px solid #ddd;
      }
    }
  }
  .content{ width: 1% }

  .align-right {
    text-align: right;
  }

  .align-left {
    text-align: left;
  }

  .tr-subtotal {
    td {
      border-bottom: none !important;
    }
  }

  .tr-divider {
    line-height: 30px;

    td {
      height: 60px;
      border-bottom: none !important;
    }
  }

  .invoice-info-p {
    color: ${Colors.softBlue};

    span {
      color: ${Colors.Black};
      display: block;
    }
  }

  .divider {
    width: 2px;
    background-color: #ddd;
    margin-left: 10px;
    margin-right: 10px;
  }

  .bill-info {
    flex-wrap: wrap;
    flex: 1;
    padding: 5px;
    text-align: right;
  }

  .invoice-header-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    p {
      font-size: 40px;
      text-transform: uppercase;
      margin-left: 30px;
    }

    img {
      width: 80px;
      margin-right: 30px;
    }
  }
`;
