import React, {PropTypes as T} from 'react';
import {Jumbotron} from 'react-bootstrap';
import logger from '../utils/logger';
import {U, _API, defineLibraryAppDataTypes} from '../utils/util';
import AuthService from '../utils/AuthService';
import NavigationBar from './NavigationBar';
import typify from 'typify';
import {Button} from 'react-bootstrap';

//defineLibraryAppDataTypes(typify);

const NOT_LOGGED_IN = -888; //any library object query from children component gets this if the app is not in logged-in state
const VOID = -999; //used if a function being registered with typify does not return anything

//register NOT_LOGGED_IN as a data type with typify
typify.type('NOT_LOGGED_IN', function(i) {
  return i === -888;
});
// typify.type('VOID', function(i) {
//   return i === -999;
// });

var loggedInAndHasEmail = function(component) {
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
      //console.log(theState);
      if (extractAuth(this).loggedIn()) {
        theState['library'] = undefined;
      }
      return theState;
    }
    return null;
  },
  createLib: typify('createLib :: string -> VOID | NOT_LOGGED_IN', function(libName) {
    if (loggedInAndHasEmail(this)) {
      console.log('Container/createLib()');
      //server will response with the new library object so U will handle setting state
      U.createLibrary(extractAuth(this).getProfile().email, libName, this);
      return VOID;
    }
    return NOT_LOGGED_IN;
  }),
  setLib: typify('setLib :: VOID | NOT_LOGGED_IN', function() {
    if (loggedInAndHasEmail(this)) {
      //console.warn('Container/setLib()');
      var email = extractAuth(this).getProfile().email;
      U.getLibrary(email, this);
      return VOID;
    }
    return NOT_LOGGED_IN;
  }),
  changeLibName: typify('changeLibName :: string -> VOID | NOT_LOGGED_IN', function(name) {
    if (loggedInAndHasEmail(this)) {
      console.log('Container/changeLibName()');
      this.state.library.name = name;
      U.updateLibrary(this.state.library, this, function(Container, updatedLibrary) {
        Container.context.router.replace({pathname: '/home'});
        Container.setState({
          library: updatedLibrary
        });
      })
      return VOID;
    }
    return NOT_LOGGED_IN;
  }),
  changeLibMode: typify('changeLibName :: string -> VOID | NOT_LOGGED_IN', function(mode) {
    if (loggedInAndHasEmail(this)) {
      console.log('Container/changeLibMode()');
      var status = true;
      if (mode === "private") {
        status = false;
      }
      this.state.library.public = status;
      U.updateLibrary(this.state.library, this, function(Container, updatedLibrary) {
        Container.context.router.replace({pathname: '/home'});
        Container.setState({
          library: updatedLibrary
        });
      })
      return VOID
    }
    return NOT_LOGGED_IN;
  }),
  getPropertyFromLibrary: typify('getPropertyFromLibrary :: string -> ' +
    'number | string | boolean | (array programminglanguage) | (array paradigm) | (array having) | null | NOT_LOGGED_IN',
    function(property) {
      if (loggedInAndHasEmail(this)) {
        console.log('Container/getPropertyFromLibrary()');
        return typeof this.state.library[property] === 'undefined' ? null : this.state.library[property];
      }
      return NOT_LOGGED_IN;
    }),
  deleteLib: typify('deleteLib :: VOID | NOT_LOGGED_IN', function() {
    if (loggedInAndHasEmail(this)) {
      console.log('Container/deleteLib()');
      console.log('delete library called');
      return VOID
    }
    return NOT_LOGGED_IN
  }),
  addPL: typify('addPL :: string -> string -> string -> (array number) -> VOID | NOT_LOGGED_IN',
    function(name, details, type, paradigmIds) {
      if (loggedInAndHasEmail(this)) {
        console.log('Container/addPL()');
        console.log('Create new PL ' + name + ' ' + details + ' ' + type + ' ' + paradigmIds);
        _API.addProgrammingLanguage(this.state.library, name, details, type, paradigmIds, this);
        return VOID;
      }
      return NOT_LOGGED_IN;
    }),
  editPL: typify('editPL :: number -> string -> string -> string -> (array number) -> VOID | NOT_LOGGED_IN',
    function(plid, name, details, type, paradigmIds) {
      if (loggedInAndHasEmail(this)) {
        console.log('Container/editPL()');
        console.log('Edit PL ' + plid + ' ' + name + ' ' + details + ' ' + type + ' ' + paradigmIds);
        _API.editProgrammingLanguage(this.state.library, plid, name, details, type, paradigmIds, this);
        return VOID;
      }
      return NOT_LOGGED_IN;
    }),
  getPL: typify('getPL :: number -> programminglanguage | null | NOT_LOGGED_IN', function(programmingLanguageID) {
    if (loggedInAndHasEmail(this)) {
      console.log('Container/getPL()');
      return _API.getProgrammingLanguage(this.state.library, programmingLanguageID);
    }
    return NOT_LOGGED_IN;
  }),
  deletePL: typify('deletePL :: number -> VOID | NOT_LOGGED_IN', function(programmingLanguageID) {
    if (loggedInAndHasEmail(this)) {
      console.log('Container/deletePL()');
      _API.deleteProgrammingLanguage(this.state.library, programmingLanguageID, this);
      return VOID;
    }
    return NOT_LOGGED_IN;
  }),
  getRelatedPDs: typify('getRelatedPDs :: number -> (array paradigm) | NOT_LOGGED_IN', function(programmingLanguageID) {
    if (loggedInAndHasEmail(this)) {
      console.log('Container/getRelatedPDs()');
      return _API.getRelatedParadigms(this.state.library, programmingLanguageID);
    }
    return NOT_LOGGED_IN;
  }),
  addPD: typify('addPD :: string -> string -> (array number) -> VOID | NOT_LOGGED_IN',
    function(name, details, subparadigms) {
      if (loggedInAndHasEmail(this)) {
        console.log('Container/addPD()');
        console.log('Create new PD ' + name + details + subparadigms);
        _API.addParadigm(this.state.library, name, details, subparadigms, this);
        return VOID;
      }
      return NOT_LOGGED_IN;
    }),
  editPD: typify('editPD :: number -> string -> string -> (array number) -> VOID | NOT_LOGGED_IN',
    function(pdid, name, details, subParadigmIds) {
      if (loggedInAndHasEmail(this)) {
        console.log('Container/editPD()');
        console.log('Edit PD ' + pdid + ' ' + name + ' ' + details + ' ' + subParadigmIds);
        _API.editParadigm(this.state.library, pdid, name, details, subParadigmIds, this);
        return VOID;
      }
      return NOT_LOGGED_IN;
    }),
  getPDID: typify('getPDID :: string -> number | null | NOT_LOGGED_IN', function(name) {
    if (loggedInAndHasEmail(this)) {
      console.log('Container/getPDID()');
      return _API.getParadigmID(this.state.library, name);
    }
    return NOT_LOGGED_IN;
  }),
  getPD: typify('getPD :: number -> paradigm | null | NOT_LOGGED_IN', function(paradigmID) {
    if (loggedInAndHasEmail(this)) {
      console.log('Container/getPD()');
      return _API.getParadigm(this.state.library, paradigmID);
    }
    return NOT_LOGGED_IN;
  }),
  deletePD: typify('deletePD :: number -> VOID | NOT_LOGGED_IN', function(paradigmID) {
    if (loggedInAndHasEmail(this)) {
      console.log('Container/deletePD()');
      _API.deleteParadigm(this.state.library, paradigmID, this);
      return VOID;
    }
    return NOT_LOGGED_IN;
  }),
  search: typify('search :: string -> string -> string -> (array programminglanguage) | (array paradigm) | (array queryresult)', function(query, findBy, sortBy) {
    if (loggedInAndHasEmail(this)) {
      console.log('Container/search(' + query + ' ,' + findBy + ',' + sortBy + ')');
      return _API.search(this.state.library, query, findBy, sortBy);
    }
    return NOT_LOGGED_IN;
  }),
  handleManuallySetState: function(e) {
    e.preventDefault();
    this.setState({});
  },
  //TODO: MAY FIX componentDidMount to fix the "after FRESHLY logging in" error
  componentDidMount: function() {
    this.setLib();
  },
  render() {
    logger.reportRender('Container');
    let children = null;
    if (this.props.children) {
      //note that json-server return filtered query as an array
      var library = loggedInAndHasEmail(this) && typify.check('library', this.state['library']) ? this.state['library'] : null;

      const libraryManager = {
        setLibraryHandler: loggedInAndHasEmail(this) ? this.setLib : undefined,
        create: library ? undefined : this.createLib,
        delete: library ? this.deleteLib : undefined,
        getAttr: library ? this.getPropertyFromLibrary : undefined,
        addPL: library ? this.addPL : undefined,
        editPL: library ? this.editPL : undefined,
        changeLibName: library ? this.changeLibName : undefined,
        changeLibMode: library ? this.changeLibMode : undefined,
        getPL: library ? this.getPL : undefined,
        deletePL: library ? this.deletePL : undefined,
        getRelatedPDs: library ? this.getRelatedPDs : undefined,
        getPDID: library ? this.getPDID : undefined,
        addPD: library ? this.addPD : undefined,
        editPD: library ? this.editPD : undefined,
        getPD: library ? this.getPD : undefined,
        deletePD: library ? this.deletePD : undefined,
        search: library ? this.search : undefined,
        libraryIsAvailable: typify.check('library', library)
      };
      var navItems = library ? ['home', 'browse', 'find', 'profile', 'logout'] : ['home', 'logout'];

      children = React.cloneElement(this.props.children, {
        auth: extractAuth(this), //sends auth instance to children
        userProfile: hasUserProfile(this) ? extractAuth(this).getProfile() : undefined,
        libraryManager: libraryManager
      })
    }

    //console.warn('End of container/render');
    return (
      <Jumbotron id="containerRoot">
        {
          U.isDefined(extractAuth(this)) && extractAuth(this).loggedIn() && children !== null ?
            (<div id={children.props.route.navID}>
              <NavigationBar navItems={navItems}/>
            </div>) :
            (<div></div>)
        }
        {children}
        <Button onClick={this.handleManuallySetState}>Manually Set State of Container</Button>
      </Jumbotron>
    )
  }
});

export default Container;
