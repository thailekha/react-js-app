import React, {PropTypes as T} from 'react';
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
    var relatedParadigms = _API.getRelatedParadigms(this.props.library, programmingLanguage['pl-id']).map(function(paradigm, index) {
      return <Link key={index} to={'/browse/pd/' + paradigm['pd-id']}>{paradigm['name']}</Link>
    });
    return (
      <div>
        <h3>{programmingLanguage['name']}</h3>
        <b>{programmingLanguage['type']}</b>
        <p>{programmingLanguage['details']}</p>
        <b>Related paradigms</b>
        {relatedParadigms}
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
      type: '',
      paradigm: '',
      paradigms: '',
      pdids: [],
      error: ''
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
  handleParadigmChange: function(e) {
    this.setState({paradigm: e.target.value});
  },
  handleAddParadigm: function(e) {
    var nParadigm = this.state.paradigm;
    var pdid = _API.getParadigmId(this.props.library,nParadigm)
    if (nParadigm.length > 0 && pdid) {
      var oldState = this.state.paradigms;
      var newState = oldState + (oldState.length === 0 ? '' : ',') + nParadigm;
      this.state.pdids.push(pdid);
      console.log(newState);
      this.setState({
        paradigm: '',
        paradigms: newState
      });
    }
  },
  handleAdd: function(e) {
    if (this.state.name.length > 0 && this.state.details.length > 0 && this.state.type.length > 0) {
      e.preventDefault();
      this.props.libraryManager.addPL(this.state.name, this.state.details, this.state.type, this.state.pdids);
      this.setState(this.getInitialState());
    }
  },
  render: function() {
    logger.reportRender('CreateBox');
    return (
      <div>
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
            <input type="text" disabled
                   className="form-control"
                   value={this.state.paradigms}></input>
          </div>
          <Button type="submit" className="btn btn-primary" onClick={this.handleAdd}>Add</Button>

        </form>
        <form>
          <h3>What paradigms does this language have ?</h3>
          <div className="form-group">
            <input type="text"
                   className="form-control" placeholder="Paragidms"
                   value={this.state.paradigm} onChange={this.handleParadigmChange}></input>
            <Button onClick={this.handleAddParadigm}>Add PD</Button>
          </div>
        </form>
      </div>
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
  getInitialState: function() {
    return {
      browsingMode: 'programminglanguages'
    };
  },
  switchBrowsingMode: function() {
    //for when clicking switching button. notice that the children is supplied from the router, it cannot be modified (read-only)
    var nState = this.state['browsingMode'] === 'programminglanguages' ? 'paradigms' : 'programminglanguages';
    this.setState({
      browsingMode: nState
    });
  },
  render: function() {
    logger.reportRender('SubNavigationBar');
    var linkToCreateBox = this.state.browsingMode === 'programminglanguages' ? '/browse/createboxpl' : '/browse/createboxpd';
    var subNavigationItems = this.state.browsingMode === 'programminglanguages' ?
      this.props.subNavigationItems.map(function(navItem, index) {
        if (navItem['pl-id']) {
          return <Link key={index}
                       to={'/browse/pl/' + navItem['pl-id']}>{navItem['name']}</Link>
        }
      }) :
      this.props.subNavigationItems.map(function(navItem, index) {
        if (navItem['pd-id']) {
          return <Link key={index}
                       to={'/browse/pd/' + navItem['pd-id']}>{navItem['name']}</Link>
        }
      });
    return (
      <div id="subNavigation">
        <Button onClick={this.switchBrowsingMode}>Switch (currently {this.state.browsingMode})</Button>
        <div id="subNavigationbar">
          <ul id="tabs">
            <Link to={linkToCreateBox}>Create</Link>
            {subNavigationItems}
          </ul>
        </div>
      </div>
    );
  },
});

//must use componentDidMount, otherwise infinite loop (component is re-rendered when request comes back, re-rendering fires another req)
var BrowsepageContainer = React.createClass({
  handleAddPD: function(name, details, subparadigms) {
    console.log('Create new PD ' + name + details + subparadigms);
  },
  render: function() {
    logger.reportRender('BrowsepageContainer');

    let children = null;
    if (this.props.children) {
      console.log('Browsepage Cloning children');
      var library = this.props.library;
      var programmingLanguages = [];
      var paradigms = [];
      if (library !== undefined) {
        programmingLanguages = library['ProgrammingLanguages'];
        paradigms = library['Paradigms'];
      }
      var items = this.props.children.props.route.sendToChildren === 'pl' ? programmingLanguages : paradigms;
      children = React.cloneElement(this.props.children, {
        //Must clone children to pass arguments to them
        library: library,
        libraryManager: this.props.libraryManager,
        addPDHandler: this.handleAddPD,
        items: items
      })
    }
    return (
      <div>
        <SubNavigationBar subNavigationItems={programmingLanguages.concat(paradigms)}/>
        {children}
      </div>
    );
  },
});

export {BrowsepageContainer, BrowsepageCreateBoxPL, BrowsepageCreateBoxPD, PLContent, PDContent};
