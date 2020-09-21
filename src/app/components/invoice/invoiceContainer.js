import styled from 'styled-components';

import {
  Colors
} from 'app/styles/colors';

export const InvoiceContainer = styled.div`
  width: 100%;
  background-color: ${Colors.White};

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
        text-align: left;
        padding: 8px;
        border-bottom: 1px solid #ddd;
      }
    }
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
