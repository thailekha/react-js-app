import React from 'react';
import {Button, Pager} from 'react-bootstrap';
import logger from '../utils/logger';

import {PieChart, Legend} from 'react-easy-chart';
var randomHexColor = require('random-hex-color');


var CreateBox = React.createClass({
  /* ... options and lifecycle methods ... */
  getInitialState: function() {
    return {name: ''};
  },
  handleCreate: function(e) {
    if (this.state.name.length > 0) {
      e.preventDefault();
      this.props.libraryManager.create(this.state.name);
      this.setState({name: ''});
    }
  },
  handleNameChange: function(e) {
    this.setState({name: e.target.value});
  },
  render: function() {
    logger.reportRender('HomepageCreateBox');
    return (
      <form style={{marginTop: '30px'}}>
        <h3>Create a new library</h3>
        <div className="form-group">
          <input type="text"
                 className="form-control" placeholder="Name"
                 value={this.state.name}
                 onChange={this.handleNameChange}></input>
        </div>
        <Button type="submit" className="btn btn-primary" onClick={this.handleCreate}>Create</Button>
      </form>
    );
  },
});

var Homepage = React.createClass({
  /* ... options and lifecycle methods ... */
  componentDidMount: function() {
    console.log('Homepage/reload');
    this.props.setLibraryHandler();
  },
  getInitialState: function() {
    return {view: 'all'};
  },
  handleChangeMode: function(e) {
    e.preventDefault();
    this.setState({view: e.target.value});
  },
  render: function() {
    logger.reportRender('Homepage');
    //Default view
    var header = (<h3>Welcome</h3>);
    var chart = (<div></div>);
    var selectModeBox = (<div></div>);
    var createBox = this.props.libraryManager
      ? (<CreateBox libraryManager={this.props.libraryManager}/>)
      : (<div></div>);

    if (this.props.libraryManager && this.props.libraryManager.available) {
      //Full view
      header = (<h3>{this.props.libraryManager.getAttr('name')}</h3>);
      createBox = (<div></div>);
      selectModeBox = (
        <div><h4>Overview mode</h4>
          <select id="view" onChange={this.handleChangeMode}>
            <option value="all">all</option>
            <option value="programminglanguages">programming languages</option>
            <option value="paradigms">paradigms</option>
          </select>
        </div>
      );

      if (this.state.view === 'all') {
        var numberOfLanguages = this.props.libraryManager.getAttr('programminglanguages').length;
        var numberOfParadigms = this.props.libraryManager.getAttr('paradigms').length;
        const pieData = [
          {key: 'programming languages', value: numberOfLanguages, color: '#800080'},
          {key: 'paradigms', value: numberOfParadigms, color: '#2d8b59'}
        ];
        const config = [
          {color: '#800080'},
          {color: '#2d8b59'}
        ];
        chart = (<Pager><Pager.Item>
          <div><PieChart data={pieData} size={300}/>
            <Legend data={pieData} dataId={'key'} config={config}/></div>
        </Pager.Item></Pager>);
      }
      else if (this.state.view === 'programminglanguages') {
        //1 language -> many paradigms
        var dataPL = [];
        var configDataPL = [];
        var pls = this.props.libraryManager.getAttr('programminglanguages');
        pls.forEach(function(pl) {
          var relatedPDs = this.props.libraryManager.getRelatedPDs(pl.plid).length;
          var color = randomHexColor();
          dataPL.push({
            key: pl.name + ' (' + relatedPDs + ' paradigms)',
            value: relatedPDs,
            color: color
          });
          configDataPL.push({color: color});
        }.bind(this));
        const pieDataPL = dataPL;
        const configPL = configDataPL;

        chart = (<Pager><Pager.Item>
          <div><PieChart data={pieDataPL} size={300}/>
            <Legend data={pieDataPL} dataId={'key'} config={configPL}/></div>
        </Pager.Item></Pager>);
      }
      else if (this.state.view === 'paradigms') {
        //1 paradigm -> many languages
        var dataPD = [];
        var configDataPD = [];
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
          dataPD.push({
            key: pd.name + ' (' + numberOfPLs + ' languages)',
            value: numberOfPLs,
            color: color
          });
          configDataPD.push({color: color});
        });
        const pieDataPD = dataPD;
        const configPD = configDataPD;

        chart = (<Pager><Pager.Item>
          <PieChart data={pieDataPD} size={300}/>
          <Legend data={pieDataPD} dataId={'key'} config={configPD}/>
        </Pager.Item>
        </Pager>);
      }
    }
    return (
      <div>
        {header}
        {selectModeBox}
        {chart}
        {createBox}
      </div>
    );
  },
});

export default Homepage;