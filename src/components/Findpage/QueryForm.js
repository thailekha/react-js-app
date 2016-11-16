import React from 'react';
import logger from '../../utils/logger';
import {Button} from 'react-bootstrap';

var QueryForm = React.createClass({
  getInitialState: function() {
    return {find: ''}
  },
  handleFindChange: function(e) {
    this.setState({
      find: e.target.value
    });
  },
  handleFind: function(e){
    e.preventDefault();
    if (this.state.find.trim().length > 0)
      this.props.findHandler(this.state.find);
  },
  render: function() {
    logger.reportRender('QueryForm');
    return (
      <div className="form-group">
        <input type="text"
               className="form-control" placeholder="Query"
               value={this.state.find}
               onChange={this.handleFindChange}></input>
        <Button onClick={this.handleFind}>Find</Button>
      </div>
    );
  }
});

export default QueryForm;