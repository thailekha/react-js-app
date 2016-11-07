import { EventEmitter } from 'events'
import { isTokenExpired } from './jwtHelper'
import Auth0Lock from 'auth0-lock'
import { browserHistory } from 'react-router'

export default class AuthService extends EventEmitter {
  constructor(clientId, domain) {
    console.log('AuthService/constructor()');
    super()
    // Configure Auth0
    this.lock = new Auth0Lock(clientId, domain, {})
    // Add callback for lock `authenticated` event
    this.lock.on('authenticated', this._doAuthentication.bind(this))
    // Add callback for lock `authorization_error` event
    this.lock.on('authorization_error', this._authorizationError.bind(this))
    // binds login functions to keep this context
    this.login = this.login.bind(this)
  }

  _doAuthentication(authResult){
    // Saves the user token
    console.log('AuthService/_doAuthentication()');
    this.setToken(authResult.idToken)
    // navigate to the home route
    browserHistory.replace('/#/home')
    // Async loads the user profile data
    this.lock.getProfile(authResult.idToken, (error, profile) => {
      if (error) {
        console.log('Error loading the Profile', error)
      } else {
        this.setProfile(profile)
      }
    })
  }

  _authorizationError(error){
    // Unexpected authentication error
    console.log('AuthService/_authorizationError()');
    console.log('Authentication Error', error)
  }

  login() {
    // Call the show method to display the widget.
    console.log('AuthService/login()');
    this.lock.show();
    console.log('closed');
  }

  loggedIn(){
    // Checks if there is a saved token and it's still valid
    console.log('AuthService/loggedIn()');
    const token = this.getToken()
    return !!token && !isTokenExpired(token)
  }

  setProfile(profile){
    // Saves profile data to localStorage
    console.log('AuthService/setProfile()');
    localStorage.setItem('profile', JSON.stringify(profile))
    // Triggers profile_updated event to update the UI
    this.emit('profile_updated', profile)
  }

  getProfile(){
    // Retrieves the profile data from localStorage
    console.log('AuthService/getProfile()');
    const profile = localStorage.getItem('profile')
    return profile ? JSON.parse(localStorage.profile) : {}
  }

  setToken(idToken){
    // Saves user token to localStorage
    console.log('AuthService/setToken()');
    localStorage.setItem('id_token', idToken)
  }

  getToken(){
    // Retrieves the user token from localStorage
    console.log('AuthService/getToken()');
    return localStorage.getItem('id_token');
  }

  logout(){
    // Clear user token and profile data from localStorage
    console.log('AuthService/logout()');
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
  }
}
