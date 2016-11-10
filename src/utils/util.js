/**
 * Created by HP on 11/4/2016.
 */
var request = require('superagent');
var $ = require('jquery');

//statusCode
const U = {
  makeReq: function(req, component, toDoWithRes, saveToLocalstorage = undefined, itemName = undefined) {
    console.log('http://localhost:3001/' + req);
    request.get('http://localhost:3001/' + req)
    .end(function(error, res) {
      if (res) {
        //console.log(res);
        var json = JSON.parse(res.text);
        //localStorage.clear();
        //cannot clear localStorage because session token will also be cleared => name the item uniquely
        if (saveToLocalstorage && itemName)
          localStorage.setItem(itemName, JSON.stringify(json));

        toDoWithRes(component,json);
      } else {
        console.log(error);
      }
    });
  },
  isDefined: function(object) {
    return typeof object !== 'undefined';
  },
  propertiesNumberToString: function(object, properties) {
    for (var i = 0; i < properties.length; i++) {
      if (this.isDefined(object[properties[i]]) && typeof object[properties[i]] === 'number') {
        object[properties[i]] += '';
      }
    }
  },
  createLibrary: function(email, libName, component) {
    request.get('http://localhost:3001/libraries')
    .end(function(error, res) {
      if (res) {
        //response will be an array of libraries, whose length will be used as the ID for the new library
        var newID = JSON.parse(res.text).length;
        console.log('util createing new lib, id: ' + newID);
        this.reqCreateLibrary(newID, email, libName, component);
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
  },
  deleteLibrary: function(id, component) {
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "http://localhost:3001/libraries/" + id,
      "method": "DELETE",
      "headers": {
        "content-type": "application/json",
        "cache-control": "no-cache"
      }
    }

    $.ajax(settings).done(function (response) {
      console.log(response);
      console.log(response.statusCode);
      if(response.statusCode === 200) {
        component.setState({

        });
      }
    });
  }
}

const _API = {
  getParadigm: function(items, id) {
    var result = null;
    var index = _.findIndex(items, function(item) {
      return item['pd-id'] === id;
    });
    if (index !== -1) {
      result = items[index];
    }
    return result;
  },
  getProgrammingLanguage: function(items, id) {
    var result = null;
    var index = _.findIndex(items, function(item) {
      return item['pl-id'] === id;
    });
    if (index !== -1) {
      result = items[index];
    }
    return result;
  },
  getAllHavings: function(library) {
    return library['Having'];
  },
  getRelatedParadigms: function(library,programmingLanguageID) {
    var havings = this.getAllHavings(library);
    var relatedParadigms = [];
    for(var i = 0; i < havings.length; i++) {
      var having = havings[i];
      if(U.isDefined(having['pl-id']) && U.isDefined(having['pd-id']) && having['pl-id'] === programmingLanguageID) {
        relatedParadigms.push(this.getParadigm(library['Paradigms'],having['pd-id']));
      }
    }
    return relatedParadigms;
  },
  getParadigmId: function(library,paradigmName) {
    var result = null;
    var items = library['Paradigms'];
    var index = _.findIndex(items, function(item) {
      return item['name'].toLowerCase() === paradigmName.toLowerCase();
    });
    if (index !== -1) {
      result = items[index];
    }
    return result;
  },
  getNextProgrammingLanguageID: function(library) {
    //_.maxBy
    var maxIDStr = _.maxBy(library['ProgrammingLanguages'], function(item) {
      return item['pl-id'];
    })['pl-id'];
    console.log(maxIDStr);
    return parseInt(maxIDStr) + 1;
  },
  addProgrammingLanguage: function(library,name,details,type,paradigms) {
    var ID = this.getNextProgrammingLanguageID(library);

  }
}

export {U, _API};