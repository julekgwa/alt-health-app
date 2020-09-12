import styled,
{
  css
} from 'styled-components';

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

  ${(props) =>
    props &&
    props.isMobile &&
    css`
      position: static;
        display: inline-block;
        padding: 10px;
        flex-direction: column;
        &:hover ${NavbarDropdownContent} {
          display: flex;
        }
    `}
`;
