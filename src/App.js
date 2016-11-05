import React from 'react';
import logo from './logo.svg';
import './App.css';
import logger from './logger'

import Homepage from './components/Homepage';
import Login from './components/Login/Login';

//Auth0
import {Router, Route, IndexRedirect, browserHistory} from 'react-router';
import AuthService from './utils/AuthService';
import Container from './views/Container';

const auth = new AuthService(__AUTH0_CLIENT_ID__, __AUTH0_DOMAIN__);
logger.reportRender('auth');

// onEnter callback to validate authentication in private routes
const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({ pathname: '/login' })
  }
}
logger.reportRender('requireAuth');

export const makeMainRoutes = () => {
  return (
    <Route path="/" component={Container} auth={auth}>
      <IndexRedirect to="/home" />
      <Route path="home" component={Homepage} onEnter={requireAuth} />
      <Route path="login" component={Login} />
      <Route path="access_token=:token" component={Login} /> //to prevent router errors
    </Route>
  )
}
logger.reportRender('mainRoutes');

var MyApp = React.createClass({
  render: function() {
    logger.reportRender('MyApp');
    return (
      makeMainRoutes()
      (
        <Router history={browserHistory}>
          {makeMainRoutes()}
        </Router>
      )
    );
  }
});



export default MyApp;
