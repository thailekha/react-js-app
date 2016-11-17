import React from 'react';
import logger from '../../utils/logger';
import {Button} from 'react-bootstrap';
import InputTextBox from '../reusable/InputTextBox';
import ParadigmBox from './ParadigmBox';


var CreateEditBoxPL = React.createClass({
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
        paradigms: relatedPDsNames,
        pdids: relatedPDsIDs,
      }
    }
    else if (mode === 'create') {
      return {
        name: '',
        details: '',
        type: '',
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
  handleAddParadigm: function(p) {
    var nParadigm = p;
    var pdid = this.props.libraryManager.getPDID(nParadigm);

    if (nParadigm.length > 0 && pdid && !this.state.pdids.includes(pdid)) {
      var oldState = this.state.paradigms;
      var newState = oldState + (oldState.length === 0 ? '' : ',') + nParadigm;
      this.state.pdids.push(pdid);
      console.log(newState);
      this.setState({
        paradigms: newState
      });
    }
    else{
      alert('Error: Empty paradigm field; OR paradigm not found; OR paradigm already added');
    }
  },
  handleRemoveParadigm: function() {
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
    logger.reportRender('CreateEditBoxPL');
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
            <ParadigmBox ids={this.state.pdids} items={this.state.paradigms} removeHandler={this.handleRemoveParadigm}/>
          </div>
          <Button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Submit</Button>

          <InputTextBox
            header={"What paradigms does this have ?"}
            placeholder={"Paradigm"}
            submitHandler={this.handleAddParadigm}
          />
        </form>

      </div>
    );
  }
});

var CreateEditBoxPD = React.createClass({
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
        subParadigms: subPDs,
        spdids: subPDIDs
      };
    }
    else if (mode === 'create') {
      return {
        name: '',
        details: '',
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
  handleAddSubParadigm: function(sp) {
    var nSubParadigm = sp;
    var spdid = this.props.libraryManager.getPDID(nSubParadigm);
    if (nSubParadigm.length > 0 && spdid) {
      var oldState = this.state.subParadigms;
      var newState = oldState + (oldState.length === 0 ? '' : ',') + nSubParadigm;
      this.state.spdids.push(spdid);
      console.log(newState);
      this.setState({
        subParadigms: newState
      });
    }
  },
  handleRemoveSubParadigm: function() {
    if (this.state.subParadigms.length > 0 && this.state.spdids.length > 0) {
      var subParadigms = this.state.subParadigms.split(',');
      subParadigms.pop();
      this.state.spdids.pop();
      this.setState({
        subParadigms: subParadigms.join(',')
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
    logger.reportRender('CreateEditBoxPD');
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
            <ParadigmBox ids={this.state.spdids} items={this.state.subParadigms} removeHandler={this.handleRemoveSubParadigm}/>
          </div>
          <Button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Submit</Button>
        </form>

        <InputTextBox
          header={"What subparadigms does this have ?"}
          placeholder={"Subparadigm"}
          submitHandler={this.handleAddSubParadigm}
        />
      </div>
    );
  }
});

export {CreateEditBoxPL, CreateEditBoxPD};