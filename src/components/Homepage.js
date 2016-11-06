import React from 'react'
import {Button} from 'react-bootstrap';
import NavigationBar from './NavigationBar';
import logger from '../utils/logger';

var Homepage = React.createClass({
  /* ... options and lifecycle methods ... */
  render: function() {
    logger.reportRender('Homepage');
    var numberOfLanguages = 10;
    var numberOfParadigms = 10;
    return (
      <div>
        <NavigationBar/>
        <h2>A programmer repo</h2>
        <h3>Programming languages: {numberOfLanguages}</h3>
        <h3>Paradigms: {numberOfParadigms}</h3>
      </div>
    );
  },
});

export default Homepage;