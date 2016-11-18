import React from 'react';
import logger from '../../utils/logger';
import {Button} from 'react-bootstrap';

//items, removeHandler
var ParadigmBox = React.createClass({
  handleRemove: function(e) {
    e.preventDefault();
    this.props.removeHandler();
  },
  render: function() {
    logger.reportRender('ParadigmBox');
    return (
      <div>
        <input type="text" disabled
               className="form-control"
               value={this.props.items}/>
        <Button onClick={this.handleRemove}>Remove</Button>
      </div>
    );
  }
});

export default ParadigmBox;