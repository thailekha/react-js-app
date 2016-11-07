/**
 * Created by HP on 11/4/2016.
 */
var request = require('superagent');
//statusCode
const U = {
  makeReq: function(req, itemName, component) {
    console.log('http://localhost:3001/' + req);
    request.get('http://localhost:3001/' + req)
    .end(function(error, res) {
      if (res) {
        console.log(res);
        var json = JSON.parse(res.text);
        localStorage.clear();
        localStorage.setItem(itemName, JSON.stringify(json));
        console.log('makeReq: got response, doing setState');
        component.setState({});
      } else {
        console.log('***************************')
        console.log(error);
      }
    });
  },
  isDefined: function(object) {
    return typeof object !== 'undefined';
  }
}

export default U;