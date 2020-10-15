import styled from 'styled-components';

import {
  Colors
} from 'app/styles/colors';

export const PaginationContainer = styled.nav`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 20px;

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  li {
    display: inline;
    padding: 8px 16px;
    color: ${Colors.White};
  }

  li.active {
  background-color: ${Colors.White};
  color: ${Colors.veryDarkGrayishBlue};
  border-radius: 2px;
}

  li:hover:not(.active) {
    background-color: ${Colors.mostlyDesaturatedDarkOrange};
    color: ${Colors.veryDarkGrayishBlue};
    border-radius: 2px;
    cursor: pointer;
  }
`;
