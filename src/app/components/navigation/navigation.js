
import React,
{
  useState
} from 'react';

import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';

import {
  Home
} from 'app/components/containers/home';

import {
  NavBar
} from 'app/components/navigation/navBar';

import {
  RoutesLinks
} from 'app/components/navigation/routeLinks';

export const Navigation = () => {

  const [active, setActive] = useState(false);

  return (
    <BrowserRouter>
      <NavBar active={active}>
        <RoutesLinks toggleMenu={() => setActive(currentValue => !currentValue)} />
      </NavBar>
      <Switch>
        <Route exact path='/' component={Home} />
      </Switch>
    </BrowserRouter>
  );

};