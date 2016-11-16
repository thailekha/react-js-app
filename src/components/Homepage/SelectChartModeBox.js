import React from 'react';
import logger from '../../utils/logger';
import _ from 'lodash';

var SelectChartModeBox = React.createClass({
  shouldComponentUpdate: function(nextProps,nextState) {
    //if same changeHandler, no update
    return !_.isEqual(nextProps.changeHandler,this.props.changeHandler);
  },
  handleSelect: function(e) {
    e.preventDefault();
    this.props.changeHandler(e.target.value);
  },
  render: function() {
    logger.reportRender('SelectChartModeBox');
    return (
      <select id="view" onChange={this.handleSelect}>
        <option value="all">all</option>
        <option value="programminglanguages">programming languages</option>
        <option value="paradigms">paradigms</option>
      </select>
    );
  }
});

export default SelectChartModeBox;