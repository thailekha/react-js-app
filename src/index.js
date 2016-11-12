import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import MyApp from './App';
import './index.css';
import logger from './utils/logger';

//view components
import Homepage from './components/Homepage';
import Login from './components/Login';
import Profilepage from './components/Profilepage';
import {BrowsepageContainer, BrowsepageCreateBoxPL, BrowsepageCreateBoxPD, PLContent, PDContent} from './components/Browsepage';

//Auth0 and router
import {Router, Route, IndexRedirect, hashHistory} from 'react-router';
import AuthService from './utils/AuthService';
import Container from './Container';


const auth = new AuthService(__AUTH0_CLIENT_ID__, __AUTH0_DOMAIN__);

// onEnter callback to validate authentication in private routes
const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    console.log('Not logged in !');
    replace({pathname: '/login'});
  }
  else {
    console.log('requireAuth OK');
  }
};

const doLogout = (nextState, replace) => {
  if (auth.loggedIn()) {
    auth.logout();
  }
  replace({pathname: '/login'});
};

//Notes: /home and /login is default and required by auth0
console.log(auth.loggedIn());
const routes = (
  <Route path="/" component={Container} auth={auth}>
    <IndexRedirect to="/home"/>
    <Route path="home" navID="home" component={Homepage} onEnter={requireAuth}/>
    <Route path="login" component={Login}/>
    <Route path="profile" navID="profile" component={Profilepage} onEnter={requireAuth}/>

    /*Move browsepage container here maybe*/
    <Route path="browse" navID="browse/" component={BrowsepageContainer} onEnter={requireAuth}>
      <IndexRedirect to="/browse/createboxpl"/>
      <Route path="createboxpl" sendToChildren="pl" component={BrowsepageCreateBoxPL}/>
      <Route path="createboxpd" sendToChildren="pd" component={BrowsepageCreateBoxPD}/>
      <Route path="pl/:id" sendToChildren="pl" component={PLContent}/>
      <Route path="pd/:id" sendToChildren="pd" component={PDContent}/>
    </Route>
    <Route path="logout" onEnter={doLogout}/>
    <Route path="access_token=:token" component={Login}/> //to prevent router errors
  </Route>
);

console.log('index.js -> Render');
ReactDOM.render(
  <MyApp history={hashHistory}
         routes={routes}/>,
  document.getElementById('root')
);
//logger.reportCounter();
