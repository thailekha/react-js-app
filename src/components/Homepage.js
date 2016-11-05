import React, {PropTypes as T} from 'react'
import logger from '../logger';
import AuthService from 'utils/AuthService'
import {Button} from 'react-bootstrap'

var Homepage = React.createClass({
  /* ... options and lifecycle methods ... */
  contextTypes: {
    router: T.object
  },
  propTypes: {
    auth: T.instanceOf(AuthService)
  },
  getInitialState() {
    console.log("Home.js -> " + typeof this.props.auth);
    this.props.auth.on('profile_updated', (newProfile) => {
      this.setState({profile: newProfile})
    });
    return {profile: this.props.auth.getProfile()};
  },
  logout() {
    this.props.auth.logout();
    this.context.router.push('/login');
  },
  render: function() {
    logger.reportRender('Homepage');
    var numberOfLanguages = 10;
    var numberOfParadigms = 10;
    return (
      <div>
        <h2>A programmer repo</h2>
        <h3>Programming languages: {numberOfLanguages}</h3>
        <h3>Paradigms: {numberOfParadigms}</h3>
        <Button onClick={this.logout}>Logout</Button>
      </div>
    );
  },
});

export default Homepage;