import React from 'react';
import logger from '../utils/logger';
import makeReq from '../util';

//TODO: fix " == undefined" to 'typeof ...'

//for running mocha tests (see npm dom-storage)
if(typeof localStorage === 'undefined') {
  var Storage = require('dom-storage');
  var localStorage = new Storage('./db.json', { strict: false, ws: '  ' });
}

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
var Browsepage = React.createClass({
  /* ... options and lifecycle methods ... */
  componentDidMount: function() {
    makeReq('libraries/1','library',this);
  },
  render: function() {
    logger.reportRender('Browsepage');
    var library = localStorage.getItem('library') ? JSON.parse(localStorage.getItem('library')) : undefined;
    var programmingLanguages = [];
    var paradigms = [];
    if(library !== undefined) {
      programmingLanguages = library['ProgrammingLanguages'];
      paradigms = library['Paradigms'];
    }
    console.log(programmingLanguages.concat(paradigms));
    return (
      <div>
        <SubNavigationBar subNavigationItems={programmingLanguages.concat(paradigms)}/>
      </div>
    );
  },
});

export default Browsepage;
