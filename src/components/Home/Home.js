import React, {PropTypes as T} from 'react'
import {Button} from 'react-bootstrap'
import AuthService from 'utils/AuthService'
import styles from './styles.module.css'

var Home = React.createClass({
  contextTypes: {
    router: T.object
  },
  propTypes: {
    auth: T.instanceOf(AuthService)
  },
  getInitialState() {
    console.log("Home.js -> " + typeof this.props.auth);
    this.props.auth.on('profile_updated', (newProfile) => {
      this.setState({profile: newProfile})
    });
    return {profile: this.props.auth.getProfile()};
  },
  logout() {
    this.props.auth.logout();
    this.context.router.push('/login');
  },
  render() {
    console.log('new homepage');
    const {profile} = this.state;
    return (
      <div className={styles.root}>
        <h2>Home</h2>
        <p>Welcome {profile.name}!</p>
        <Button onClick={this.logout}>Logout</Button>
      </div>
    );
  }
});

export default Home;
