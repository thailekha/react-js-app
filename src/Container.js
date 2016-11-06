import React, {PropTypes as T} from 'react'
import {Jumbotron} from 'react-bootstrap'
import logger from './utils/logger'

var Container = React.createClass({
  contextTypes: {
    router: T.object
  },
  render() {
    logger.reportRender('Container')
    let children = null;
    if (this.props.children) {
      console.log('Cloning children')
      children = React.cloneElement(this.props.children, {
        //this.props.route is from the router
        auth: this.props.route.auth //sends auth instance to children
      })
    }
    return (
      <Jumbotron>
        <h2>
          Container
          <img src="https://cdn.auth0.com/styleguide/1.0.0/img/badge.svg"/>
        </h2>
        {children}
      </Jumbotron>
    )
  }
});

export default Container;
