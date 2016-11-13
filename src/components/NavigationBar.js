import React from 'react';
import {Link} from 'react-router';
import logger from '../utils/logger';
import {Navbar,Nav,NavItem} from 'react-bootstrap';

//https://github.com/ReactTraining/react-router/blob/master/docs/API.md#link
var NavigationBar = React.createClass({
  /* ... options and lifecycle methods ... */
  render: function() {
    logger.reportRender('NavigationBar');
    var navigationItems = ['home', 'browse', 'Find', 'profile', 'logout'].map(function(navItem, index) {
      //if key={index} was left within <Link> tab error is thrown
      return (<NavItem eventKey={index} key={index} id={'tab' + index}>
        <Link to={navItem}>{navItem}</Link>
      </NavItem>);
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