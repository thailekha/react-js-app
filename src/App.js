import React, {PropTypes} from 'react';
import './App.css';
import logger from './utils/logger'
import {Router} from 'react-router';


var MyApp = React.createClass({
  contextTypes: {
    router: PropTypes.object
  },
  propTypes: {
    history: PropTypes.object.isRequired,
    routes: PropTypes.element.isRequired
  },
  getContent: function() {
    return (
      <Router
        routes={this.props.routes}
        history={this.props.history}/>
    )
  },
  render: function() {
    logger.reportRender('MyApp');
    return (
      <div style={{ height: '100%' }}>
        {this.getContent()}
      </div>
    );
  }
});

export default MyApp;
