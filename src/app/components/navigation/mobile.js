import PropTypes from 'prop-types';

import React from 'react';

import {
  NavLink
} from 'react-router-dom';

import {
  animated
} from 'react-spring';

import {
  Dropdown
} from 'app/components/navigation/dropdown';

import {
  NavbarDropdownContent
} from 'app/components/navigation/dropdownContent';

export function Mobile({ style, isMobile, key, toggleMenu, }) {

  return (
    <animated.div
      key={key}
      className='mobile-menu'
      data-testid='mobile-view'
      style={style}
    >
      <NavLink onClick={toggleMenu} exact strict to='/'>
                Home
      </NavLink>

      <Dropdown isMobile={isMobile} className='some-div'>
        <span className='dropdown-header'>Info</span>
        <NavbarDropdownContent className='inner'>
          <NavLink onClick={toggleMenu} exact strict to='/info/clients'>
                    Client Info
          </NavLink>

          <NavLink onClick={toggleMenu} exact strict to='/info/suppliers'>
                    Supplier Info
          </NavLink>

          <NavLink onClick={toggleMenu} exact strict to='/info/supplements'>
                    Supplement Info
          </NavLink>
        </NavbarDropdownContent>
      </Dropdown>
      <Dropdown isMobile={isMobile}>
        <span className='dropdown-header'>
                  Day-to-day report
        </span>
        <NavbarDropdownContent className='inner'>
          <NavLink onClick={toggleMenu} exact strict to='/report/unpaid-invoices'>
                    Unpaid Invoices
          </NavLink>

          <NavLink onClick={toggleMenu} exact strict to='/report/birthdays'>
                    Birthdays for today (current date)
          </NavLink>

          <NavLink onClick={toggleMenu} exact strict to='/report/stock-levels'>
                    Minimum stock levels
          </NavLink>

          <NavLink onClick={toggleMenu} exact strict to='/report/top-clients'>
                    MIS report - Top 10 clients for 2018 and 2019
          </NavLink>

          <NavLink onClick={toggleMenu} exact strict to='/report/purchase-stats'>
                    Purchases statistics (2012 - current)
          </NavLink>

          <NavLink onClick={toggleMenu} exact strict to='/report/incomplete-client-info'>
                    Client Information Query
          </NavLink>
        </NavbarDropdownContent>
      </Dropdown>
    </animated.div>
  );

}
Mobile.propTypes = {
  style: PropTypes.any,
  isMobile: PropTypes.bool,
  key: PropTypes.string,
  toggleMenu: PropTypes.func,
};

