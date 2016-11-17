import React from 'react';
import {Panel} from 'react-bootstrap';
import logger from '../utils/logger';

var Footer = React.createClass({
  shouldComponentUpdate: function(nextProps, nextState) {
    return false;
  },
  render: function() {
    logger.reportRender('Footer');
    return (<Panel id="footer" footer="Create by React.JS"></Panel>);
  }
});

export default Footer;