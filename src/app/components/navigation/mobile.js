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
} from './dropdown';

import {
  NavbarDropdownContent
} from './dropdownContent';

export function Mobile({ style, isMobile, key, }) {

  return (
    <animated.div
      key={key}
      className='mobile-menu'
      style={style}
    >
      <NavLink exact strict to='/'>
                Home
      </NavLink>

      <Dropdown isMobile={isMobile} className='some-div'>
        <span className='dropdown-header'>Info</span>
        <NavbarDropdownContent className='inner'>
          <NavLink exact strict to='/info/client'>
                    Client Info
          </NavLink>

          <NavLink exact strict to='/info/supplier'>
                    Supplier Info
          </NavLink>

          <NavLink exact strict to='/info/supplement'>
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

          <NavLink exact strict to='/report/client-info'>
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
};

