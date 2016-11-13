import React, {PropTypes as T} from 'react';
import {Button} from 'react-bootstrap';
import logger from '../utils/logger';

import {PieChart} from 'react-easy-chart';


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
    logger.reportRender('CreateBox');
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
  // componentDidMount: function() {
  //   console.log('Homepage/reload');
  //   this.props.libraryManager.setLibraryHandler();
  // },
  render: function() {
    logger.reportRender('Homepage');
    var numberOfLanguages = 0;
    var numberOfParadigms = 0;
    var header = (<h3>Welcome</h3>);
    var chart = (<div></div>);
    var createBox = this.props.libraryManager
      ? (<CreateBox libraryManager={this.props.libraryManager}/>)
      : (<div></div>);
    if (this.props.libraryManager && this.props.libraryManager.available) {
      createBox = (<div></div>);
      numberOfLanguages = this.props.libraryManager.getAttr('programminglanguages').length;
      numberOfParadigms = this.props.libraryManager.getAttr('paradigms').length;


      header = (<h3>{this.props.libraryManager.getAttr('name')}</h3>);
      //chart = (<PieChart data={data} options={options} width="600" height="250"/>);
    }
    const pieData = [
      {key: 'Cats', value: 100},
      {key: 'Dogs', value: 200},
      {key: 'Other', value: 50}
    ];
    return (
      <div>
        {header}
        {chart}
        {createBox}
        <PieChart data={pieData} size={300} />
      </div>
    );
  },
});

export default Homepage;