import React from 'react';
import logger from '../utils/logger'

var Profilepage = React.createClass({
  /* ... options and lifecycle methods ... */
  render: function() {
    logger.reportRender('Profilepage');
    return (
      <div>
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
                <input type="text" className="form-control" onChange={this.handlePhoneNumChange}/>
                <input type="button" value="Save"/>
              </td>
            </tr>
            <tr>
              <td>Password:</td>
              <td>
                <input type="text" className="form-control" onChange={this.handlePhoneNumChange}/>
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