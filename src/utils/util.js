/**
 * Created by HP on 11/4/2016.
 */

console.log('util.js');

var request = require('superagent');
var $ = require('jquery');
var _ = require('lodash');
var typify = require('typify');

//define library type
const defineLibraryAppDataTypes = function(typify) {
  typify.type("library", function(lib) {
    /**
     * for debug mode, do not delete
     */
    // console.log('Checking library type');
    // console.log('typeof lib.id === \'number\' ');
    // console.log(typeof lib.id === 'number');
    // console.log('lib.id >= 0');
    // console.log(lib.id >= 0);
    // console.log('typeof lib.email === \'string\' ');
    // console.log(typeof lib.email === 'string');
    // console.log('typeof lib.name === \'string\' ');
    // console.log(typeof lib.name === 'string');
    // console.log('typeof lib.public === \'boolean\' ');
    // console.log(typeof lib.public === 'boolean');
    // console.log('Array.isArray(lib.paradigms) ');
    // console.log(Array.isArray(lib.paradigms));
    // console.log('Array.isArray(lib.programminglanguages) ');
    // console.log(Array.isArray(lib.programminglanguages));
    // console.log('Array.isArray(lib.havings) ');
    // console.log(Array.isArray(lib.havings));

    return typeof lib.id === 'number'
      && lib.id >= 0
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
}

defineLibraryAppDataTypes(typify);

const VOID = -999; //used if a function being registered with typify does not return anything
typify.type('VOID', function(i) {
  return i === -999;
});

typify.type("textStatus", function(t) {
  return typeof t === 'string' && (
      t === "success"
      || t === "notmodified"
      || t === "nocontent"
      || t === "error"
      || t === "timeout"
      || t === "abort"
      || t === "parsererror"
    );
});

/*
 *
 * NOTICE: response from jquery HTTP is already parse to an object, don't parse again
 * response object of jquery ajax does not have statusCode
 * Refer to: http://api.jquery.com/jquery.ajax/
 * textStatus can be: "success", "notmodified", "nocontent", "error", "timeout", "abort", or "parsererror"
 *
 * bind => argument of surrounding function is also in scope
 * */

const doTypeCheck = typify('doTypeCheck :: string -> * -> string -> function -> function | null -> *',
  function(type, object, catchMessage, successCallback, finallyCallback) {
    try {
      typify.assert(type, object);
      successCallback(object);
    }
    catch (err) {
      console.warn(err);
      console.log(object);
      console.warn(catchMessage);
    }
    finally {
      if (finallyCallback) {
        finallyCallback(object);
      }
    }
  }
);

const getNewLibraryObjectInString = typify('getNewLibraryObjectInString :: number -> string -> string -> string', function(id, email, libName) {
  return JSON.stringify({
    id: id,
    email: email,
    name: libName,
    public: true,
    paradigms: [],
    programminglanguages: [],
    havings: []
  });
});

var U = {
  isDefined: typify('isDefined :: * -> boolean', function(object) {
    return typeof object !== 'undefined';
  }),
  getLibrary: typify('getLibrary :: string -> * -> *', function(email, component) {
    console.log('getLibrary()');
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "http://localhost:3001/libraries/?email=" + email,
      "method": "GET",
      "headers": {
        "cache-control": "no-cache"
      }
    }
    $.ajax(settings).done(function(response, textStatus) {
      console.log('getLibrary()/response');
      //validate textStatus
      if (typify.check('textStatus', textStatus) && textStatus === 'success') {
        //validate response
        doTypeCheck('(array library)', response, 'IS NOT array of library objects', function(validResponse) {
          //component is visible when binded carefully
          if (validResponse.length >= 0 && validResponse.length <= 1) {
            component.setState({
              library: validResponse[0]
            });
          }
          else {
            console.log('Error: util/getLibrary() gets more than 1 libraries');
          }
        }.bind(this), null);
      }
    }.bind(this));

  }),
  createLibrary: typify('createLibrary :: string -> string -> * -> *', function(email, libName, component) {
    request.get('http://localhost:3001/libraries')
    .end(function(error, res) {
      if (res) {
        //response will be an array of libraries, whose length will be used as the ID for the new library
        var libraries = JSON.parse(res.text);
        typify.assert('array library', libraries)
        var newID = libraries.length;
        this.reqCreateLibrary(newID, email, libName, component);
      } else {
        console.log(error);
      }
    }.bind(this));
  }),
  reqCreateLibrary: typify('reqCreateLibrary :: number -> string -> string -> * -> *', function(id, email, libName, component) {
    console.log('reqCreateLibrary()');
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
      "data": getNewLibraryObjectInString(id, email, libName)
    }

    $.ajax(settings).done(function(response, textStatus) {
      console.log('reqCreateLibrary()/response');
      //validate textStatus
      if (typify.check('textStatus', textStatus) && textStatus === 'success') {
        //validate response
        doTypeCheck('library', response, 'IS NOT library',
          function(validResponse) {
            component.setState({library: validResponse});
          }.bind(this),
          function(invalidRespone) {
            //component is set to null since setState isn't needed
            this.deleteLibrary(invalidRespone.id, null, function(component, response) {
              //component is null here
              console.log('Invalid library deleted');
            });
          });
        //
      }
    }.bind(this));
  }),
  updateLibrary: typify('updateLibrary :: library -> * -> function -> *', function(nLibrary, component, callback) {
    console.log('updateLibrary()');
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

    $.ajax(settings).done(function(response, textStatus) {
      console.log('updateLibrary()/response');
      //validate textStatus
      if (typify.check('textStatus', textStatus) && textStatus === 'success') {
        //validate response
        //type, object, catchMessage, successCallback, finallyCallback
        doTypeCheck('library', response, 'IS NOT library object',
          function(validResponse) {
            callback(component, validResponse);
          }.bind(this), null);
      }
    }.bind(this));
  }),
  //component can be null in case setState is not needed
  deleteLibrary: typify('deleteLibrary :: number -> * -> function -> *', function(id, component, callback) {
    console.log('deleteLibrary()');
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "http://localhost:3001/libraries/" + id,
      "method": "DELETE",
      "headers": {
        "cache-control": "no-cache"
      }
    }
    $.ajax(settings).done(function(response, textStatus) {
      console.log('deleteLibrary()/response');
      if (typify.check('textStatus', textStatus) && textStatus === 'success') {
        // component.setState({
        //   library: undefined
        // });
        callback(component, response)
      }
    });
  })
}

