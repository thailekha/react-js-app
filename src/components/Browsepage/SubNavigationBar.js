import React from 'react';
import {Button} from 'react-bootstrap';
import {Link} from 'react-router';
import {LinkContainer} from 'react-router-bootstrap';
import {Nav, NavItem} from 'react-bootstrap';
import logger from '../../utils/logger';

var SubNavigationBar = React.createClass({
  /* ... options and lifecycle methods ... */
  // shouldComponentUpdate: function(nextProps,nextState){
  //   console.log('#\n#\n#\n#\n#\n#\n');
  //   console.log(nextState);
  //   return true;
  // },
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
          return <LinkContainer key={index}
                                to={'/browse/pl/' + navItem['plid']}>
            <NavItem eventKey={index}>{navItem['name']}</NavItem>
          </LinkContainer>;
        }
        console.warn('SubNavigationBar/Mapping subnavigtions items has null');
        return null;
      }) :
      //index + 1 because of createbox
      this.props.subNavigationItems.map(function(navItem, index) {
        if (navItem['pdid']) {
          return <LinkContainer key={index}
                                to={'/browse/pd/' + navItem['pdid']}>
            <NavItem eventKey={index + 1}>{navItem['name']}</NavItem>
          </LinkContainer>;
        }
        console.warn('SubNavigationBar/Mapping subnavigtions items has null');
        return null;
      }.bind(this));
    return (
      <div id="subNavigation">
        <Button bsStyle={this.state.browsingMode === 'programminglanguages' ? "primary" : "success"}
                onClick={this.switchBrowsingMode}>Switch (currently {this.state.browsingMode})</Button>

        <Nav bsStyle="pills" stacked activeKey={1}>
          <LinkContainer to={linkToCreateBox}>
            <NavItem eventKey={1}>Create</NavItem></LinkContainer>
          {subNavigationItems}
        </Nav>
      </div>
    );
  },
});

export default SubNavigationBar;