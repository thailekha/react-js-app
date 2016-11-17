import React from 'react'
import logger from '../utils/logger'

var Header = React.createClass({
  shouldComponentUpdate: function(nextProps,nextState){
    return false;
  },
  render: function(){
    logger.reportRender('Header');
    return <h1>My Library app</h1>
  }
});

export default Header;