import React from 'react';
import logger from '../utils/logger';
import U from '../utils/util';
import _ from 'lodash';

//TODO: fix " == undefined" to 'typeof ...'

//for running mocha tests (see npm dom-storage)
// if(typeof localStorage === 'undefined') {
//   var Storage = require('dom-storage');
//   var localStorage = new Storage('./db.json', { strict: false, ws: '  ' });
// }

var Content = React.createClass({
  render: function() {
    return (
      <div></div>
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

var SubNavigationItem = React.createClass({
  /* ... options and lifecycle methods ... */
  render: function() {
    logger.reportRender('SubNavigationItem');
    return (
      <li><a href="#">{this.props.subNavigationItem['name']}</a></li>
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
var BrowsepageCore = React.createClass({
  /* ... options and lifecycle methods ... */
  componentDidMount: function() {
    U.makeReq('libraries/1','library',this);
  },
  render: function() {
    logger.reportRender('BrowsepageCore');
    var library = this.props.library;
    var programmingLanguages = [];
    var paradigms = [];
    var subNavItems = [];
    if(library !== undefined) {
      programmingLanguages = library['ProgrammingLanguages'];
      paradigms = library['Paradigms'];
    }
    var items = programmingLanguages.concat(paradigms);
    for(var i = 0; i < items.length; i += 1) {
      subNavItems.push(items[i]);
    }
    console.log(items);
    return (
      <div>
        <SubNavigationBar subNavigationItems={items}/>
      </div>
    );
  },
});

var BrowsePage = React.createClass({
  render: function() {

  }
});

export default Browsepage;
