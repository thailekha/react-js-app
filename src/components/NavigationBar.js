import React from 'react';
import {LinkContainer} from 'react-router-bootstrap';
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import logger from '../utils/logger';

var NavigationBar = React.createClass({
  /* ... options and lifecycle methods ... */
  render: function() {
    logger.reportRender('NavigationBar');
    var navigationItems = this.props.navItems.map(function(navItem, index) {
      //if key={index} was left within <Link> tab error is thrown
      return (
        <LinkContainer key={index} to={navItem}>
          <NavItem key={index} eventKey={index} id={'tab' + index}>{navItem}</NavItem>
        </LinkContainer>
      );
    }.bind(this));
    return (
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">React-Bootstrap</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>{navigationItems}</Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  },
});

export default NavigationBar;