import React from 'react';
import {Button,Pager} from 'react-bootstrap';
import logger from '../../utils/logger';
import SelectBox from './SelectBox';
import {PieChart, Legend} from 'react-easy-chart';
var randomHexColor = require('random-hex-color');

var ChartRenderer = React.createClass({
  getInitialState: function() {
    return {view: 'all', size: 600}
  },
  handleChangeView: function(mode) {
    this.setState({
      view: mode
    });
  },
  handleChangeSize: function(amount) {
    var nSize = this.state.size + amount;
    if(nSize > 0 && nSize <= 1000) {
      this.setState({
        size: nSize
      });
    }
  },
  handlePlus: function(e){
    e.preventDefault();
    this.handleChangeSize(50);
  },
  handleMinus: function(e){
    e.preventDefault();
    this.handleChangeSize(-50);
  },
  render: function() {
    logger.reportRender("ChartRenderer");
    //if these props are not available, return null
    if (!(this.props.libraryManager && this.props.libraryManager.libraryIsAvailable)) {
      return null;
    }

    var data = [];
    var config = [];
    var legendData = [];

    if (this.state.view === 'all') {
      var numberOfLanguages = this.props.libraryManager.getAttr('programminglanguages').length;
      var numberOfParadigms = this.props.libraryManager.getAttr('paradigms').length;
      data = [
        {key: 'programming languages (' + numberOfLanguages + ')', value: numberOfLanguages, color: '#800080'},
        {key: 'paradigms (' + numberOfParadigms + ')', value: numberOfParadigms, color: '#2d8b59'}
      ];
      legendData = data;
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
          key: pl.name,
          value: relatedPDs,
          color: color
        });
        legendData.push({
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
          key: pd.name,
          value: numberOfPLs,
          color: color
        });
        legendData.push({
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
        <SelectBox changeHandler={this.handleChangeView} changeHandlerIsFrom="ChartRenderer" options={
          ["all", "programminglanguages", "paradigms"].map(function(item) {
            return {
              value: item,
              display: item
            }
          })
        }/>
        <Pager>
          <Pager.Item>
            <Button bsStyle="primary" onClick={this.handlePlus}>+</Button>
            <Button bsStyle="primary" onClick={this.handleMinus}>-</Button>
            <PieChart labels
                      innerHoleSize={this.state.size / 2}
                      styles={{
                        '.chart_lines': {
                          strokeWidth: 0
                        },
                        '.chart_text': {
                          fontFamily: 'serif',
                          fontSize: '1.25em',
                          fill: '#333'
                        }
                      }} data={data} size={this.state.size}/>
            <Legend data={legendData} dataId={'key'} config={config}/>
          </Pager.Item>
        </Pager>
      </div>
    );
  }
});

export default ChartRenderer;