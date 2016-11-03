import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import logger from './logger'

//Components
import Landpage from './components/Landpage';
import NavigationBar from './components/NavigationBar';
import Homepage from './components/Homepage';
import Browsepage from './components/Browsepage';

var MyApp = React.createClass({

  render: function() {
    logger.reportRender('MyApp');
    return (
      <div>
        
      </div>
    );
  }
});

//<Landpage />
//<NavigationBar />
//<Homepage />
//<Browsepage />

export default MyApp;
