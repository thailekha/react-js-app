import React, {PropTypes as T} from 'react';
import {Button} from 'react-bootstrap';
import NavigationBar from './NavigationBar';
import logger from '../utils/logger';
import AuthService from '../utils/AuthService';
import makeReq from '../utils/util';

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
  propTypes: {
    auth: T.instanceOf(AuthService)
  },
  getInitialState() {
    this.props.auth.on('profile_updated', (newProfile) => {
      console.log('homepage.js -> on profile updated');
      this.setState({profile: newProfile})
    });

    return {profile: this.props.auth.getProfile()};
  },
  componentDidMount: function() {
    var email = this.props.auth.getProfile().email;
    makeReq('libraries/?email=' + email, 'library' + email, this);
  },
  render: function() {
    logger.reportRender('Homepage');
    var library = localStorage.getItem('library') ? JSON.parse(localStorage.getItem('library')) : undefined;
    var numberOfLanguages = 10;
    var numberOfParadigms = 10;
    return (
      <div>
        <NavigationBar />
        <h2>A programmer repo</h2>
        <h3>Programming languages: {numberOfLanguages}</h3>
        <h3>Paradigms: {numberOfParadigms}</h3>

        {typeof library === 'undefined' ? (<CreateBox />) : library.name}
      </div>
    );
  },
});

export default Homepage;