import React from 'react';
import logger from '../../utils/logger';
import {Button} from 'react-bootstrap';
import {Link} from 'react-router';
import _ from 'lodash';

var PLItemDisplay = React.createClass({
  shouldComponentUpdate: function(nextProps, nextState) {
    //if name, type, details, relatedParadigms,  id are the same, no update
    return !(this.props.name === nextProps.name
    && this.props.type === nextProps.type
    && this.props.details === nextProps.details
    && this.props.id === nextProps.id
    && _.isEqual(nextProps.relatedParadigms, this.props.relatedParadigms));
  },
  render: function() {
    logger.reportRender('PLItemDisplay');
    return (
      <div>
        <h3>{this.props.name}</h3>
        <b>{this.props.type}</b>
        <p>{this.props.details}</p>
        <b>Related paradigms {this.props.relatedParadigms.length === 0 ? 'None' : ''} </b>
        <ul>
          {this.props.relatedParadigms}
        </ul>
        <Button><Link to={"/browse/editboxpl/" + this.props.id}>Edit</Link></Button>
      </div>
    );
  }
});

var PLContent = React.createClass({
  handleDelete: function(e) {
    e.preventDefault();
    this.props.libraryManager.deletePL(parseInt(this.props.routeParams['id'], 10));
  },
  render: function() {
    logger.reportRender('PLContent');
    var plid = parseInt(this.props.routeParams['id'], 10);
    var programmingLanguage = this.props.libraryManager.getPL(plid);
    console.log(this.props.libraryManager.getRelatedPDs(programmingLanguage['plid']));
    var relatedParadigms = this.props.libraryManager.getRelatedPDs(programmingLanguage['plid']).map(function(paradigm, index) {
      return <li key={index}><Link to={'/browse/pd/' + paradigm['pdid']}>{paradigm['name']}</Link></li>
    });
    return (
      <div>
        <PLItemDisplay
          name={programmingLanguage['name']}
          type={programmingLanguage['type']}
          details={programmingLanguage['details']}
          relatedParadigms={relatedParadigms}
          id={parseInt(this.props.routeParams['id'], 10)}
        />
        <Button bsStyle="danger" onClick={this.handleDelete}>Delete</Button>
      </div>
    );
  }
});

var PDItemDisplay = React.createClass({
  shouldComponentUpdate: function(nextProps, nextState) {
    //if name, type, details, relatedParadigms,  id are the same, no update
    return !(this.props.name === nextProps.name
    && this.props.details === nextProps.details
    && this.props.id === nextProps.id
    && _.isEqual(nextProps.subParadigms, this.props.subParadigms));
  },
  render: function() {
    logger.reportRender('PDItemDisplay');
    var subParadigms = this.props.subParadigms.map(function(subParadigm, index) {
      //subParadigm pd-ids in items are strings !!!
      return <li key={index}><Link to={'/browse/pd/' + subParadigm.id}>{subParadigm.name}</Link></li>
    }.bind(this));
    return (
      <div>
        <h3>{this.props.name}</h3>
        <b>Subparadigms {this.props.subParadigms.length === 0 ? '(None)' : ''}</b>
        <ul>
          {subParadigms}
        </ul>
        <p>{this.props.details}</p>
        <Button><Link to={"/browse/editboxpd/" + this.props.id}>Edit</Link></Button>
      </div>
    );
  }
});

var PDContent = React.createClass({
  handleDelete: function(e) {
    e.preventDefault();
    this.props.libraryManager.deletePD(parseInt(this.props.routeParams['id'], 10));
  },
  render: function() {
    logger.reportRender('PDContent');
    var paradigm = this.props.libraryManager.getPD(parseInt(this.props.routeParams['id'], 10));
    var subParadigms = paradigm['subparadigms'].map(function(subParadigmID) {
      return {
        id: subParadigmID,
        name: this.props.libraryManager.getPD(subParadigmID)['name']
      }
    }.bind(this));
    return (
      <div>
        <PDItemDisplay
          name={paradigm['name']}
          subParadigms={subParadigms}
          details={paradigm['details']}
          id={parseInt(this.props.routeParams['id'], 10)}
        />
        <Button bsStyle="danger" onClick={this.handleDelete}>Delete</Button>
      </div>
    );
  }
});

export {PLContent, PDContent};