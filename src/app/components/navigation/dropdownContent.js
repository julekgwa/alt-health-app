import styled from 'styled-components';

import {
  Colors
} from 'app/styles/colors';

export const NavbarDropdownContent = styled.div`
  display: none;
  position: absolute;
  background-color: ${Colors.veryDarkGrayishViolet};
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0, 2);
  padding: 12px 16px;
  z-index: 1;
`;
