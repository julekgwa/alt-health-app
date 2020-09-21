import styled from 'styled-components';

import {
  Colors
} from 'app/styles/colors';

export const ItemContainer = styled.div`
  color:${Colors.White};

  .supplement-info {
    display:flex;
  }

  .supplement-description {
    flex-grow: 1;
    display: flex;
  }

  img {
    width: 100%;
  }

  svg {
    margin-right: 3px;
  }

  .add-to-cart {
    background-color: green;
    color: ${Colors.White};
    padding: 2px;
    border-radius: 2px;
    margin-right: 5px;
    display: inline-flex;
    height: 20px;
    cursor: pointer;
    outline:none;
  }

  .add-to-cart:hover {
    background-color: ${Colors.verySoftCyan}
  }
`;