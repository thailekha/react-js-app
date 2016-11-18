import React from 'react';
import logger from '../../utils/logger';
import SubNavigationBar from './SubNavigationBar';
import {Row,Col} from 'react-bootstrap';

var BrowsepageContainer = React.createClass({
  render: function() {
    logger.reportRender('BrowsepageContainer');
    let children = null;
    var programmingLanguages = [];
    var paradigms = [];
    if (this.props.children) {
      console.log('Browsepage Cloning children');

      var libraryManager = this.props.libraryManager;

      if (libraryManager.libraryIsAvailable) {
        programmingLanguages = libraryManager.getAttr('programminglanguages');
        paradigms = libraryManager.getAttr('paradigms');
      }

      children = React.cloneElement(this.props.children, {
        //Must clone children to pass arguments to them
        libraryManager: libraryManager,
        boxmode: this.props.children.props.route.sendToChildren
      });
    }
    else {
      console.warn('BrowsepageContainer no children');
    }
    return (
      <div>
        <Row className="show-grid">
          <Col md={1}>
            <SubNavigationBar subNavigationItems={programmingLanguages.concat(paradigms)}/>
          </Col>
          <Col md={8} mdOffset={3}>
          {children}
          </Col>
        </Row>
      </div>
    );
  },
});

export default BrowsepageContainer;
