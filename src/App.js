import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import logger from './logger'

var NavigationItem = React.createClass({
  /* ... options and lifecycle methods ... */
  render: function() {
    logger.reportRender('NavigationItem');
    return (
      <li><a href="#">{this.props.navigationItem}</a></li>
    );
  },
})

var NavigationBar = React.createClass({
  /* ... options and lifecycle methods ... */
  render: function() {
    logger.reportRender('NavigationBar');
    var navigationItems = ['Home','Browse','Find','Profile','Logout'].map(function(navItem, index) {
      return <NavigationItem key={index} navigationItem={navItem} />
    });
    return (
      <div id="navigation">
        <ul id="tabs">
          {navigationItems}
        </ul>
      </div>
    );
  },
})


var MyApp = React.createClass({

  render: function() {
    logger.reportRender('MyApp');
    return (
      <div>
        <h2>My App</h2>
        <NavigationBar />
      </div>
    );
  }
});

export default MyApp;
