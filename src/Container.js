import React, {PropTypes as T} from 'react';
import {Jumbotron} from 'react-bootstrap';
import logger from './utils/logger';
import U from './utils/util';

const needCheckLibrary = function(component) {
  return U.isDefined(component.props.route.auth) && component.props.route.auth.loggedIn() && U.isDefined(component.props.route.auth.getProfile().email);
};

var Container = React.createClass({
  contextTypes: {
    router: T.object
  },
  componentDidMount: function() {
    console.log('Container componentDidMount called');
    console.log(needCheckLibrary(this));
    if (needCheckLibrary(this)) {
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
      if (needCheckLibrary(this)) {
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
