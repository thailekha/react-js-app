import React from 'react';
import logger from '../../utils/logger';
import {Button} from 'react-bootstrap';
import {Link}from 'react-router';

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
        <Button bsStyle={this.state.browsingMode === 'programminglanguages' ? "primary" : "success"}
                onClick={this.switchBrowsingMode}>Switch (currently {this.state.browsingMode})</Button>
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

export default SubNavigationBar;