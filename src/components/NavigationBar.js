import React, {PropTypes as T} from 'react';
import {Link} from 'react-router';
import logger from '../utils/logger'
import AuthService from '../utils/AuthService';

//https://github.com/ReactTraining/react-router/blob/master/docs/API.md#link
var NavigationItem = React.createClass({
  /* ... options and lifecycle methods ... */
  render: function() {
    logger.reportRender('NavigationItem');
    var item = this.props.navigationItem;
    var toRender = item === 'logout' ?
      (<button onClick={this.props.handleLogout}>{item}</button>) : (<Link to={item}>{item}</Link>);
    return toRender;
  },
});

var NavigationBar = React.createClass({
  contextTypes: {
    router: T.object
  },
  propTypes: {
    auth: T.instanceOf(AuthService)
  },
  getInitialState() {
    this.props.auth.on('profile_updated', (newProfile) => {
      console.log('homepage.js -> on profile updated');
      this.setState({profile: newProfile})
    });
    return {profile: this.props.auth.getProfile()};
  },
  logout() {
    this.props.auth.logout();
    this.context.router.push('/login');
  },
  /* ... options and lifecycle methods ... */
  render: function() {
    logger.reportRender('NavigationBar');
    var navigationItems = ['home', 'Browse', 'Find', 'Profile', 'logout'].map(function(navItem, index) {
      return <NavigationItem key={index} navigationItem={navItem} handleLogout={this.logout}/>
    }.bind(this));
    return (
      <div id="navigation">
        <ul id="tabs">
            {navigationItems}
        </ul>
      </div>
    );
  },
});

export default NavigationBar;