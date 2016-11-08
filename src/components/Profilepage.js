import React, {PropTypes as T} from 'react';
import logger from '../utils/logger';
import AuthService from '../utils/AuthService';
import NavigationBar from './NavigationBar';

//https://auth0.com/docs/quickstart/spa/react/04-user-profile
var Profilepage = React.createClass({
  /* ... options and lifecycle methods ... */
  render: function() {
    logger.reportRender('Profilepage');
    var userProfile = this.props.userProfile;
    //console.log(userProfile);
    return (
      <div>
        Email: {userProfile.email};
        <table className="table table-bordered">
          <thead>
          <tr>
            <th></th>
            <th></th>
          </tr>
          </thead>
          <tbody>
            <tr>
              <td>Name:</td>
              <td>
                <input type="text" className="form-control"/>
                <input type="button" value="Save"/>
              </td>
            </tr>
            <tr>
              <td>Password:</td>
              <td>
                <input type="text" className="form-control"/>
                <input type="button" value="Save"/>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  },
})

export default Profilepage;