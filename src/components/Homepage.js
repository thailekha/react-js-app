import React, {PropTypes as T} from 'react';
import {Button} from 'react-bootstrap';
import NavigationBar from './NavigationBar';
import logger from '../utils/logger';

var CreateBox = React.createClass({
  /* ... options and lifecycle methods ... */
  render: function() {
    logger.reportRender('CreateBox');
    return (
      <form style={{marginTop: '30px'}}>
        <div className="form-group">
          <input type="text"
                 className="form-control" placeholder="Name"></input>
        </div>
        <button type="submit" className="btn btn-primary">Create</button>
      </form>
    );
  },
});

var Homepage = React.createClass({
  /* ... options and lifecycle methods ... */
  render: function() {
    logger.reportRender('Homepage');
    var library = this.props.library;
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
    console.log(library);
    var numberOfLanguages = 10;
    var numberOfParadigms = 10;
    return (
      <div>
        <NavigationBar />
        <h2>A programmer repo</h2>
        <h3>Programming languages: {numberOfLanguages}</h3>
        <h3>Paradigms: {numberOfParadigms}</h3>

        {typeof library === 'undefined' ? (<CreateBox />) : (<h3>{library.name}</h3>)}
      </div>
    );
  },
});

export default Homepage;