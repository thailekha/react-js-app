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
    return {
      name: '',
      details: '',
      type: ''
    };
  },
  handleNameChange: function(e) {
    this.setState({name: e.target.value});
  },
  handleDetailsChange: function(e) {
    this.setState({details: e.target.value});
  },
  handleTypeChange: function(e) {
    this.setState({type: e.target.value});
  },
  handleAdd: function(e) {
    if (this.state.name.length > 0 && this.state.details.length > 0 && this.state.type.length > 0) {
      e.preventDefault();
      this.props.addPLHandler(this.state.name, this.state.details, this.state.type);
      this.setState({
        name: '',
        details: '',
        type: ''
      });
    }
  },
  render: function() {
    logger.reportRender('CreateBox');
    return (
      <form style={{marginTop: '30px'}}>
        <h3>Add a new Programming language</h3>
        <div className="form-group">
          <input type="text"
                 className="form-control" placeholder="Name"
                 value={this.state.name}
                 onChange={this.handleNameChange}></input>
          <input type="text"
                 className="form-control" placeholder="Details"
                 value={this.state.details}
                 onChange={this.handleDetailsChange}></input>
          <input type="text"
                 className="form-control" placeholder="Type"
                 value={this.state.type}
                 onChange={this.handleTypeChange}></input>
        </div>
        <Button type="submit" className="btn btn-primary" onClick={this.handleAdd}>Add</Button>
      </form>
    );
  }
});

var BrowsepageCreateBoxPD = React.createClass({
  /* ... options and lifecycle methods ... */
  getInitialState: function() {
    return {
      name: '',
      details: '',
      subParadigms: ''
    };
  },
  handleNameChange: function(e) {
    this.setState({name: e.target.value});
  },
  handleDetailsChange: function(e) {
    this.setState({details: e.target.value});
  },
  handleSubParadigmsChange: function(e) {
    this.setState({subParadigms: e.target.value});
  },
  handleAdd: function(e) {
    if (this.state.name.length > 0 && this.state.details.length > 0 && this.state.subParadigms.length > 0) {
      e.preventDefault();
      this.props.addPDHandler(this.state.name, this.state.details, this.state.subParadigms);
      this.setState({
        name: '',
        details: '',
        subParadigms: ''
      });
    }
  },
  render: function() {
    logger.reportRender('CreateBox');
    return (
      <form style={{marginTop: '30px'}}>
        <h3>Add a new paradigm</h3>
        <div className="form-group">
          <input type="text"
                 className="form-control" placeholder="Name"
                 value={this.state.name}
                 onChange={this.handleNameChange}></input>
          <input type="text"
                 className="form-control" placeholder="Details"
                 value={this.state.details}
                 onChange={this.handleDetailsChange}></input>
          <input type="text"
                 className="form-control" placeholder="SubParadigms"
                 value={this.state.subParadigms}
                 onChange={this.handleSubParadigmsChange}></input>
        </div>
        <Button type="submit" className="btn btn-primary" onClick={this.handleAdd}>Add</Button>
      </form>
    );
  }
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
  handleAddPL: function(name, details, type) {
    console.log('Create new PL ' + name + details + type);
  },
  handleAddPD: function(name, details, subparadigms) {
    console.log('Create new PD ' + name + details + subparadigms);
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
        addPLHandler: this.handleAddPL,
        addPDHandler: this.handleAddPD,
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
