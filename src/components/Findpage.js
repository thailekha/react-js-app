import React from 'react';
import logger from '../utils/logger'
import {Button, Pager} from 'react-bootstrap';
import {Link} from 'react-router';
import _ from 'lodash';

const LETTERS_AND_NUMBERS = 'abcdefghijklmnopqrstuvwxyz0123456789';

const textToLowerCaseAlphanumericArray = function(str) {
  //str will be turned to lower case
  //filter symbols that are not either letters, numbers or space
  var result = _.filter(str.toLowerCase().split(''), function(w) {
    return LETTERS_AND_NUMBERS.includes(w) || w === ' ';
  });
  //join and split again, this time by space, notice that '  '.split(' ') gives ['','','']
  result = _.filter(result.join('').split(' '), function(w) {
    return w !== "";
  });
  console.log(result);
  return result;
}

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
    if (this.state.find.trim().length === 0)
      return;

    //get all programming languages and paradigms
    var items = this.props.libraryManager.getAttr('programminglanguages').concat(this.props.libraryManager.getAttr('paradigms'));
    var found = [];
    if (this.state.findMode === 'name') {
      //go through the array to find ones that match the query
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
    }
    else {
      //(this.state.findMode === 'content')
      var textFind = this.state.find;
      //strict mode eg. "java is object-oriented" (double-quotes)
      var strict = textFind.length > 3 && textFind.charAt(0) === '"' && textFind.charAt(textFind.length - 1) === '"';
      var query = strict ? textFind.substring(1, textFind.length - 1) : textToLowerCaseAlphanumericArray(textFind);

      //go through item to do searching
      items.forEach(function(i) {
        var rank = 0;
        if (strict) {
          if (i.details.includes(query))
            rank++;
        }
        else {
          //turn item details to array of alphanumeric items
          textToLowerCaseAlphanumericArray(i.details).forEach(function(word) {
            if (query.includes(word))
              rank++;
          });
        }

        //put to found array
        if (rank > 0) {
          found.push({
            foundItem: i,
            rank: rank
          });
        }
      }.bind(this));

      //sort
      if (found.length > 1) {
        found = _.sortBy(found, function(item) {
          return this.state.sort === 'relevance' ? item.rank : item.foundItem.name;
        }.bind(this));
      }
    }
    this.setState({
      result: found
    });
  },
  render: function() {
    logger.reportRender('Findpage');
    var resultToDisplay = null;
    if (this.state.result.length > 0) {
      if (this.state.findMode === 'name') {
        resultToDisplay = this.state.result.map(function(item, index) {
          if (item.plid) {
            return <Link key={index}
                         to={'/browse/pl/' + item['plid']}>{item['name']}</Link>
          }
          else {
            return <Link key={index}
                         to={'/browse/pd/' + item['pdid']}>{item['name']}</Link>
          }
        });
      }
      else {
        //Mode = content
        resultToDisplay = this.state.result.map(function(item, index) {
          var foundItem = item.foundItem;
          var ranking = ' (Rank ' + item.rank + ')';
          if (foundItem.plid) {
            return <Link key={index}
                         to={'/browse/pl/' + foundItem['plid']}>{foundItem['name'] + ranking}</Link>
          }
          else {
            return <Link key={index}
                         to={'/browse/pd/' + foundItem['pdid']}>{foundItem['name'] + ranking}</Link>
          }
        });
      }
    }
    return (
      <Pager><Pager.Item>
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
                  <option value="relevance">Relevance</option>
                  <option value="name">Alphabetical</option>
                </select>
              </div>
            ) : (<div></div>)
          }
          {resultToDisplay ? (<div>
            <ul>{resultToDisplay}</ul>
          </div>) : (<div><h4>No result</h4></div>)        }
        </div>
      </Pager.Item></Pager>
    );
  }
  ,
})

export default Findpage;