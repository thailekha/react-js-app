import React, {PropTypes as T} from 'react';
import logger from '../utils/logger';
import AuthService from '../utils/AuthService';

//Logout stub - an empty component as a placeholder for doing logout
//Maybe move the logout triggering a bit up the lifecyle methods -> no need to render

var Logout = React.createClass({
  /* ... options and lifecycle methods ... */
  contextTypes: {
    router: T.object
  },
  propTypes: {
    auth: T.instanceOf(AuthService)
  },
  logout() {
    this.props.auth.logout();
    this.context.router.push('/login');
  },
  render: function() {
    logger.reportRender('Logout');
    this.logout();
    return (<div></div>);
  },
})