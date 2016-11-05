import React, {PropTypes as T} from 'react'
import {ButtonToolbar, Button} from 'react-bootstrap'
import AuthService from '../../utils/AuthService'
//import styles from './styles.module.css'

var Login = React.createClass({
  contextTypes: {
    router: T.object
  },
  propTypes: {
    location: T.object,
    auth: T.instanceOf(AuthService)
  },
  render: function() {
    console.log('new login rendered');
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
