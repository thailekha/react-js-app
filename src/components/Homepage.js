import React, {PropTypes as T} from 'react';
import {Button} from 'react-bootstrap';
import logger from '../utils/logger';

var CreateBox = React.createClass({
  /* ... options and lifecycle methods ... */
  getInitialState: function() {
    return {name: ''};
  },
  handleCreate: function(e) {
    if (this.state.name.length > 0) {
      e.preventDefault();
      this.props.libraryManager.create(this.state.name);
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

var Homepage = React.createClass({
  /* ... options and lifecycle methods ... */
  // componentDidMount: function() {
  //   console.log('Homepage/reload');
  //   this.props.libraryManager.setLibraryHandler();
  // },
  render: function() {
    logger.reportRender('Homepage');
    var numberOfLanguages = 10;
    var numberOfParadigms = 10;
    return (
      <div>
        <h2>A programmer repo</h2>
        <h3>Programming languages: {numberOfLanguages}</h3>
        <h3>Paradigms: {numberOfParadigms}</h3>
        {
          this.props.libraryManager.available ?
            (<h3>{this.props.libraryManager.getAttr('name')}</h3>) :
            (<CreateBox libraryManager={this.props.libraryManager}/>)
        }
      </div>
    );
  },
});

export default Homepage;