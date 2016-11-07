import React, {PropTypes as T} from 'react';
import {Jumbotron} from 'react-bootstrap';
import logger from './utils/logger';
import U from './utils/util';

var Container = React.createClass({
  needCheckLibrary: function() {
    console.log('*********************');
    console.log(this.props.route.auth);
    console.log(this.props.route.auth.loggedIn());
    console.log(this.props.route.auth.getProfile());
    console.log(this.props.route.auth.getProfile().email);
    console.log(U.isDefined(this.props.route.auth));
    console.log(U.isDefined(this.props.route.auth.getProfile().email));
    U.isDefined(this.props.route.auth) && this.props.route.auth.loggedIn() && U.isDefined(this.props.route.auth.getProfile().email);
    console.log('*********************');
    return U.isDefined(this.props.route.auth) && this.props.route.auth.loggedIn() && U.isDefined(this.props.route.auth.getProfile().email);
  },
  contextTypes: {
    router: T.object
  },
  componentDidMount: function() {
    console.log('Container componentDidMount called');
    console.log(this.needCheckLibrary());
    if (this.needCheckLibrary()) {
      console.log('need to check lib, making req')
      var email = this.props.route.auth.getProfile().email;
      U.makeReq('libraries/?email=' + email, 'library' + email, this);
    }
  },
  render() {
    logger.reportRender('Container')
    let children = null;
    if (this.props.children) {
      console.log('Cloning children');

      var library = undefined;
      if (this.needCheckLibrary()) {
        var libraryName = 'library' + this.props.route.auth.getProfile().email;
        library = localStorage.getItem(libraryName) ?
          JSON.parse(localStorage.getItem(libraryName)) : undefined;
      }

      children = React.cloneElement(this.props.children, {
        //this.props.route is from the router
        auth: this.props.route.auth, //sends auth instance to children
        library: library
      })
    }
    return (
      <Jumbotron>
        <h2>
          Container
          <img src="https://cdn.auth0.com/styleguide/1.0.0/img/badge.svg"/>
        </h2>
        {children}
      </Jumbotron>
    )
  }
});

export default Container;
