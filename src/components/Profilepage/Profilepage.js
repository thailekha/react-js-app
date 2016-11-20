import React from 'react';
import logger from '../../utils/logger';
import InputTextBox from '../reusable/InputTextBox';
import SelectBox from '../reusable/SelectBox';
import Deleter from './Deleter';
import {Row, Col} from 'react-bootstrap';

var Profilepage = React.createClass({
  render: function() {
    logger.reportRender('Profilepage');

    if (!(this.props.libraryManager && this.props.libraryManager.libraryIsAvailable))
      return (<h3>Library not found</h3>);

    var statuses = this.props.libraryManager.getAttr("public") ? ["public", "private"] : ["private", "public"];
    return (
      <Row className="show-grid">
        <Col md={5}>
          <h3>Email: {this.props.userProfile.email}</h3>
          <InputTextBox header={"Change library's name (" + this.props.libraryManager.getAttr('name') + ")"}
                        placeholder={"name"}
                        submitHandler={this.props.libraryManager.changeLibName}/>
        </Col>
        <Col md={3}>
          <h3>Change library mode</h3>
          <SelectBox changeHandler={this.props.libraryManager.changeLibMode} changeHandlerIsFrom={"Profilepage"}
                     options={statuses.map(function(option) {
                       return {
                         value: option,
                         display: option
                       }
                     })}/>

          <Deleter libraryManager={this.props.libraryManager}/>
        </Col>
      </Row>
    );
  },
})

export default Profilepage;