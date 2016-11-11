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
  createLibrary: function(libName) {
    if (loggedInAndHasEmail(this)) {
      console.log('Homepage create library');
      //server will response with the new library object so U will handle setting state
      U.createLibrary(extractAuth(this).getProfile().email, libName, this);
    }
  },
  setLibrary: function() {
    if (loggedInAndHasEmail(this)) {
      var email = extractAuth(this).getProfile().email;
      //req, component, toDoWithRes
      //make request to server to get the library
      U.makeReq('libraries/?email=' + email, this, function(component,objectFromServer) {
        console.log('******');
        if(Array.isArray(objectFromServer) && objectFromServer.length === 1) {
          console.log('~~~~~');
          component.setState({
            library: objectFromServer[0]
          });
        }
      });
    }
  },
  deleteLibrary: function() {
    if(loggedInAndHasEmail(this)) {
      console.log('delete library called');
    }
  },
  addProgrammingLanguage:  function(name, details, type, paradigmIds) {
    if(loggedInAndHasEmail(this)) {
      console.log('Create new PL ' + name + ' ' + details + ' ' + type + ' ' + paradigmIds);
      _API.addProgrammingLanguage(this.state.library, name, details, type, paradigmIds,this);
    }
  },
  addParadigm: function(name, details, subparadigms) {
    if(loggedInAndHasEmail(this)) {
      console.log('Create new PD ' + name + details + subparadigms);
    }
  },
  getPropertyFromLibrary: function(property) {
    if(loggedInAndHasEmail(this)) {
      return this.state.library[property];
    }
  },
  getParadigmID: function(name) {
    if(loggedInAndHasEmail(this)) {
      return _API.getParadigmId(this.state.library,name);
    }
  },
  getRelatedParadigms: function(programmingLanguageID) {
    if(loggedInAndHasEmail(this)) {
      return _API.getRelatedParadigms(this.state.library,programmingLanguageID);
    }
  },
  getProgrammingLanguage: function(programmingLanguageID) {
    if(loggedInAndHasEmail(this)){
      console.log('Container/getProgrammingLanguage()');
      return _API.getProgrammingLanguage(this.state.library['ProgrammingLanguages'],programmingLanguageID);
    }
  },
  deleteProgrammingLanguage: function(programmingLanguageID) {
    if(loggedInAndHasEmail(this)){
      _API.deleteProgrammingLanguage(this.state.library,programmingLanguageID,this);
    }
  },
  getParadigm: function(paradigmID) {
    if(loggedInAndHasEmail(this)) {
      return _API.getParadigm(this.state.library['Paradigms'], paradigmID);
    }
  },
  //TODO if(loggedInAndHasEmail(this)), this.state.library

  //TODO: MAY FIX componentDidMount to fix the "after FRESHLY logging in" error
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
      const libraryManager = {
        create: library ? undefined : this.createLibrary,
        reload: this.setLibrary,
        delete: library ? this.deleteLibrary: undefined,
        addPL: library ? this.addProgrammingLanguage : undefined,
        getPL: library ? this.getProgrammingLanguage : undefined,
        deletePL: library ? this.deleteProgrammingLanguage : undefined,
        addPD: library ? this.addParadigm : undefined,
        getPD:library ? this.getParadigm : undefined,
        getAttr: library ? this.getPropertyFromLibrary : undefined,
        getPDID: library ? this.getParadigmID : undefined,
        getRelatedParadigms: library ? this.getRelatedParadigms : undefined,
        available: U.isDefined(library)
        //TODO ADD PL,PD, ETC.
      };
      var setLibraryHandler = loggedInAndHasEmail(this) ? this.setLibrary: undefined;
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
