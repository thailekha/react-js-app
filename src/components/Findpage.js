import React from 'react';
import logger from '../utils/logger'
import {Button} from 'react-bootstrap';
import {Link} from 'react-router';
import _ from 'lodash';

var Findpage = React.createClass({
  /* ... options and lifecycle methods ... */
  getInitialState: function() {
    return {find: '', findMode: 'name', sort: 'name', result: []}
  },
  handleSortChange: function(e) {
    this.setState({
      sort: e.target.value
    });
  },
  handleFindModeChange: function(e) {
    this.setState({
      findMode: e.target.value
    });
  },
  handleFindChange: function(e) {
    this.setState({
      find: e.target.value
    });
  },
  handleFind: function() {
    if (this.state.findMode === 'name') {
      //get all programming languages and paradigms
      var items = this.props.libraryManager.getAttr('programminglanguages').concat(this.props.libraryManager.getAttr('paradigms'));
      //go through the array to find ones that match the query
      var found = [];
      items.forEach(function(i) {
        if (i.name.toLowerCase().includes(this.state.find.toLowerCase())) {
          found.push(i);
        }
      }.bind(this));
      //sort if needed
      if (found.length > 1) {
        found = _.sortBy(found, function(item) {
          return item.name;
        })
      }
      //set state
      this.setState({
        result: found
      });
    }
  },
  render: function() {
    logger.reportRender('Findpage');
    var resultToDisplay = null;
    if (this.state.result.length > 0) {
      resultToDisplay = this.state.result.map(function(item, index) {
        if (item.plid) {
          return <Link key={index}
                       to={'/browse/pl/' + item['plid']}>{item['name']}</Link>
        }
        else {
          return <Link key={index}
                       to={'/browse/pd/' + item['plid']}>{item['name']}</Link>
        }
      });
    }

    return (
      <div>
        <div className="form-group">
          <input type="text"
                 className="form-control" placeholder="Query"
                 value={this.state.find}
                 onChange={this.handleFindChange}></input>
          <Button onClick={this.handleFind}>Find</Button>
        </div>
        <h4>Find mode</h4>
        <select id="findmode" onChange={this.handleFindModeChange}>
          <option value="name">Name</option>
          <option value="content">Content</option>
        </select>
        {
          this.state.findMode === 'content' ? (
            <div>
              <h4>Sort by</h4>
              < select id="sort" onChange={this.handleSortChange}>
                <option value="name">Alphabetical</option>
                <option value="relevance">Relevance</option>
              </select>
            </div>
          ) : (<div></div>)
        }
        {
          resultToDisplay ? (
            <div>
              <ul>
                {resultToDisplay}
              </ul>
            </div>
          ) : (<div></div>)
        }
      </div>
    );
  },
})

export default Findpage;