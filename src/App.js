import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import logger from './logger'

var SubNavigationItem = React.createClass({
  /* ... options and lifecycle methods ... */
  render: function() {
    logger.reportRender('SubNavigationItem');
    return (
      <li><a href="#">{this.props.subNavigationItem}</a></li>
    );
  },
})

var SubNavigationBar = React.createClass({
  /* ... options and lifecycle methods ... */
  render: function() {
    logger.reportRender('SubNavigationBar');
    var subNavigationItems = ['Java','Haskell','Javascript','Ruby'].map(function(navItem, index) {
      return <SubNavigationItem key={index} subNavigationItem={navItem} />
    });
    return (
      <div id="subNavigation">
        <ul id="tabs">
          {subNavigationItems}
        </ul>
      </div>
    );
  },
})

var Browsepage = React.createClass({
  /* ... options and lifecycle methods ... */
  render: function() {
    logger.reportRender('Browsepage');
    return (
      <div>
        <SubNavigationBar />
      </div>
    );
  },
})

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
        /*<Homepage />*/
        <Browsepage />
      </div>
    );
  }
});

export default MyApp;
