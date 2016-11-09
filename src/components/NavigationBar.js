import React from 'react';
import {Link} from 'react-router';
import logger from '../utils/logger';

//https://github.com/ReactTraining/react-router/blob/master/docs/API.md#link
var NavigationBar = React.createClass({
  /* ... options and lifecycle methods ... */
  render: function() {
    logger.reportRender('NavigationBar');
    var navigationItems = ['home', 'browse', 'Find', 'profile', 'logout'].map(function(navItem, index) {
      return (<li id={'tab' + index}>
        <Link key={index} to={navItem}>{navItem}</Link>
      </li>);
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