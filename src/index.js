import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
//import MyApp from './App';
import './index.css';
import logger from './logger';

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
};
logger.reportRender('requireAuth');

export const makeMainRoutes = () => {
  return (
    <Route path="/" component={Container} auth={auth}>
      <IndexRedirect to="/login" />
      <Route path="home" component={Homepage} onEnter={requireAuth} />
      <Route path="login" component={Login} />
      <Route path="access_token=:token" component={Login} /> //to prevent router errors
    </Route>
  )
}

class App extends React.Component {
  static contextTypes = {
    router: PropTypes.object
  }

  static propTypes = {
    history: PropTypes.object.isRequired,
    routes: PropTypes.element.isRequired
  };

  get content() {
    return (
      <Router
        routes={this.props.routes}
        history={this.props.history} />
    )
  }

  render () {
    return (
      <div style={{ height: '100%' }}>
        {this.content}
      </div>
    )
  }
}

logger.reportRender('index.js');

const routes = makeMainRoutes();
ReactDOM.render(
  <App history={browserHistory}
       routes={routes}/>,
  document.getElementById('root')
);
console.log();
logger.reportCounter();
