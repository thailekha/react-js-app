import React, {PropTypes} from 'react';
import logger from '../utils/logger';
import {Button} from 'react-bootstrap';
import {_API} from '../utils/util';
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
    var programmingLanguage = _API.getProgrammingLanguage(this.props.items, this.props.routeParams['id']);
    return (
      <div>
        <h3>{programmingLanguage['name']}</h3>
        <b>{programmingLanguage['type']}</b>
        <p>{programmingLanguage['details']}</p>
      </div>
    );
  }
});

var PDContent = React.createClass({
  render: function() {
    logger.reportRender('PDContent');
    var paradigm = _API.getParadigm(this.props.items, this.props.routeParams['id']);
    var subParadigms = paradigm['subParadigms'].map(function(subParadigmID, index) {
      //subParadigm pd-ids in items are strings !!!
      return <Link key={index}
                   to={'/browse/pd/' + subParadigmID}>{_API.getParadigm(this.props.items, subParadigmID + '')['name']}</Link>
    }.bind(this));
    return (
      <div>
        <h3>{paradigm['name']}</h3>
        {subParadigms}
        <p>{paradigm['details']}</p>
      </div>
    );
  }
});

var BrowsepageCreateBoxPL = React.createClass({
  /* ... options and lifecycle methods ... */
  getInitialState: function() {

  },
  render: function() {
    logger.reportRender('CreateBox');
    return (
      <form style={{marginTop: '30px'}}>
        <h3>Create a new library</h3>
        <div className="form-group">
          <input type="text"
                 className="form-control" placeholder="Name"
                 value={this.state.name}
                 onChange={this.handleNameChange}></input>
        </div>
        <Button type="submit" className="btn btn-primary" onClick={this.handleCreate}>Create</Button>
      </form>
    );
  },
});

var BrowsepageCreateBoxPD = React.createClass({
  /* ... options and lifecycle methods ... */
  getInitialState: function() {

  },
  render: function() {
    logger.reportRender('CreateBox');
    return (
      <form style={{marginTop: '30px'}}>
        <h3>Create a new library</h3>
        <div className="form-group">
          <input type="text"
                 className="form-control" placeholder="Name"
                 value={this.state.name}
                 onChange={this.handleNameChange}></input>
        </div>
        <Button type="submit" className="btn btn-primary" onClick={this.handleCreate}>Create</Button>
      </form>
    );
  },
});

var SubNavigationBar = React.createClass({
  /* ... options and lifecycle methods ... */
  render: function() {
    logger.reportRender('SubNavigationBar');
    var subNavigationItems = this.props.subNavigationItems.map(function(navItem, index) {
      return <Link key={index}
                   to={navItem['pd-id'] ?
                   '/browse/pd/' + navItem['pd-id'] :
                   '/browse/pl/' + navItem['pl-id']}>{navItem['name']}</Link>
    });
    return (
      <div id="subNavigation">
        <ul id="tabs">
          <Link to='/browse/createbox'>Create</Link>
          {subNavigationItems}
        </ul>
      </div>
    );
  },
});

//must use componentDidMount, otherwise infinite loop (component is re-rendered when request comes back, re-rendering fires another req)
var BrowsepageContainer = React.createClass({
  getInitialState: function() {
    return {
      browsingMode: 'programminglanguages'
    };
  },
  switchBrowsingMode: function() {
    var nState = this.state['browsingMode'] === 'programminglanguages' ? 'paradigms' : 'programminglanguages';
    this.setState({
      browsingMode: nState
    });
  },
  render: function() {
    logger.reportRender('BrowsepageContainer');
    var library = this.props.library;
    var programmingLanguages = [];
    var paradigms = [];
    if (library !== undefined) {
      programmingLanguages = library['ProgrammingLanguages'];
      paradigms = library['Paradigms'];
    }
    var items = this.state['browsingMode'] === 'programminglanguages' ? programmingLanguages : paradigms;
    let children = null;
    if (this.props.children) {
      console.log('Browsepage Cloning children');
      children = React.cloneElement(this.props.children, {
        //Must clone children to pass arguments to them
        browsingMode: this.state['browsingMode'], //for createbox
        items: items
      })
    }
    return (
      <div>
        <Button onClick={this.switchBrowsingMode}>Switch</Button>
        <SubNavigationBar subNavigationItems={items}/>
        {children}
      </div>
    );
  },
});

export {BrowsepageContainer, BrowsepageCreateBoxPL, BrowsepageCreateBoxPD, PLContent, PDContent};
