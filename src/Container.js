import React, {PropTypes as T} from 'react';
import {Jumbotron} from 'react-bootstrap';
import logger from './utils/logger';
import {U, _API} from './utils/util';
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
      console.log(theState);
      if(extractAuth(this).loggedIn()) {
        theState['library'] = undefined;
      }
      return theState;
    }
    return null;
  },
  createLib: function(libName) {
    if (loggedInAndHasEmail(this)) {
      console.log('Container/createLib()');
      //server will response with the new library object so U will handle setting state
      U.createLibrary(extractAuth(this).getProfile().email, libName, this);
    }
  },
  setLib: function() {
    if (loggedInAndHasEmail(this)) {
      console.log('Container/setLib()');
      var email = extractAuth(this).getProfile().email;
      U.getLibrary(email,this);
    }
  },
  deleteLib: function() {
    if(loggedInAndHasEmail(this)) {
      console.log('Container/deleteLib()');
      console.log('delete library called');
    }
  },
  addPL:  function(name, details, type, paradigmIds) {
    if(loggedInAndHasEmail(this)) {
      console.log('Container/addPL()');
      console.log('Create new PL ' + name + ' ' + details + ' ' + type + ' ' + paradigmIds);
      _API.addProgrammingLanguage(this.state.library, name, details, type, paradigmIds,this);
    }
  },
  addPD: function(name, details, subparadigms) {
    if(loggedInAndHasEmail(this)) {
      console.log('Container/addPD()');
      console.log('Create new PD ' + name + details + subparadigms);
    }
  },
  getPropertyFromLibrary: function(property) {
    if(loggedInAndHasEmail(this)) {
      console.log('Container/getPropertyFromLibrary()');
      return this.state.library[property];
    }
  },
  getPDID: function(name) {
    if(loggedInAndHasEmail(this)) {
      console.log('Container/getPDID()');
      return _API.getParadigmId(this.state.library,name);
    }
  },
  getRelatedPDs: function(programmingLanguageID) {
    if(loggedInAndHasEmail(this)) {
      console.log('Container/getRelatedPDs()');
      return _API.getRelatedParadigms(this.state.library,programmingLanguageID);
    }
  },
  getPL: function(programmingLanguageID) {
    if(loggedInAndHasEmail(this)){
      console.log('Container/getPL()');
      return _API.getProgrammingLanguage(this.state.library,programmingLanguageID);
    }
  },
  deletePL: function(programmingLanguageID) {
    if(loggedInAndHasEmail(this)){
      console.log('Container/deletePL()');
      _API.deleteProgrammingLanguage(this.state.library,programmingLanguageID,this);
    }
  },
  getPD: function(paradigmID) {
    if(loggedInAndHasEmail(this)) {
      console.log('Container/getPD()');
      return _API.getParadigm(this.state.library, paradigmID);
    }
  },
  //TODO if(loggedInAndHasEmail(this)), this.state.library

  //TODO: MAY FIX componentDidMount to fix the "after FRESHLY logging in" error
  componentDidMount: function() {
    console.log('Container componentDidMount called');
    this.setLib();
  },
  render() {
    logger.reportRender('Container');
    let children = null;
    if (this.props.children) {
      console.log('Cloning children');

      //note that json-server return filtered query as an array
      var library = loggedInAndHasEmail(this) ? this.state['library'] : undefined;
      const libraryManager = {
        create: library ? undefined : this.createLib,
        reload: this.setLib,
        delete: library ? this.deleteLib : undefined,
        addPL: library ? this.addPL : undefined,
        getPL: library ? this.getPL : undefined,
        deletePL: library ? this.deletePL : undefined,
        addPD: library ? this.addPD : undefined,
        getPD:library ? this.getPD : undefined,
        getAttr: library ? this.getPropertyFromLibrary : undefined,
        getPDID: library ? this.getPDID : undefined,
        getRelatedPDs: library ? this.getRelatedPDs : undefined,
        available: U.isDefined(library)
        //TODO ADD PL,PD, ETC.
      };
      var setLibraryHandler = loggedInAndHasEmail(this) ? this.setLib: undefined;
      children = React.cloneElement(this.props.children, {
        //this.props.route is from the router
        auth: extractAuth(this), //sends auth instance to children
        library: library,
        setLibraryHandler: setLibraryHandler,
        userProfile: hasUserProfile(this) ? extractAuth(this).getProfile() : undefined,
        libraryManager: libraryManager
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
