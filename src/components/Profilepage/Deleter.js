import React from 'react';
import logger from '../../utils/logger';
import {Button} from 'react-bootstrap';

var Deleter = React.createClass({
  getInitialState: function() {
    return {view: 'normal'}
  },
  handleDelete: function(e) {
    e.preventDefault();
    this.props.libraryManager.delete();
  },
  handleToggle: function() {
    var state = this.state.view;
    this.setState({view: state === 'normal' ? 'delete' : 'normal'})
  },
  render: function() {
    logger.reportRender('Deleter');
    return (
      <div>
        <br />
        {
          this.state.view === 'normal'
            ?
            (<Button onClick={this.handleToggle} bsStyle="danger">Delete this Library</Button>)
            :
            (<div>
              <Button onClick={this.handleDelete} bsStyle="warning">Confirm</Button>
              <Button onClick={this.handleToggle}>Cancel</Button>
            </div>)
        }
      </div>
    );
  }
});

export default Deleter;