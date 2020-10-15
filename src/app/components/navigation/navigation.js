
import platform from 'electron-platform';

import React from 'react';

import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';

import {
  NavBar
} from 'app/components/navigation/navBar';

import {
  RoutesLinks
} from 'app/components/navigation/routeLinks';

import {
  MenuBar
} from 'app/components/window-buttons/menubar';

import {
  Backups
} from 'app/pages/backup';

import {
  Cart
} from 'app/pages/cart';

import {
  Home
} from 'app/pages/home';

import {
  Info
} from 'app/pages/info';

import {
  Report
} from 'app/pages/reports';

export const Navigation = () => {

  return (
    <React.Fragment>
      {!platform.isPureWeb ? <MenuBar /> : ''}
      <BrowserRouter>
        <NavBar>
          <RoutesLinks />
        </NavBar>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/info/:info' component={Info} />
          <Route exact path='/report/:report' component={Report} />
          <Route exact path='/cart' component={Cart} />
          <Route exact path='/backups' component={Backups} />
        </Switch>
      </BrowserRouter>
    </React.Fragment>
  );

};