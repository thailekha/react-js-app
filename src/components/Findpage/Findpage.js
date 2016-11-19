import React from 'react';
import logger from '../../utils/logger'
import {Pager} from 'react-bootstrap';
import SelectBox from '../reusable/SelectBox';
import InputTextBox from '../reusable/InputTextBox';
import QueryResult from './QueryResult';

var Findpage = React.createClass({
  getInitialState: function() {
    //sort here should be 'relevance' to match the selectbox below which has relevance as the first value
    return {findMode: 'name', sort: 'relevance', result: []}
  },
  handleSortChange: function(mode) {
    this.setState({
      sort: mode
    });
  },
  handleFindModeChange: function(mode) {
    this.setState({
      findMode: mode,
      result: [] //otherwise queryresult is messed up
    });
  },
  handleFind: function(query) {
    this.setState({
      result: this.props.libraryManager.search(query,this.state.findMode,this.state.sort)
    });
  },
  render: function() {
    logger.reportRender('Findpage');
    return (
      <Pager><Pager.Item>
        <div>
          <InputTextBox header={"Query"} placeholder={"Find something"} submitHandler={this.handleFind}/>

          <h4>Find mode</h4>
          <SelectBox changeHandler={this.handleFindModeChange} changeHandlerIsFrom="Findpage (find mode)" options={
            ["name","content"].map(function(item){
              return {
                value: item,
                display: item
              }
            })
          }/>

          {
            //find by content
            this.state.findMode === 'content' ? (
              <div>
                <h4>Sort by</h4>
                <SelectBox changeHandler={this.handleSortChange} changeHandlerIsFrom="Findpage (sort mode)" options={
                  ["relevance","alphabetical"].map(function(item){
                    return {
                      value: item,
                      display: item
                    }
                  })
                }/>
              </div>
            ) : null
          }


          <QueryResult mode={this.state.findMode} items={this.state.result}/>
        </div>
      </Pager.Item></Pager>
    );
  }
})

export default Findpage;