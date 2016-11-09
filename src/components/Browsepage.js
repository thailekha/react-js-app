import React, {PropTypes} from 'react';
import logger from '../utils/logger';
import U from '../utils/util';
import _ from 'lodash';
import {Link, Route, Router, hashHistory} from 'react-router';

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
      <div><h2>{this.props.content}</h2></div>
    );
  }
});

var PDContent = React.createClass({
  render: function() {
    logger.reportRender('PDContent');
    return (
      <div><h1>{this.props.content}</h1></div>
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
      <Link to={this.props.link}>{this.props.name}</Link>
    );
  },
});

var SubNavigationBar = React.createClass({
  /* ... options and lifecycle methods ... */
  render: function() {
    logger.reportRender('SubNavigationBar');
    var subNavigationItems = this.props.subNavigationItems.map(function(navItem, index) {
      return <SubNavigationItem key={index}
                                link={navItem['pd-id'] ? '/browse/pd/' + navItem['pd-id'] : '/browse/pl/' + navItem['pl-id']}
                                name={navItem['name']}/>
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
    var library = this.props.library;
    var programmingLanguages = [];
    var paradigms = [];
    if (library !== undefined) {
      programmingLanguages = library['ProgrammingLanguages'];
      paradigms = library['Paradigms'];
    }
    var items = programmingLanguages.concat(paradigms);
    // items.forEach(function (item) {
    //   U.propertiesNumberToString(items,['pl-id','pd-id']);
    // });
    let children = null;
    if (this.props.children) {
      console.log('Browsepage Cloning children');
      children = React.cloneElement(this.props.children, {
        //Must clone children to pass arguments to them
        content: items[0]['details']
      })
    }

    return (
      <div>
        <SubNavigationBar subNavigationItems={items}/>
        {children}
      </div>
    );
  },
});

export {BrowsepageContainer, PLContent, PDContent};
