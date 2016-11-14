import React, {PropTypes as T} from 'react'
import {ButtonToolbar, Button} from 'react-bootstrap'
import AuthService from '../utils/AuthService'
import logger from '../utils/logger'

var Login = React.createClass({
  contextTypes: {
    router: T.object
  },
  propTypes: {
    location: T.object,
    auth: T.instanceOf(AuthService)
  },
  render: function() {
    logger.reportRender('Loginpage');
    console.warn('Loginpage');
    const {auth} = this.props
    return (
      <div>
        <h2>Login</h2>
        <ButtonToolbar>
          <Button bsStyle="primary" onClick={auth.login}>Login</Button>
        </ButtonToolbar>
      </div>
    )
  }
});

export default Login;
