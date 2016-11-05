import React from 'react';
import logger from '../utils/logger'
var request = require('superagent');

var Landpage = React.createClass({
  /* ... options and lifecycle methods ... */
  render: function() {
    logger.reportRender('Landpage');
    var login = {
      header: 'Login',
      input1: 'Email',
      input2: 'Password'
    };
    var signup = {
      input1: 'Repo Name'
    };
    var mode = login;
    var handleLogin = {

    };
    return (
      <div>
        <h1>Repo library</h1>
        <button>Mode: {mode.header}</button>
        <form style={{marginTop: '30px'}}>
          <div className="form-group">
            <input type="text"
                   className="form-control" placeholder="Email"></input>
          </div>
          <div className="form-group">
            <input type="text"
                   className="form-control" placeholder="Repo Name"></input>
          </div>
          <div className="form-group">
            <input type="text"
                   className="form-control" placeholder="Password"></input>
          </div>
          <button type="submit" className="btn btn-primary">{mode.header}</button>
        </form>
      </div>
    );
  }
});

export default Landpage;