import React from 'react';
import logger from '../../utils/logger';
import {Button} from 'react-bootstrap';
import {Link} from 'react-router';

var PLContent = React.createClass({
  handleDelete: function(e) {
    e.preventDefault();
    this.props.libraryManager.deletePL(parseInt(this.props.routeParams['id'],10));
  },
  render: function() {
    logger.reportRender('PLContent');
    var plid = parseInt(this.props.routeParams['id'],10);
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
        <Button><Link to={"/browse/editboxpl/" + parseInt(this.props.routeParams['id'],10)}>Edit</Link></Button>
      </div>
    );
  }
});

var PDContent = React.createClass({
  handleDelete: function(e) {
    e.preventDefault();
    this.props.libraryManager.deletePD(parseInt(this.props.routeParams['id'],10));
  },
  render: function() {
    logger.reportRender('PDContent');
    var paradigm = this.props.libraryManager.getPD(parseInt(this.props.routeParams['id'],10));
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
        <Button onClick={this.handleDelete}>Delete</Button>
        <Button><Link to={"/browse/editboxpd/" + parseInt(this.props.routeParams['id'],10)}>Edit</Link></Button>
      </div>
    );
  }
});

export {PLContent,PDContent};