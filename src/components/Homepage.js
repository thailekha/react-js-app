import React, {PropTypes as T} from 'react';
import {Button} from 'react-bootstrap';
import logger from '../utils/logger';
import {U} from '../utils/util';

var CreateBox = React.createClass({
  /* ... options and lifecycle methods ... */
  getInitialState: function() {
    return {name: ''};
  },
  handleCreate: function(e) {
    if(this.state.name.length > 0) {
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

var Homepage = React.createClass({
  /* ... options and lifecycle methods ... */
  createLibrary: function(libName) {
    console.log('Homepage create library');
    U.createLibrary(this.props.userProfile.email,libName,this);
  },
  render: function() {
    logger.reportRender('Homepage');
    var library = this.props.library;
    var numberOfLanguages = 10;
    var numberOfParadigms = 10;
    return (
      <div>
        <h2>A programmer repo</h2>
        <h3>Programming languages: {numberOfLanguages}</h3>
        <h3>Paradigms: {numberOfParadigms}</h3>
        {
          typeof library === 'undefined' ?
            (<CreateBox createHandler={this.createLibrary} />) :
            (<h3>{library.name}</h3>)
        }
      </div>
    );
  },
});

export default Homepage;