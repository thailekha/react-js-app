import React from 'react';
import logger from '../../utils/logger';
import {Button} from 'react-bootstrap';

var BrowsepageCreateBoxPL = React.createClass({
  /* ... options and lifecycle methods ... */
  getInitialState: function() {
    return {
      name: '',
      details: '',
      type: '',
      paradigm: '',
      paradigms: '',
      pdids: [],
      error: ''
    };
  },
  handleNameChange: function(e) {
    this.setState({name: e.target.value});
  },
  handleDetailsChange: function(e) {
    this.setState({details: e.target.value});
  },
  handleTypeChange: function(e) {
    this.setState({type: e.target.value});
  },
  handleParadigmChange: function(e) {
    this.setState({paradigm: e.target.value});
  },
  handleAddParadigm: function(e) {
    e.preventDefault();
    var nParadigm = this.state.paradigm;
    var pdid = this.props.libraryManager.getPDID(nParadigm);
    if (nParadigm.length > 0 && pdid) {
      var oldState = this.state.paradigms;
      var newState = oldState + (oldState.length === 0 ? '' : ',') + nParadigm;
      this.state.pdids.push(pdid);
      console.log(newState);
      this.setState({
        paradigm: '',
        paradigms: newState
      });
    }
  },
  handleAdd: function(e) {
    if (this.state.name.length > 0 && this.state.details.length > 0 && this.state.type.length > 0) {
      e.preventDefault();
      this.props.libraryManager.addPL(this.state.name, this.state.details, this.state.type, this.state.pdids);
      this.setState(this.getInitialState());
    }
  },
  render: function() {
    logger.reportRender('CreateBox');
    return (
      <div>
        <form style={{marginTop: '30px'}}>
          <h3>Add a new Programming language</h3>
          <div className="form-group">
            <div>
              <input type="text"
                     className="form-control" placeholder="Name"
                     value={this.state.name}
                     onChange={this.handleNameChange}></input>
            </div>
            <div>
            <textarea type="text"
                      className="form-control" placeholder="Details"
                      value={this.state.details}
                      onChange={this.handleDetailsChange}></textarea>
            </div>
            <div>
              <input type="text"
                     className="form-control" placeholder="Type"
                     value={this.state.type}
                     onChange={this.handleTypeChange}></input>
            </div>
            <div>
              <input type="text" disabled
                     className="form-control"
                     value={this.state.paradigms}></input>
            </div>
          </div>
          <Button type="submit" className="btn btn-primary" onClick={this.handleAdd}>Add</Button>

        </form>
        <form>
          <h3>What paradigms does this language have ?</h3>
          <div className="form-group">
            <input type="text"
                   className="form-control" placeholder="Paragidms"
                   value={this.state.paradigm} onChange={this.handleParadigmChange}></input>
            <Button onClick={this.handleAddParadigm}>Add PD</Button>
          </div>
        </form>
      </div>
    );
  }
});

var BrowsepageCreateBoxPD = React.createClass({
  /* ... options and lifecycle methods ... */
  getInitialState: function() {
    return {
      name: '',
      details: '',
      subParadigm: '',
      subParadigms: '',
      spdids: []
    };
  },
  handleNameChange: function(e) {
    this.setState({name: e.target.value});
  },
  handleDetailsChange: function(e) {
    this.setState({details: e.target.value});
  },
  handleSubParadigmChange: function(e) {
    this.setState({subParadigm: e.target.value});
  },
  handleAddSubParadigm: function(e) {
    e.preventDefault();
    var nSubParadigm = this.state.subParadigm;
    var spdid = this.props.libraryManager.getPDID(nSubParadigm);
    if (nSubParadigm.length > 0 && spdid) {
      var oldState = this.state.subParadigms;
      var newState = oldState + (oldState.length === 0 ? '' : ',') + nSubParadigm;
      this.state.spdids.push(spdid);
      console.log(newState);
      this.setState({
        subParadigm: '',
        subParadigms: newState
      });
    }
  },
  handleAdd: function(e) {
    if (this.state.name.length > 0 && this.state.details.length > 0) {
      e.preventDefault();
      this.props.libraryManager.addPD(this.state.name, this.state.details, this.state.spdids);
      this.setState(this.getInitialState());
    }
  },
  render: function() {
    logger.reportRender('CreateBox');
    return (
      <div>
        <form style={{marginTop: '30px'}}>
          <h3>Add a new paradigm</h3>
          <div className="form-group">
            <div>
              <input type="text"
                     className="form-control" placeholder="Name"
                     value={this.state.name}
                     onChange={this.handleNameChange}></input>
            </div>
            <div>
            <textarea type="text"
                      className="form-control" placeholder="Details"
                      value={this.state.details}
                      onChange={this.handleDetailsChange}></textarea>
            </div>
            <div>
              <input type="text" disabled
                     className="form-control"
                     value={this.state.subParadigms}></input>
            </div>
          </div>
          <Button type="submit" className="btn btn-primary" onClick={this.handleAdd}>Add</Button>
        </form>
        <form>
          <h3>What subparadigms does this have ?</h3>
          <div className="form-group">
            <input type="text"
                   className="form-control" placeholder="Paragidms"
                   value={this.state.subParadigm} onChange={this.handleSubParadigmChange}></input>
            <Button onClick={this.handleAddSubParadigm}>Add PD</Button>
          </div>
        </form>
      </div>
    );
  }
});

export {BrowsepageCreateBoxPL,BrowsepageCreateBoxPD};