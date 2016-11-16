import React from 'react';
import {Pager} from 'react-bootstrap';
import logger from '../../utils/logger';
import SelectChartModeBox from './SelectChartModeBox';
import {PieChart, Legend} from 'react-easy-chart';
var randomHexColor = require('random-hex-color');

var ChartRenderer = React.createClass({
  getInitialState: function() {
    return {view: 'all'}
  },
  handleChange: function(mode) {
    this.setState({
      view: mode
    });
  },
  render: function() {
    logger.reportRender("ChartRenderer");
    //if these props are not available, return null
    if (!(this.props.libraryManager && this.props.libraryManager.libraryIsAvailable)) {
      return null;
    }

    var data = [];
    var config = [];

    if (this.state.view === 'all') {
      var numberOfLanguages = this.props.libraryManager.getAttr('programminglanguages').length;
      var numberOfParadigms = this.props.libraryManager.getAttr('paradigms').length;
      data = [
        {key: 'programming languages', value: numberOfLanguages, color: '#800080'},
        {key: 'paradigms', value: numberOfParadigms, color: '#2d8b59'}
      ];
      config = [
        {color: '#800080'},
        {color: '#2d8b59'}
      ];
    }
    else if (this.state.view === 'programminglanguages') {
      //1 language -> many paradigms
      var pls = this.props.libraryManager.getAttr('programminglanguages');
      pls.forEach(function(pl) {
        var relatedPDs = this.props.libraryManager.getRelatedPDs(pl.plid).length;
        var color = randomHexColor();
        data.push({
          key: pl.name + ' (' + relatedPDs + ' paradigms)',
          value: relatedPDs,
          color: color
        });
        config.push({color: color});
      }.bind(this));
    }
    else if (this.state.view === 'paradigms') {
      //1 paradigm -> many languages
      var pds = this.props.libraryManager.getAttr('paradigms');
      var havings = this.props.libraryManager.getAttr('havings');
      pds.forEach(function(pd) {
        var numberOfPLs = 0;
        havings.forEach(function(having) {
          if (having.pdid === pd.pdid) {
            numberOfPLs++;
          }
        });
        var color = randomHexColor();
        data.push({
          key: pd.name + ' (' + numberOfPLs + ' languages)',
          value: numberOfPLs,
          color: color
        });
        config.push({color: color});
      });
    }

    return (
      <div>
        <h4>Overview mode</h4>
        <SelectChartModeBox changeHandler={this.handleChange}/>
        <Pager>
          <Pager.Item>
            <PieChart data={data} size={300}/>
            <Legend data={data} dataId={'key'} config={config}/>
          </Pager.Item>
        </Pager>
      </div>
    );
  }
});

export default ChartRenderer;