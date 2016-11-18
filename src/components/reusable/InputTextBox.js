import React from 'react';
import logger from '../../utils/logger';
import {Button} from 'react-bootstrap';

//header, placeholder, submitHandler
var InputTextBox = React.createClass({
  getInitialState: function() {
    return {text: ''}
  },
  handleTextChange: function(e) {
    this.setState({
      text: e.target.value
    });
  },
  handleSubmit: function(e){
    e.preventDefault();
    if(this.state.text.trim().length > 0) {
      this.props.submitHandler(this.state.text);
    }
    else {
      window.alert('Error: Empty field');
    }
  },
  render: function() {
    logger.reportRender('InputTextBox');
    return (
      <form>
      <h3>{this.props.header}</h3>
      <div className="form-group">
        <input type="text"
               className="form-control" placeholder={this.props.placeholder}
               value={this.state.text} onChange={this.handleTextChange}></input>
        <Button onClick={this.handleSubmit}>Submit</Button>
      </div>
    </form>
    );
  }
});

export default InputTextBox;