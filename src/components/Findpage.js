import React from 'react';
import logger from '../logger'

var Findpage = React.createClass({
  /* ... options and lifecycle methods ... */
  render: function() {
    logger.reportRender('Findpage');
    return (
      <div>
        <input type="text" placeholder="Search"/>
        <input type="button" value="Find by name"/>
        <input type="button" value="Find by content"/>

        Sort by:
        <select id="sort">
          <option value="name">Alphabetical</option>
          <option value="age">Newest</option>
        </select>
      </div>
    );
  },
})

export default Findpage;