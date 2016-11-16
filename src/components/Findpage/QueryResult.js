import React from 'react';
import logger from '../../utils/logger';
import {LinkContainer} from 'react-router-bootstrap';
import {ListGroup, ListGroupItem} from 'react-bootstrap';
import _ from 'lodash';

var QueryResult = React.createClass({
  shouldComponentUpdate: function(nextProps, nextState) {
    //if it is the same set of items to display, dont update
    return !(_.isEqual(this.props.items, nextProps.items) && _.isEqual(this.props.mode, nextProps.mode));
  },
  render: function() {
    logger.reportRender('QueryResult');
    var display = (<h4>No result</h4>);

    if(this.props.items.length > 0) {
      if (this.props.mode === 'name') {
        display = this.props.items.map(function(item, index) {
          if (item.plid) {
            return <LinkContainer key={index} to={'/browse/pl/' + item['plid']}>
              <ListGroupItem bsStyle="success">
                {item['name']}
              </ListGroupItem>
            </LinkContainer>
          }
          else {
            return <LinkContainer key={index} to={'/browse/pd/' + item['pdid']}>
              <ListGroupItem bsStyle="success">
                {item['name']}
              </ListGroupItem>
            </LinkContainer>
          }
        });
      }
      else if (this.props.mode === 'content') {
        display = this.props.items.map(function(item, index) {
          var foundItem = item.foundItem;
          var ranking = ' (Rank ' + item.rank + ')';
          if (foundItem.plid) {
            return <LinkContainer key={index} to={'/browse/pl/' + foundItem['plid']}>
              <ListGroupItem bsStyle="success">
                {foundItem['name'] + ranking}
              </ListGroupItem>
            </LinkContainer>
          }
          else {
            return <LinkContainer key={index} to={'/browse/pd/' + foundItem['pdid']}>
              <ListGroupItem bsStyle="success">
                {foundItem['name'] + ranking}
              </ListGroupItem>
            </LinkContainer>
          }
        });
      }
    }
    return (
      <ListGroup>
        {display}
      </ListGroup>
    );
  }
});

export default QueryResult;