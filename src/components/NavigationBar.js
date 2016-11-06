import React from 'react';
import {Link} from 'react-router';
import logger from '../utils/logger'

var NavigationItem = React.createClass({
  /* ... options and lifecycle methods ... */
  render: function() {
    logger.reportRender('NavigationItem');
    return (
      <Link to={this.props.navigationItem}>
        {this.props.navigationItem}
      </Link>
    );
  },
});

var NavigationBar = React.createClass({
  /* ... options and lifecycle methods ... */
  render: function() {
    logger.reportRender('NavigationBar');
    var navigationItems = ['home', 'Browse', 'Find', 'Profile', 'logout'].map(function(navItem, index) {
      return <NavigationItem key={index} navigationItem={navItem}/>
    });
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