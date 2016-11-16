import React from 'react';
import logger from '../../utils/logger';
import {Button} from 'react-bootstrap';

var BrowsepageCreateEditBoxPL = React.createClass({
  /* ... options and lifecycle methods ... */
  getInitialState: function() {
    var mode = this.props.boxmode;
    if (mode === 'edit') {
      var pl = this.props.libraryManager.getPL(parseInt(this.props.routeParams['id'],10));
      var relatedPDs = this.props.libraryManager.getRelatedPDs(parseInt(this.props.routeParams['id'],10));
      var relatedPDsNames = '';
      var relatedPDsIDs = [];
      for (var i = 0; i < relatedPDs.length; i++) {
        relatedPDsNames += relatedPDs[i].name + (i + 1 === relatedPDs.length ? '' : ',');
        relatedPDsIDs.push(relatedPDs[i].pdid);
      }
      return {
        name: pl.name,
        details: pl.details,
        type: pl.type,
        paradigm: '',
        paradigms: relatedPDsNames,
        pdids: relatedPDsIDs,
      }
    }
    else if (mode === 'create') {
      return {
        name: '',
        details: '',
        type: '',
        paradigm: '',
        paradigms: '',
        pdids: [],
        error: ''
      };
    }
    else {
      console.warn('Unexpected box mdoe');
    }
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

    if (nParadigm.length > 0 && pdid && !this.state.pdids.includes(pdid)) {
      var oldState = this.state.paradigms;
      var newState = oldState + (oldState.length === 0 ? '' : ',') + nParadigm;
      this.state.pdids.push(pdid);
      console.log(newState);
      this.setState({
        paradigm: '',
        paradigms: newState
      });
    }
    else{
      alert('Error: Empty paradigm field; OR paradigm not found; OR paradigm already added');
    }
  },
  handleRemoveParadigm: function(e) {
    e.preventDefault();
    if (this.state.paradigms.length > 0 && this.state.pdids.length > 0) {
      var paradigms = this.state.paradigms.split(',');//string
      paradigms.pop();
      this.state.pdids.pop();//array
      this.setState({
        paradigms: paradigms.join(',')
      });
    }
  },
  handleSubmit: function(e) {
    if (this.state.name.length > 0 && this.state.details.length > 0 && this.state.type.length > 0) {
      e.preventDefault();
      if (this.props.boxmode === 'create')
        this.props.libraryManager.addPL(this.state.name, this.state.details, this.state.type, this.state.pdids);
      else if (this.props.boxmode === 'edit')
        this.props.libraryManager.editPL(parseInt(this.props.routeParams['id'],10), this.state.name, this.state.details, this.state.type, this.state.pdids);
      else
        console.warn('Unexpected mode');
      this.setState(this.getInitialState());
    }
    else {
      alert('Name, Details, and Type must be filled');
    }
  },
  render: function() {
    logger.reportRender('BrowsepageCreateBoxPL');
    var header = this.props.boxmode === 'create'
      ? 'Add a new Programming language'
      : 'Edit ' + this.props.libraryManager.getPL(parseInt(this.props.routeParams['id'],10))['name'];
    return (
      <div>
        <form style={{marginTop: '30px'}}>
          <h3>{header}</h3>
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
              <Button onClick={this.handleRemoveParadigm}>Remove PD</Button>
            </div>
          </div>
          <Button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Submit</Button>

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

var BrowsepageCreateEditBoxPD = React.createClass({
  /* ... options and lifecycle methods ... */
  getInitialState: function() {
    var mode = this.props.boxmode;
    if (mode === 'edit') {
      var pd = this.props.libraryManager.getPD(parseInt(this.props.routeParams['id'],10));
      var subPDIDs = pd.subparadigms;
      var subPDs = '';
      subPDIDs.forEach(function(spdid, index) {
        subPDs += this.props.libraryManager.getPD(spdid).name + (index + 1 === subPDIDs.length ? '' : ',');
      }.bind(this));
      return {
        name: pd.name,
        details: pd.details,
        subParadigm: '',
        subParadigms: subPDs,
        spdids: subPDIDs
      };
    }
    else if (mode === 'create') {
      return {
        name: '',
        details: '',
        subParadigm: '',
        subParadigms: '',
        spdids: []
      };
    }
    else {
      console.warn('Unexpected mode');
    }
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
  handleRemoveSubParadigm: function(e) {
    e.preventDefault();
    if (this.state.subParadigms.length > 0 && this.state.spdids.length > 0) {
      var subPDs = this.state.subParadigms.split(',');
      subPDs.pop();
      this.state.spdids.pop();
      this.setState({
        subParadigms: subPDs
      });
    }
  },
  handleSubmit: function(e) {
    if (this.state.name.length > 0 && this.state.details.length > 0) {
      e.preventDefault();
      if (this.props.boxmode === 'create') {
        this.props.libraryManager.addPD(this.state.name, this.state.details, this.state.spdids);
      }
      else if (this.props.boxmode === 'edit') {
        this.props.libraryManager.editPD(parseInt(this.props.routeParams['id'],10), this.state.name, this.state.details, this.state.spdids);
      }
      else {
        console.warn('Unexpected mode');
      }
      this.setState(this.getInitialState());
    }
  },
  render: function() {
    logger.reportRender('BrowsepageCreateBoxPD');
    var header = this.props.boxmode === 'create'
      ? 'Add a new paradigm'
      : 'Edit ' + this.props.libraryManager.getPD(parseInt(this.props.routeParams['id'],10)).name;
    return (
      <div>
        <form style={{marginTop: '30px'}}>
          <h3>{header}</h3>
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
              <Button onClick={this.handleRemoveSubParadigm}>Remove</Button>
            </div>
          </div>
          <Button disabled type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Submit</Button>
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

export {BrowsepageCreateEditBoxPL, BrowsepageCreateEditBoxPD};