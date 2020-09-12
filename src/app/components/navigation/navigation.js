
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
  Home
} from 'app/pages/home';

import {
  Info
} from 'app/pages/info';

import {
  Report
} from 'app/pages/reports';

import {
  MenuBar
} from '../window-buttons/menubar';

export const Navigation = () => {

  return (
    <React.Fragment>
      <MenuBar />
      <BrowserRouter>
        <NavBar>
          <RoutesLinks />
        </NavBar>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/info/:info' component={Info} />
          <Route exact path='/report/:report' component={Report} />
        </Switch>
      </BrowserRouter>
    </React.Fragment>
  );

};