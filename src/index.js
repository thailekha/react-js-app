import '../node_modules/bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import MyApp from './App';
import './index.css';

//view components
import {Homepage} from './components/Homepage';
import Login from './components/Login';
import Profilepage from './components/Profilepage';
import BrowsepageContainer from './components/Browsepage/Browsepage';
import {BrowsepageCreateEditBoxPL, BrowsepageCreateEditBoxPD} from './components/Browsepage/CreateEditBox';
import {PLContent, PDContent} from './components/Browsepage/Content';
import Findpage from './components/Findpage';

//Auth0 and router
import {Route, IndexRedirect, hashHistory} from 'react-router';
import AuthService from './utils/AuthService';
import Container from './Container';

const auth = new AuthService('eovaKsTfC8LLOjnFmyDLVJrTjs1idPwl', 'thailekha.auth0.com');
//const auth = new AuthService(__AUTH0_CLIENT_ID__, __AUTH0_DOMAIN__);

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
//console.log(auth.loggedIn());

const routes = (
  <Route path="/" component={Container} auth={auth}>
    <IndexRedirect to="/home"/>
    <Route path="home" navID="home" component={Homepage} onEnter={requireAuth}/>
    <Route path="login" component={Login}/>
    <Route path="profile" navID="profile" component={Profilepage} onEnter={requireAuth}/>
    <Route path="browse" navID="browse" component={BrowsepageContainer} onEnter={requireAuth}>
      <IndexRedirect to="/browse/createboxpl"/>
      <Route path="createboxpl" sendToChildren="create" component={BrowsepageCreateEditBoxPL}/>
      <Route path="createboxpd" sendToChildren="create" component={BrowsepageCreateEditBoxPD}/>
      <Route path="editboxpl/:id" sendToChildren="edit" component={BrowsepageCreateEditBoxPL}/>
      <Route path="editboxpd/:id" sendToChildren="edit" component={BrowsepageCreateEditBoxPD}/>
      <Route path="pl/:id" component={PLContent}/>
      <Route path="pd/:id" component={PDContent}/>
    </Route>
    <Route path="find" navID="find" component={Findpage} onEnter={requireAuth}/>
    <Route path="logout" onEnter={doLogout}/>
    <Route path="access_token=:token" component={Login}/> //to prevent router errors
  </Route>
);

ReactDOM.render(
  <MyApp history={hashHistory}
         routes={routes}/>,
  document.getElementById('root')
);