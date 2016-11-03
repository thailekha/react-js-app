import React from 'react';
import logo from './logo.svg';
import './App.css';
import logger from './logger'

//Components
import Landpage from './components/Landpage';
import NavigationBar from './components/NavigationBar';
import Homepage from './components/Homepage';
import Browsepage from './components/Browsepage';
import Profilepage from './components/Profilepage';
import Findpage from './components/Findpage';

var MyApp = React.createClass({

  render: function() {
    logger.reportRender('MyApp');
    return (
      <div>
        <Findpage/>
      </div>
    );
  }
});

//<Landpage />
//<NavigationBar />
//<Homepage />
//<Browsepage />
//<Profilepage/>

export default MyApp;
