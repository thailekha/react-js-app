import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import logger from './logger'

var Homepage = React.createClass({
  /* ... options and lifecycle methods ... */
  render: function() {
    logger.reportRender('Homepage');
    var numberOfLanguages = 10;
    var numberOfParadigms = 10;
    return (
      <div>
        <h2>A programmer repo</h2>
        <h3>Programming languages: {numberOfLanguages}</h3>
        <h3>Paradigms: {numberOfParadigms}</h3>
      </div>
    );
  },
})

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
        <Homepage />
      </div>
    );
  }
});

export default MyApp;
