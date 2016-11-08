/**
 * Created by HP on 11/4/2016.
 */
var request = require('superagent');
var $ = require('jquery');

//statusCode
const U = {
  makeReq: function(req, itemName, component, predicate) {
    console.log('http://localhost:3001/' + req);
    request.get('http://localhost:3001/' + req)
    .end(function(error, res) {
      if (res) {
        //console.log(res);
        var json = JSON.parse(res.text);
        //localStorage.clear();
        //cannot clear localStorage because session token will also be cleared => name the item uniquely
        if(predicate(json)) {
          localStorage.setItem(itemName, JSON.stringify(json));
          //console.log('makeReq: got response, doing setState');
          component.setState({});
        }
      } else {
        console.log(error);
      }
    });
  },
  isDefined: function(object) {
    return typeof object !== 'undefined';
  },
  createLibrary: function(email, libName, component) {
    request.get('http://localhost:3001/libraries')
    .end(function(error, res) {
      if (res) {
        //response will be an array of libraries, whose length will be used as the ID for the new library
        var newID = JSON.parse(res.text).length;
        console.log('util createing new lib, id: ' + newID);
        this.reqCreateLibrary(newID,email, libName, component);
      } else {
        console.log(error);
      }
    }.bind(this));
  },
  reqCreateLibrary: function(id, email, libName, component) {
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "http://localhost:3001/libraries",
      "method": "POST",
      "headers": {
        "content-type": "application/json",
        "cache-control": "no-cache"
      },
      "processData": false,
      "data": "{\"id\": " + id + ",\"email\": \"" + email + "\",\"name\": \"" + libName + "\",\"public\": true,\"Paradigms\": [],\"ProgrammingLanguages\": [],\"Having\": []}"
    }

    $.ajax(settings).done(function(response) {
      console.log(response);
      console.log('util got response')
      console.log(typeof component);
      component.setState({});
    });
  }
}

export default U;