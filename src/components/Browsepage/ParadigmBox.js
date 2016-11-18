import React from 'react';
import logger from '../../utils/logger';
import {Button} from 'react-bootstrap';

//items, removeHandler
var ParadigmBox = React.createClass({
  //notice that getInitialState won't be called again when thw paraent component of this does setState
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
               value={this.props.items}></input>
        <Button onClick={this.handleRemove}>Remove</Button>
      </div>
    );
  }
});

export default ParadigmBox;