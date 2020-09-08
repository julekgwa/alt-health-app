import styled from 'styled-components';

import {
  NavbarDropdownContent
} from './dropdownContent';

export const Dropdown = styled.div`
  position: relative;
  display: inline-block;
  padding: 10px;
  flex-direction: column;
  &:hover ${NavbarDropdownContent} {
    display: block;
  }
`;
