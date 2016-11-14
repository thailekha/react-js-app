import React from 'react';
import logger from '../../utils/logger';
import SubNavigationBar from './SubNavigationBar';
import {Row,Col} from 'react-bootstrap';

//TODO: fix " == undefined" to 'typeof ...'

//for running mocha tests (see npm dom-storage)
// if(typeof localStorage === 'undefined') {
//   var Storage = require('dom-storage');
//   var localStorage = new Storage('./db.json', { strict: false, ws: '  ' });
// }

//must use componentDidMount, otherwise infinite loop (component is re-rendered when request comes back, re-rendering fires another req)
var BrowsepageContainer = React.createClass({
  render: function() {
    logger.reportRender('BrowsepageContainer');
    let children = null;
    if (this.props.children) {
      console.log('Browsepage Cloning children');

      var libraryManager = this.props.libraryManager;

      var programmingLanguages = [];
      var paradigms = [];
      if (libraryManager.available) {
        programmingLanguages = libraryManager.getAttr('programminglanguages');
        paradigms = libraryManager.getAttr('paradigms');

      }
      //console.log(programmingLanguages.concat(paradigms));
      //var items = this.props.children.props.route.sendToChildren === 'pl' ? programmingLanguages : paradigms;
      children = React.cloneElement(this.props.children, {
        //Must clone children to pass arguments to them
        libraryManager: libraryManager,
        boxmode: this.props.children.props.route.sendToChildren
      })
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
          <Col md={8} mdOffset={2}>
          {children}
          </Col>
        </Row>
      </div>
    );
  },
});

export default BrowsepageContainer;
