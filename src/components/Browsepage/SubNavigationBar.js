import React from 'react';
import {LinkContainer} from 'react-router-bootstrap';
import {Nav, NavItem} from 'react-bootstrap';
import logger from '../../utils/logger';
import SelectBox from '../reusable/SelectBox';

var SubNavigationBar = React.createClass({
  getInitialState: function() {
    return {
      browsingMode: 'programminglanguages'
    };
  },
  switchBrowsingMode: function(mode) {
    //for when clicking switching button. notice that the children is supplied from the router, it cannot be modified (read-only)
    if (this.state['browsingMode'] !== mode) {
      this.setState({
        browsingMode: mode
      });
    }
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
        <SelectBox changeHandler={this.switchBrowsingMode} changeHandlerIsFrom="SubNavigationBar" options={
          ["programminglanguages","paradigms"].map(function(item){
            return {
              value: item,
              display: item
            }
          })
        }/>

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