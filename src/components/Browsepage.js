import React, {PropTypes} from 'react';
import logger from '../utils/logger';
import U from '../utils/util';
import _ from 'lodash';
import { Link, Route, Router, hashHistory } from 'react-router';

//TODO: fix " == undefined" to 'typeof ...'

//for running mocha tests (see npm dom-storage)
// if(typeof localStorage === 'undefined') {
//   var Storage = require('dom-storage');
//   var localStorage = new Storage('./db.json', { strict: false, ws: '  ' });
// }

var PLContent = React.createClass({
  render: function() {
    logger.reportRender('PLContent');
    return (
      <div><p>{this.props.content}</p></div>
    );
  }
});

var PDContent = React.createClass({
  render: function() {
    logger.reportRender('PDContent');
    return (
      <div><p>{this.props.content}</p></div>
    );
  }
});

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
        <div className="form-group">
          <input type="text"
                 className="form-control" placeholder="Details"></input>
        </div>
        <button type="submit" className="btn btn-primary">Create</button>
      </form>
    );
  },
});

var Item = {};


//<Link to={this.props.subNavigationItem}>{this.props.subNavigationItem}</Link>
var SubNavigationItem = React.createClass({
  /* ... options and lifecycle methods ... */
  render: function() {
    logger.reportRender('SubNavigationItem');
    return (
      <Link to="/home">/home</Link>
    );
  },
});

var SubNavigationBar = React.createClass({
  /* ... options and lifecycle methods ... */
  render: function() {
    logger.reportRender('SubNavigationBar');
    var subNavigationItems = this.props.subNavigationItems.map(function(navItem, index) {
      return <SubNavigationItem key={index} subNavigationItem={navItem} />
    });
    return (
      <div id="subNavigation">
        <ul id="tabs">
          {subNavigationItems}
        </ul>
      </div>
    );
  },
});

//must use componentDidMount, otherwise infinite loop (component is re-rendered when request comes back, re-rendering fires another req)
var BrowsepageContainer = React.createClass({
  // /* ... options and lifecycle methods ... */
  render: function() {
    logger.reportRender('BrowsepageContainer');
    var library = this.props.route.library;
    var programmingLanguages = [];
    var paradigms = [];
    var subNavItems = [];
    if(library !== undefined) {
      programmingLanguages = library['ProgrammingLanguages'];
      paradigms = library['Paradigms'];
    }
    var items = programmingLanguages.concat(paradigms);
    for(var i = 0; i < programmingLanguages.length; i += 1) {
      subNavItems.push('/browse/pl/' + programmingLanguages[i]['name']);
    }
    for(var z = 0; z < paradigms.length; z += 1) {
      subNavItems.push('/browse/pd/' + paradigms[z]['name']);
    }
    let children = null;
    if (this.props.children) {
      console.log('Browsepage Cloning children');
      children = React.cloneElement(this.props.children, {
        //Must clone children to pass arguments to them
        content: items
      })
    }

    return (
      <div>
        <SubNavigationBar subNavigationItems={subNavItems}/>
        {children}
      </div>
    );
  },
});

var BrowsepageRouterDriver = React.createClass({
  contextTypes: {
    router: PropTypes.object
  },
  propTypes: {
    history: PropTypes.object.isRequired,
    routes: PropTypes.element.isRequired
  },
  getContent: function() {
    return (
      <Router
        routes={this.props.routes}
        history={this.props.history}/>
    )
  },
  render: function() {
    logger.reportRender('BrowsepageRouterDriver');
    return (
      <div style={{ height: '100%' }}>

        {this.getContent()}
      </div>
    );
  }
});

var Browsepage = React.createClass({
  render: function() {
    return (
      <BrowsepageRouterDriver history={hashHistory} routes={(
        <Route path="/browse/" library={this.props.library} component={BrowsepageContainer}>
          <Route path="pd/:id" component={PLContent} />
          <Route path="pl/:id" component={PDContent} />
        </Route>
      )} />
      //Missing: mount point
    );
  }
});

export default Browsepage;
