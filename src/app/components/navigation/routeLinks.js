import platform from 'electron-platform';

import PropTypes from 'prop-types';

import React from 'react';

import {
  connect
} from 'react-redux';

import {
  NavLink
} from 'react-router-dom';

import {
  useTransition
} from 'react-spring';

import Logo from 'app/assets/logo.png';

import {
  setIsActive
} from 'app/redux/actions';

import {
  Hamburger
} from '../hamburger/hamburger';

import {
  Dropdown
} from './dropdown';

import {
  NavbarDropdownContent
} from './dropdownContent';

import {
  Mobile
} from './mobile';

const mapStateToProps = (state) => ({
  isMobile: state.isActive,
});

const mapDispatchToProps = (dispatch) => ({
  toggleMenu: () => dispatch(setIsActive()),
});

const Links = ({ toggleMenu, isMobile, }) => {

  const transitions = useTransition(isMobile, null, {
    from: {
      opacity: 0,
      transform: 'translate3d(0,-40px,0)',
    },
    enter: {
      opacity: 1,
      transform: 'translate3d(0,0px,0)',
    },
    reset: true,
    unique: true,
  });

  return (
    <React.Fragment>
      <a href='#mobile-menu' className='icon'>
        <Hamburger isOpen={isMobile} onClick={toggleMenu}/>
      </a>
      {transitions.map(({ item, props, key, }) =>
        item ? (
          <Mobile key={key} style={props} toggleMenu={toggleMenu} isMobile={isMobile} />
        ) : platform.isPureWeb ? (
          <div key={key} className='mobile-menu'>
            <NavLink exact strict to='/'>
              Home
            </NavLink>

            <Dropdown isMobile={isMobile} className='some-div'>
              <span className='dropdown-header'>Info</span>
              <NavbarDropdownContent className='inner'>
                <NavLink exact strict to='/info/clients'>
                  Client Info
                </NavLink>

                <NavLink exact strict to='/info/suppliers'>
                  Supplier Info
                </NavLink>

                <NavLink exact strict to='/info/supplements'>
                  Supplement Info
                </NavLink>
              </NavbarDropdownContent>
            </Dropdown>
            <Dropdown isMobile={isMobile}>
              <span className='dropdown-header'>
                Day-to-day report
              </span>
              <NavbarDropdownContent className='inner'>
                <NavLink exact strict to='/report/unpaid-invoices'>
                  Unpaid Invoices
                </NavLink>

                <NavLink exact strict to='/report/birthdays'>
                  Birthdays for today (current date)
                </NavLink>

                <NavLink exact strict to='/report/stock-levels'>
                  Minimum stock levels
                </NavLink>

                <NavLink exact strict to='/report/top-clients'>
                  MIS report - Top 10 clients for 2018 and 2019
                </NavLink>

                <NavLink exact strict to='/report/purchase-stats'>
                  Purchases statistics (2012 - current)
                </NavLink>

                <NavLink exact strict to='/report/incomplete-client-info'>
                  Client Information Query
                </NavLink>
              </NavbarDropdownContent>
            </Dropdown>
          </div>
        ) : ''
      )}
      <NavLink exact strict to='/' className='logo-link'>
        <div className='logo'>
          <img src={Logo} alt='logo' />
          <p>ALT-HEALTH</p>
        </div>
      </NavLink>
    </React.Fragment>
  );

};

Links.propTypes = {
  toggleMenu: PropTypes.func.isRequired,
  isMobile: PropTypes.bool.isRequired,
};

export const RoutesLinks = connect(
  mapStateToProps,
  mapDispatchToProps
)(Links);
