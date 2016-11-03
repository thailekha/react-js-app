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

var Landpage = React.createClass({
  /* ... options and lifecycle methods ... */
  render: function() {
    logger.reportRender('Landpage');
    var login = {
      header: 'Login',
      input1: 'Email',
      input2: 'Password'
    };
    var signup = {
      input1: 'Repo Name'
    };
    var mode = login;
    return (
      <div>
        <h1>Repo library</h1>
        <button>Mode: {mode.header}</button>
        <form style={{marginTop: '30px'}}>
          <div className="form-group">
            <input type="text"
                   className="form-control" placeholder="Email"></input>
          </div>
          <div className="form-group">
            <input type="text"
                   className="form-control" placeholder="Repo Name"></input>
          </div>
          <div className="form-group">
            <input type="text"
                   className="form-control" placeholder="Password"></input>
          </div>
          <button type="submit" className="btn btn-primary">{mode.header}</button>
        </form>
      </div>
    );
  }
})

var MyApp = React.createClass({

  render: function() {
    logger.reportRender('MyApp');
    return (
      <div>
        <Landpage />
      </div>
    );
  }
});

export default MyApp;