const _API = {
  //This set of methods deal with the local library object then makes change to the library object on the server if needed
  getNextProgrammingLanguageID: typify('getNextProgrammingLanguageID :: library -> number', function(library) {
    console.log('_API/getNextProgrammingLanguageID(' + library + ')');
    //_.maxBy
    //TODO : ldoash returns undefined if the given array is empty
    if (library['programminglanguages'].length > 0) {
      var maxID = _.maxBy(library['programminglanguages'], function(item) {
        return item['plid'];
      })['plid'];
      return maxID + 1;
    }
    return 1;
  }),
  getProgrammingLanguage: typify('getProgrammingLanguage :: library -> number -> programminglanguage | null', function(library, id) {
    console.log('_API/getProgrammingLanguage(' + library + ',' + id + ')');
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
  }),
  //nothing is returned so -> *
  addProgrammingLanguage: typify('addProgrammingLanguage :: library -> string -> string -> string -> (array number) -> * -> *',
    function(library, name, details, type, paradigmIDs, component) {
      console.log('_API/addProgrammingLanguage(' + library + ' ,' +
        name + ' ,' + details + ' ,' + type + ' ,' + paradigmIDs + ' ,' + component + ')');
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
      U.updateLibrary(library, component, function(component, validResponse) {
        component.setState({library: validResponse});
      })
    }),
  deleteProgrammingLanguage: typify('deleteProgrammingLanguage :: library -> number -> * -> *', function(library, programmingLanguageID, component) {
    console.log('_API/deleteProgrammingLanguage(' + library + ' ,' + programmingLanguageID + ' ,' + component);
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
    U.updateLibrary(library, component, function(component, validResponse) {
      component.context.router.replace({pathname: '/browse'});
      component.setState({library: validResponse});
    });
  }),
  getRelatedParadigms: typify('getRelatedParadigms :: library -> number -> (array paradigm)', function(library, programmingLanguageID) {
    console.log('_API/getRelatedParadigms(' + library + ',' + programmingLanguageID + ')');
    var havings = library['havings'];
    var relatedParadigms = [];
    for (var i = 0; i < havings.length; i++) {
      var having = havings[i];
      if (U.isDefined(having['plid']) && U.isDefined(having['pdid']) && having['plid'] === programmingLanguageID) {
        relatedParadigms.push(this.getParadigm(library, having['pdid']));
      }
    }
    return relatedParadigms;
  }),
  getNextParadigmID: typify('getNextParadigmID :: library -> number', function(library) {
    console.log('_API/getNextParadigmID(' + library + ')');
    //_.maxBy
    //TODO : ldoash returns undefined if the given array is empty
    if (library['paradigms'].length > 0) {
      var maxID = _.maxBy(library['paradigms'], function(item) {
        return item['pdid'];
      })['pdid'];
      return maxID + 1;
    }
    return 1;
  }),
  getParadigm: typify('getParadigm :: library -> number -> paradigm | null', function(library, id) {
    console.log('_API/getParadigm(' + library + ',' + id + ')');
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
  getParadigmID: typify('getParadigmID :: library -> string -> number | null', function(library, paradigmName) {
    console.log('_API/getParadigmId(' + library + ',' + paradigmName + ')');
    var result = null;
    var items = library['paradigms'];
    //this is the index of the PD in the PDs array, not pdid
    var index = _.findIndex(items, function(item) {
      return item['name'].toLowerCase() === paradigmName.toLowerCase();
    });
    if (index !== -1) {
      result = items[index]['pdid'];
    }
    return result;
  }),
  addParadigm: typify('addParadigm :: library -> string -> string -> (array number) -> * -> *',
    function(library, name, details, subparadigms, component) {
      console.log('_API/addParadigm(' + library + ',' + name + ',' + details + ',' + subparadigms + ',' + component + ')');
      var nParadigm = {
        pdid: this.getNextParadigmID(library),
        name: name,
        details: details,
        subparadigms: subparadigms
      }

      library['paradigms'].push(nParadigm);
      U.updateLibrary(library, component, function(component, validResponse) {
        component.setState({library: validResponse});
      })
    })
}

export {U, _API, defineLibraryAppDataTypes};