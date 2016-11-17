import React from 'react';
import logger from '../utils/logger';
import InputTextBox from './reusable/InputTextBox';
import SelectBox from './reusable/SelectBox';

//https://auth0.com/docs/quickstart/spa/react/04-user-profile
var Profilepage = React.createClass({
  render: function() {
    logger.reportRender('Profilepage');
    return (
      <div>
        <h3>Email: {this.props.userProfile.email}</h3>
        <InputTextBox header={"Change library's name"} placeholder={"name"}
                      submitHandler={this.props.libraryManager.changeLibName}/>

        <h5>Change library mode</h5>
        <SelectBox changeHandler={this.props.libraryManager.changeLibMode} changeHandlerIsFrom={"Profilepage"}
                   options={["public", "private"].map(function(option) {
                     return {
                       value: option,
                       display: option
                     }
                   })}/>

      </div>
    );
  },
})

export default Profilepage;