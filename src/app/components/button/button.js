import styled from 'styled-components';

import {
  Colors
} from 'app/styles/colors';

export const Button = styled.button`
  background: ${props => props.primary ? `${Colors.White}` : `${Colors.veryDarkGrayishBlue}`};
  color: ${props => props.primary ? `${Colors.veryDarkGrayishBlue}` : `${Colors.White}`};

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid ${Colors.White};
  border-radius: 3px;
  text-transform: uppercase;
`;