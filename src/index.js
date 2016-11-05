import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import MyApp from './App';
import './index.css';
import logger from './utils/logger';

//view components
import Homepage from './components/Homepage';
import Login from './components/Login';

//Auth0 and router
import {Router, Route, IndexRedirect, hashHistory} from 'react-router';
import AuthService from './utils/AuthService';
import Container from './Container';

const auth = new AuthService(__AUTH0_CLIENT_ID__, __AUTH0_DOMAIN__);

// onEnter callback to validate authentication in private routes
const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({pathname: '/login'});
  }
};

const routes = (
  <Route path="/" component={Container} auth={auth}>
    <IndexRedirect to="/home"/>
    <Route path="home" component={Homepage} onEnter={requireAuth}/>
    <Route path="login" component={Login}/>
    <Route path="access_token=:token" component={Login}/> //to prevent router errors
  </Route>
);

ReactDOM.render(
  <MyApp history={hashHistory}
         routes={routes}/>,
  document.getElementById('root')
);
logger.reportCounter();
