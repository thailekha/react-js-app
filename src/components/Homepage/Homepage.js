import React from 'react';
import logger from '../../utils/logger';
import ChartRenderer from '../reusable/ChartRenderer';
import InputTextBox from '../reusable/InputTextBox';


var Homepage = React.createClass({
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
              <InputTextBox header={"Create a new library"} placeholder={"Name"} submitHandler={this.props.libraryManager.create}/>
            </div>)
        }
      </div>
    );
  },
});

export {Homepage};