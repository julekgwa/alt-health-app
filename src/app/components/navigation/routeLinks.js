import {
  faBars
} from '@fortawesome/free-solid-svg-icons';

import {
  FontAwesomeIcon
} from '@fortawesome/react-fontawesome';

import PropTypes from 'prop-types';

import React from 'react';

import {
  NavLink
} from 'react-router-dom';

import Logo from 'app/assets/logo.png';

import {
  Dropdown
} from './dropdown';

import {
  NavbarDropdownContent
} from './dropdownContent';

const Links = ({ toggleMenu, }) => (
  <React.Fragment>
    <a href='#mobile' className='icon' onClick={toggleMenu}>
      <FontAwesomeIcon data-testid='mobile' icon={faBars} />
    </a>

    <div className='mobile-menu'>
      <NavLink exact strict to='/'>
        Home
      </NavLink>

      <Dropdown className='some-div'>
        <span className='dropdown-header'>Info</span>
        <NavbarDropdownContent className='inner'>
          <NavLink exact strict to='/reminders'>
            Client Info
          </NavLink>

          <NavLink exact strict to='/reminders'>
            Supplier Info
          </NavLink>

          <NavLink exact strict to='/reminders'>
            Supplement Info
          </NavLink>
        </NavbarDropdownContent>
      </Dropdown>
      <Dropdown>
        <span className='dropdown-header'>Day-to-day report</span>
        <NavbarDropdownContent className='inner'>
          <NavLink exact strict to='/reminders'>
            Unpaid Invoices
          </NavLink>

          <NavLink exact strict to='/reminders'>
            Birthdays for today (current date)
          </NavLink>

          <NavLink exact strict to='/reminders'>
            Minimum stock levels
          </NavLink>

          <NavLink exact strict to='/reminders'>
            MIS report - Top 10 clients for 2018 and 2019
          </NavLink>

          <NavLink exact strict to='/reminders'>
            Purchases statistics (2012 - current)
          </NavLink>

          <NavLink exact strict to='/reminders'>
            Client Information Query
          </NavLink>
        </NavbarDropdownContent>
      </Dropdown>
    </div>
    <NavLink exact strict to='/' className='logo-link'>
      <div className='logo'>
        <img src={Logo} alt='logo' />
        <p>ALT-HEALTH</p>
      </div>
    </NavLink>
  </React.Fragment>
);

Links.propTypes = {
  toggleMenu: PropTypes.func.isRequired,
};

export const RoutesLinks = Links;
