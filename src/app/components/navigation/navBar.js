import {
  connect
} from 'react-redux';

import styled,
{
  css
} from 'styled-components';

import {
  Colors
} from 'app/styles/colors';

const mapStateToProps = state => ({
  active: state.isActive,
});

const Navigation = styled.nav`
  margin: 0;
  padding: 5px;
  display: flex;
  align-items: center;
  background-color: ${Colors.veryDarkGrayishViolet};

  a {
    display: block;
    color: white;
    float: left;
    padding: 10px;
    text-decoration: none;
    text-transform: uppercase;
  }

  .icon {
    display: none;
  }

  .dropdown-header {
    text-transform: uppercase;
    color: ${Colors.White};
    display: block;
  }

  a:hover:not(.active) {
    background-color: ${Colors.veryDarkGrayishViolet};
  }

  .active:before {
    content: '• ';
  }

  .logo {
    height: 30px;
    display: flex;
    align-items: center;
    margin-right: 25px;
  }

  .logo-link:before {
    content: '';
  }

  .logo-link {
    display: flex;
    align-items: center;
    float: right;
    padding: 5px;
    background-color: transparent;
    color: ${Colors.White};
    margin-left: auto;
  }

  .logo img {
    width: 30px;
    height: 30px;
  }

  ${(props) =>
  props.active &&
    css`
      a {
        display: block !important;
      }

      .dropdown-header {
        display: block !important;
      }

      align-items: flex-start;

      .mobile-menu {
        display: flex;
        justify-content: center;
        align-content: space-between;
      }

      .mobile-menu > div {
        display: flex;
        flex-direction: column;
        padding-left: 10px;
      }

      .mobile-menu a {
        display: block;
        text-align: left;
        padding: 10px;
      }

      .dropdown-header {
        text-align: left;
      }

      .inner {
        display: flex;
        position: static;
        flex-direction: column;
        min-width: 160px;
        padding: 5px 0;
        z-index: 1;
      }

    `}

    .cart {
      position: relative;
      margin-right: 30px;
      margin-top: 10px;

      span {
        position: absolute;
        top: -12px;
        right: -22px;
        background-color: ${Colors.White};
        color: ${Colors.veryDarkGrayishBlue};
        border-radius: 50%;
        padding: 1px;
        display:flex;
        justify-content: center;
        align-items: center;
        width: 25px;
        height: 25px;
      }
    }

  @media screen and (max-width: 480px) {
    a:not(.icon) {
      display: none;
    }

    .dropdown-header {
      display: none;
    }

    a.icon {
      float: right;
      display: block;
    }
  }

  @media (max-width: 900px) {
    a:not(.icon):not(.logo-link) {
      display: none;
    }

    .dropdown-header {
      display: none;
    }

    a.icon {
      float: right;
      display: block;
    }
  }
`;

export const NavBar = connect(mapStateToProps)(Navigation);
