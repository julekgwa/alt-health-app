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
      color: ${Colors.darkGrayishBlue}
    }

    .loader {
      justify-content: center;
      align-content: center;
      display: flex;
    }
`;

export const Container = connect(mapStateToProps)(MainContainer);
