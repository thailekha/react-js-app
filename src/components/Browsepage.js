import React, {PropTypes as T} from 'react';
import logger from '../utils/logger';
import {Button} from 'react-bootstrap';
import {Link, Route, Router, hashHistory} from 'react-router';

//TODO: fix " == undefined" to 'typeof ...'

//for running mocha tests (see npm dom-storage)
// if(typeof localStorage === 'undefined') {
//   var Storage = require('dom-storage');
//   var localStorage = new Storage('./db.json', { strict: false, ws: '  ' });
// }

var PLContent = React.createClass({
  handleDelete: function() {
    this.props.libraryManager.deletePL(parseInt(this.props.routeParams['id']));
  },
  render: function() {
    logger.reportRender('PLContent');
    var plid = parseInt(this.props.routeParams['id']);
    var programmingLanguage = this.props.libraryManager.getPL(plid);
    console.log(this.props.libraryManager.getRelatedPDs(programmingLanguage['plid']));
    var relatedParadigms = this.props.libraryManager.getRelatedPDs(programmingLanguage['plid']).map(function(paradigm, index) {
      return <Link key={index} to={'/browse/pd/' + paradigm['pdid']}>{paradigm['name']}</Link>
    });
    return (
      <div>
        <h3>{programmingLanguage['name']}</h3>
        <b>{programmingLanguage['type']}</b>
        <p>{programmingLanguage['details']}</p>
        <b>Related paradigms</b>
        {relatedParadigms}
        <Button onClick={this.handleDelete}>Delete</Button>
      </div>
    );
  }
});

var PDContent = React.createClass({
  render: function() {
    logger.reportRender('PDContent');
    var paradigm = this.props.libraryManager.getPD(parseInt(this.props.routeParams['id']));
    var subParadigms = paradigm['subparadigms'].map(function(subParadigmID, index) {
      //subParadigm pd-ids in items are strings !!!
      return <Link key={index}
                   to={'/browse/pd/' + subParadigmID}>{this.props.libraryManager.getPD(subParadigmID)['name']}</Link>
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
    e.preventDefault();
    var nParadigm = this.state.paradigm;
    var pdid = this.props.libraryManager.getPDID(nParadigm);
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
      subParadigm: '',
      subParadigms: '',
      spdids: []
    };
  },
  handleNameChange: function(e) {
    this.setState({name: e.target.value});
  },
  handleDetailsChange: function(e) {
    this.setState({details: e.target.value});
  },
  handleSubParadigmChange: function(e) {
    this.setState({subParadigm: e.target.value});
  },
  handleAddSubParadigm: function(e) {
    e.preventDefault();
    var nSubParadigm = this.state.subParadigm;
    var spdid = this.props.libraryManager.getPDID(nSubParadigm);
    if (nSubParadigm.length > 0 && spdid) {
      var oldState = this.state.subParadigms;
      var newState = oldState + (oldState.length === 0 ? '' : ',') + nSubParadigm;
      this.state.spdids.push(spdid);
      console.log(newState);
      this.setState({
        subParadigm: '',
        subParadigms: newState
      });
    }
  },
  handleAdd: function(e) {
    if (this.state.name.length > 0 && this.state.details.length > 0) {
      e.preventDefault();
      this.props.libraryManager.addPD(this.state.name, this.state.details, this.state.spdids);
      this.setState(this.getInitialState());
    }
  },
  render: function() {
    logger.reportRender('CreateBox');
    return (
      <div>
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
            <input type="text" disabled
                   className="form-control"
                   value={this.state.subParadigms}></input>
          </div>
          <Button type="submit" className="btn btn-primary" onClick={this.handleAdd}>Add</Button>
        </form>
        <form>
          <h3>What subparadigms does this have ?</h3>
          <div className="form-group">
            <input type="text"
                   className="form-control" placeholder="Paragidms"
                   value={this.state.subParadigm} onChange={this.handleSubParadigmChange}></input>
            <Button onClick={this.handleAddSubParadigm}>Add PD</Button>
          </div>
        </form>
      </div>
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
        if (navItem['plid']) {
          return <Link key={index}
                       to={'/browse/pl/' + navItem['plid']}>{navItem['name']}</Link>
        }
      }) :
      this.props.subNavigationItems.map(function(navItem, index) {
        if (navItem['pdid']) {
          return <Link key={index}
                       to={'/browse/pd/' + navItem['pdid']}>{navItem['name']}</Link>
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
  render: function() {
    logger.reportRender('BrowsepageContainer');
    let children = null;
    if (this.props.children) {
      console.log('Browsepage Cloning children');

      var libraryManager = this.props.libraryManager;

      var programmingLanguages = [];
      var paradigms = [];
      if (libraryManager.available) {
        programmingLanguages = libraryManager.getAttr('programminglanguages');
        paradigms = libraryManager.getAttr('paradigms');
      }
      console.log(programmingLanguages.concat(paradigms));
      var items = this.props.children.props.route.sendToChildren === 'pl' ? programmingLanguages : paradigms;
      children = React.cloneElement(this.props.children, {
        //Must clone children to pass arguments to them
        libraryManager: libraryManager,
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
