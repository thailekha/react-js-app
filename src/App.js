import React, {PropTypes} from 'react';
import logger from './utils/logger'
import {Router} from 'react-router';
import {Button} from 'react-bootstrap';
import Header from 'components/Header';
import Footer from 'components/Footer';


var MyApp = React.createClass({
  contextTypes: {
    router: PropTypes.object
  },
  propTypes: {
    history: PropTypes.object.isRequired,
    routes: PropTypes.element.isRequired
  },
  handleReportRender: function(e){
    e.preventDefault();
    logger.reportCounter();
  },
  handleResetReportRander: function(e){
    e.preventDefault();
    logger.reset();
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
        <Header />
        {this.getContent()}
        <Button bsStyle="primary" onClick={this.handleReportRender}>Report render</Button>
        <Button bsStyle="primary" onClick={this.handleResetReportRander}>Reset report render</Button>
        <Footer />
      </div>
    );
  }
});

export default MyApp;
