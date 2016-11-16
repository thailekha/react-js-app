import React from 'react';
import {Button} from 'react-bootstrap';
import logger from '../../utils/logger';

var CreateBox = React.createClass({
  /* ... options and lifecycle methods ... */
  getInitialState: function() {
    return  {name: ''};
  },
  handleCreate: function(e) {
    if (this.state.name.length > 0) {
      e.preventDefault();
      this.props.createHandler(this.state.name);
      this.setState({name: ''});
    }
  },
  handleNameChange: function(e) {
    this.setState({name: e.target.value});
  },
  render: function() {
    logger.reportRender('CreateBox');
    return (
      <form style={{marginTop: '30px'}}>
        <h3>Create a new library</h3>
        <div className="form-group">
          <input type="text"
                 className="form-control" placeholder="Name"
                 value={this.state.name}
                 onChange={this.handleNameChange}></input>
        </div>
        <Button type="submit" className="btn btn-primary" onClick={this.handleCreate}>Create</Button>
      </form>
    );
  },
});

export default CreateBox;