import React, {PropTypes as T} from 'react';
import {Jumbotron} from 'react-bootstrap';
import logger from './utils/logger';
import {U} from './utils/util';
import AuthService from './utils/AuthService';
import NavigationBar from './components/NavigationBar';

var loggedInAndHasEmail = function(component) {
  // console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>');
  // console.log(component.props.route.auth);
  // console.log(component.props.route.auth.loggedIn());
  // console.log(component.props.route.auth.getProfile());
  // console.log(component.props.route.auth.getProfile().email);
  // console.log(U.isDefined(component.props.route.auth));
  // console.log(U.isDefined(component.props.route.auth.getProfile().email));
  // U.isDefined(component.props.route.auth) && component.props.route.auth.loggedIn() && U.isDefined(component.props.route.auth.getProfile().email);
  // console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<');
  return U.isDefined(component.props.route.auth) &&
    component.props.route.auth.loggedIn() &&
    U.isDefined(component.props.route.auth.getProfile().email);
};

var hasUserProfile = function(component) {
  return U.isDefined(component.props.route.auth) &&
    component.props.route.auth.loggedIn() &&
    U.isDefined(component.props.route.auth.getProfile());
}

//this statement is too errorprone
const extractAuth = function(component) {
  return component.props.route.auth;
}

var Container = React.createClass({
  propTypes: {
    auth: T.instanceOf(AuthService)
  },
  contextTypes: {
    router: T.object
  },
  getInitialState() {
    if (U.isDefined(extractAuth(this))) {
      extractAuth(this).on('profile_updated', (newProfile) => {
        console.log('homepage.js -> on profile updated');
        this.setState({profile: newProfile})
      });

      var theState = {profile: extractAuth(this).getProfile()};
      if(extractAuth(this).loggedIn()) {
        theState['library'] = undefined;
      }
      return theState;
    }
    return null;
  },
  setLibrary: function() {
    if (loggedInAndHasEmail(this)) {
      var email = extractAuth(this).getProfile().email;
      //req, component, toDoWithRes
      //make request to server to get the library
      U.makeReq('libraries/?email=' + email, this, function(component,objectFromServer) {
        if(Array.isArray(objectFromServer) && objectFromServer.length === 1) {
          component.setState({
            library: objectFromServer[0]
          });
        }
      });
    }
  },
  componentDidMount: function() {
    console.log('Container componentDidMount called');
    this.setLibrary();
  },
  render() {
    logger.reportRender('Container');
    let children = null;
    if (this.props.children) {
      console.log('Cloning children');

      //note that json-server return filtered query as an array
      var library = loggedInAndHasEmail(this) ? this.state['library'] : undefined;
      var handleSetLibrary = loggedInAndHasEmail(this) ? this.setLibrary: undefined;
      children = React.cloneElement(this.props.children, {
        //this.props.route is from the router
        auth: extractAuth(this), //sends auth instance to children
        library: library,
        handleSetLibrary: handleSetLibrary,
        userProfile: hasUserProfile(this) ? extractAuth(this).getProfile() : undefined
      })
    }

    return (
      <Jumbotron id="containerRoot">
        <h2>
          Container
          <img src="https://cdn.auth0.com/styleguide/1.0.0/img/badge.svg"/>
        </h2>
        {
          U.isDefined(extractAuth(this)) && extractAuth(this).loggedIn() && typeof children !== 'null' ?
            (<div id={children.props.route.navID}><NavigationBar /></div>) :
            (<div></div>)
        }
        {children}
      </Jumbotron>
    )
  }
});

export default Container;
