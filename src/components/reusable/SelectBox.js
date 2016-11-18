import React from 'react';
import logger from '../../utils/logger';
import _ from 'lodash';

/*
props: {
  changeHandler:
  changeHandlerIsFrom:
  options: [
    {
      value:
      display:
    }, ...
  ]
}
**/

var SelectBox = React.createClass({
  shouldComponentUpdate: function(nextProps, nextState) {
    //if same changeHandler, no update
    //lodash cannot compare functions
    return !(_.isEqual(this.props.options, nextProps.options) && nextProps.changeHandlerIsFrom === this.props.changeHandlerIsFrom);
  },
  handleSelect: function(e) {
    e.preventDefault();
    this.props.changeHandler(e.target.value);
  },
  render: function() {
    var optionItems = this.props.options.map(function(option,index){
      return (<option key={index} value={option.value}>{option.display}</option>);
    });
    logger.reportRender('SelectBox from ' + this.props.changeHandlerIsFrom);
    return (
      <select id="view" onChange={this.handleSelect}>
        {optionItems}
      </select>
    );
  }
});

export default SelectBox;