/**
 * Created by HP on 11/4/2016.
 */
var request = require('superagent');

var makeReq = function(req,itemName,component) {
  console.log('http://localhost:3001/' + req);
  request.get('http://localhost:3001/' + req)
  .end(function(error, res) {
    if (res) {
      var json = JSON.parse(res.text);
      localStorage.clear();
      localStorage.setItem(itemName, JSON.stringify(json));
      component.setState({});
    } else {
      console.log(error);
    }
  });
};

export default makeReq;