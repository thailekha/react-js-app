import React from 'react';
import logger from '../../utils/logger';
import ChartRenderer from './ChartRenderer';
import CreateBox from './CreateBox';


var Homepage = React.createClass({
  /* ... options and lifecycle methods ... */
  // shouldComponentUpdate: function(nextProps,nextState){
  //   //This component only needs the libraryManager
  //   return !_.isEqual(this.props.libraryManager, nextProps.libraryManager) || this.state.view !== nextState.view;
  // },
  componentDidMount: function() {
    if (this.props.libraryManager) {
      console.log('Homepage/reload');
      this.props.libraryManager.setLibraryHandler();
    }
  },
  render: function() {
    logger.reportRender('Homepage');
    console.warn('Homepage');
    return (
      <div className="homepage">
        {

          (this.props.libraryManager && this.props.libraryManager.libraryIsAvailable) ?
            //If library is available
            (<div>
              <h3>{this.props.libraryManager.getAttr('name')}</h3>
              <ChartRenderer libraryManager={this.props.libraryManager}/>
            </div>) :

            //If library is not available
            (<div>
              <h3>Welcome</h3>
              <CreateBox createHandler={this.props.libraryManager.create}/>
            </div>)
        }
      </div>
    );
  },
});

export {Homepage, CreateBox};