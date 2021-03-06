
import {
  createGlobalStyle
} from 'styled-components';

import {
  Colors
} from 'app/styles/colors';

const GlobalStyles = createGlobalStyle`
  body {
    font-family: 'Signika', sans-serif;
    background-color: ${Colors.veryDarkGrayishViolet};
    overflow: hidden;
  }
`;

export const GlobalStyle = GlobalStyles;