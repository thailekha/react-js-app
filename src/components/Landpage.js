import React, {PropTypes as T} from 'react'
import {ButtonToolbar, Button, Panel} from 'react-bootstrap'
import AuthService from '../utils/AuthService'
import logger from '../utils/logger'
import {U, _API} from '../utils/util';
import typify from 'typify';
import ChartRenderer from './Homepage/ChartRenderer';

var Landpage = React.createClass({
  contextTypes: {
    router: T.object
  },
  propTypes: {
    location: T.object,
    auth: T.instanceOf(AuthService)
  },
  getInitialState: function(){
    return {libraries: null}
  },
  componentDidMount: function() {
    U.getAllLibraries(this);
  },
  render: function() {
    logger.reportRender('Loginpage');
    console.warn('Loginpage');
    const {auth} = this.props; // ???

    if (this.state.libraries) {
      var charts = this.state.libraries.map(function(library, index) {

        //if user does not wnat to expose the library to public
        if(!library.public) {
          return null;
        }

        var libraryManager = {
          library: library,
          getAttr: typify('landpageGetPropertyFromLibrary :: string -> ' +
            'number | string | boolean | (array programminglanguage) | (array paradigm) | (array having) | null',
            function(property) {
              console.log('Login/getAttr()');
              return typeof this.library[property] === 'undefined' ? null : this.library[property];
            }),
          getRelatedPDs: typify('landpageGetRelatedPDs :: number -> (array paradigm)', function(programmingLanguageID) {
            console.log('Login/getRelatedPDs()');
            return _API.getRelatedParadigms(this.library, programmingLanguageID);
          }),
          libraryIsAvailable: true
        }

        return (
          <Panel header={library.name + ' ' + '(' + library.email + ')'} bsStyle="success" key={index} style={{color: '#91aa98'}}>
            <ChartRenderer libraryManager={libraryManager}/>
          </Panel>
        );
      });
    }

    return (
      <div>
        <h2>Welcome</h2>
        <ButtonToolbar style={{display: 'inline-block'}}>
          <Button bsStyle="primary" onClick={auth.login}>Login or Signup</Button>
        </ButtonToolbar>

        <div>
          <h3>View some other users' libraries statistics ...</h3>
          {charts}
        </div>
      </div>
    )
  }
});

export default Landpage;
