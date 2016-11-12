/**
 * Created by HP on 11/4/2016.
 */

var request = require('superagent');
var $ = require('jquery');
var _ = require('lodash');
var typify = require('typify');

//define library type
typify.type("library", function(lib) {
  return typeof lib.id === 'number'
    && lib.id >= 1
    && typeof lib.email === 'string'
    && typeof lib.name === 'string'
    && typeof lib.public === 'boolean'
    && Array.isArray(lib.paradigms)
    && Array.isArray(lib.programminglanguages)
    && Array.isArray(lib.havings)
});

//define programminglanguage type
typify.type("programminglanguage", function(pl) {
  return typeof pl.plid === 'number'
    && pl.plid >= 1
    && typeof pl.name === 'string'
    && typeof pl.details === 'string'
    && typeof pl.type === 'string'
});

//define paradigm type
typify.type("paradigm", function(pd) {
  return typeof pd.pdid === 'number'
    && pd.pdid >= 1
    && typeof pd.name === 'string'
    && typeof pd.details === 'string'
    && Array.isArray(pd.subparadigms)
});

//define having type
typify.type("having", function(hv) {
  return typeof hv.pdid === 'number'
  && typeof hv.plid === 'number'
  && hv.pdid >= 1
  && hv.plid >= 1
});

/*
*
* NOTICE: response from jquery HTTP is already parse to an object, don't parse again
*
* */

//statusCode
const U = {
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
  getLibrary: typify('getLibrary :: string -> * -> *',function(email,component) {
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "http://localhost:3001/libraries/?email=" + email,
      "method": "GET",
      "headers": {
        "cache-control": "no-cache"
      }
    }
    $.ajax(settings).done(function (response) {
      console.log(response);
      //response is an array of library objects
      typify.assert('(array library)',response);
      if(response.length == 1) {
        component.setState({
          library: response[0]
        });
      }
      else {
        console.log('Error: util/getLibrary() gets more than 1 libraries');
      }
    });
  }),
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
      "data": "{\"id\": " + id + ",\"email\": \"" + email + "\",\"name\": \"" + libName + "\",\"public\": true,\"paradigms\": [],\"programminglanguages\": [],\"Having\": []}"
    }

    $.ajax(settings).done(function(response) {
      console.log(response);
      console.log('util got response')
      console.log(typeof component);
      component.setState({library: JSON.parse(response)});
    });
  },
  updateLibrary: function(nLibrary, component) {
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "http://localhost:3001/libraries/" + nLibrary.id,
      "method": "PATCH",
      "headers": {
        "content-type": "application/json",
        "cache-control": "no-cache",
      },
      "processData": false,
      data: JSON.stringify(nLibrary)
    }

    $.ajax(settings).done(function(response) {
      console.log('update library');
      console.log(response);
      component.setState({library: response});
    });
  },
  deleteLibrary: function(id, component, callback) {
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "http://localhost:3001/libraries/" + id,
      "method": "DELETE",
      "headers": {
        "cache-control": "no-cache"
      }
    }

    $.ajax(settings).done(function(response) {
      console.log(response);
      console.log(response.statusCode);
      if (response.statusCode === 200) {
        // component.setState({
        //   library: undefined
        // });
        callback(component, response)
      }
    });
  }
}

const _API = {
  //This set of methods deal with the local library object then makes change to the library object on the server if needed
  getParadigm: typify('getParadigm :: library -> number -> paradigm', function(library, id) {
    console.log('_API/getParadigm()');
    var items = library['paradigms'];
    var result = null;
    var index = _.findIndex(items, function(item) {
      return item['pdid'] === id;
    });
    if (index !== -1) {
      result = items[index];
    }
    return result;
  }),
  getProgrammingLanguage: function(library, id) {
    console.log('_API/getProgrammingLanguage ');
    var items = library['programminglanguages'];
    var result = null;

    for (var i = 0; i < items.length; i++) {
      if (items[i]['plid'] + '' === id + '') {
        result = items[i];
      }
    }
    //for some reason lodash does not look at the last item of the array
    // var index = _.findIndex(items, function(item) {
    //   console.log(item);
    //   console.log('_API/getProgrammingLanguage -> item ' + item['name']);
    //   return item['plid'] + '' === id + '';
    // });
    // if (index !== -1) {
    //   result = items[index];
    // }
    return result;
  },
  getAllHavings: function(library) {
    return library['havings'];
  },
  getRelatedParadigms: function(library, programmingLanguageID) {
    var havings = this.getAllHavings(library);
    var relatedParadigms = [];
    for (var i = 0; i < havings.length; i++) {
      var having = havings[i];
      if (U.isDefined(having['plid']) && U.isDefined(having['pdid']) && having['plid'] === programmingLanguageID) {
        relatedParadigms.push(this.getParadigm(library, having['pdid']));
      }
    }
    return relatedParadigms;
  },
  getParadigmId: function(library, paradigmName) {
    console.log('_API/finding ID of paradigm' + paradigmName);
    var result = null;
    var items = library['paradigms'];
    //this is the index of the PD in the PDs array, not pdid
    var index = _.findIndex(items, function(item) {
      return item['name'].toLowerCase() === paradigmName.toLowerCase();
    });
    if (index !== -1) {
      result = items[index]['pdid'];
    }
    console.log('_API/result: ' + result);
    return result;
  },
  getNextProgrammingLanguageID: function(library) {
    //_.maxBy
    var maxIDStr = _.maxBy(library['programminglanguages'], function(item) {
      return item['plid'];
    })['plid'];
    console.log(maxIDStr);
    return parseInt(maxIDStr) + 1;
  },
  addProgrammingLanguage: function(library, name, details, type, paradigmIDs, component) {
    var nProgrammingLanguage = {
      name: name,
      details: details,
      type: type
    };
    var ID = this.getNextProgrammingLanguageID(library);
    nProgrammingLanguage['plid'] = ID;
    var Havings = [];
    paradigmIDs.forEach(function(pd) {
      Havings.push({
        "plid": ID,
        "pdid": pd
      });
    });

    var oldHavings = library['havings'];
    library['programminglanguages'].push(nProgrammingLanguage);
    library['havings'] = oldHavings.concat(Havings);
    U.updateLibrary(library, component)
  },
  deleteProgrammingLanguage: function(library, programmingLanguageID, component) {
    var identity = function(item) {
      if (typeof item['plid'] !== typeof programmingLanguageID)
        console.log('_API/deleting PL: unexpected types');
      return item['plid'] === programmingLanguageID;
    };

    //PLs
    var pls = library['programminglanguages'];
    var removedIDFromPls = _.remove(pls, identity);
    console.log('_API/removed from PLs: ' + removedIDFromPls);

    //Havings
    var havings = library['havings'];
    var removedIDFromHavings = _.remove(havings, identity);
    console.log('_API/removed from Havings: ' + removedIDFromHavings);

    //update library on server
    U.updateLibrary(library, component);
  }
}

export {U, _API};