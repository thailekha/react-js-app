/**
 * Utilities methods for the app, almost all methods are registered with typify to enforce type safety
 */
var $ = require('jquery');
var _ = require('lodash');
var typify = require('typify');

const LETTERS_AND_NUMBERS = 'abcdefghijklmnopqrstuvwxyz0123456789';
const URL_PREFIX = 'http://localhost:3001';

/**
 * Helper method to register typical types of the app with typify, they are:
 * -library
 * -programminglanguage
 * -paradigm
 * -having
 * -queryresult
 * @param typify
 */
const defineLibraryAppDataTypes = function(typify) {
  typify.type("library", function(lib) {

    if (typeof lib === 'undefined' || lib === null)
      return false;

    /**
     * for debug purpose, do not delete
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

    if (typeof pl === 'undefined' || pl === null)
      return false;

    return typeof pl.plid === 'number'
      && pl.plid >= 1
      && typeof pl.name === 'string'
      && typeof pl.details === 'string'
      && typeof pl.type === 'string'
  });

//define paradigm type
  typify.type("paradigm", function(pd) {

    if (typeof pd === 'undefined' || pd === null)
      return false;

    return typeof pd.pdid === 'number'
      && pd.pdid >= 1
      && typeof pd.name === 'string'
      && typeof pd.details === 'string'
      && Array.isArray(pd.subparadigms)
  });

//define having type
  typify.type("having", function(hv) {

    if (typeof hv === 'undefined' || hv === null)
      return false;

    return typeof hv.pdid === 'number'
      && typeof hv.plid === 'number'
      && hv.pdid >= 1
      && hv.plid >= 1
  });

  //this must be defined after programminglanguage and paradigm has been defined
  typify.type("queryresult", function(q) {
    // _API.search methods either returns an array of this type or an array of programminglanguage/paradigm
    if (typeof q === 'undefined' || q === null)
      return false;

    return (typify.check('programminglanguage', q.foundItem) || typify.check('paradigm', q.foundItem))
      && typeof q.rank === 'number';
  });
}

defineLibraryAppDataTypes(typify);

const VOID = -999; //used if a function being registered with typify does not return anything
//register it with typify
typify.type('VOID', function(i) {
  return i === -999;
});

/**
 * -response from jquery HTTP is already parse to an object i.e. no need to  do JSON.parse
 * -response object of jquery ajax does not have statusCode (Refer to: http://api.jquery.com/jquery.ajax/)
 * -response object is a string that can be: "success", "notmodified", "nocontent", "error", "timeout", "abort", or "parsererror"
 * -this is registered with typify and called a textStatus object
 * */
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

/**
 * Helper method to generate a default library object
 * Arguments:
 * -id of the library
 * -email of user
 * -library name
 * Return:
 * -library object
 */
const getNewLibraryObjectInString = typify('getNewLibraryObjectInString :: number -> string -> string -> string',
  function(id, email, libName) {
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

/**
 * A helper method to filter a string, only keeps alphabetical symbols,
 * make them lower case, and return as an array
 * @param str
 * @returns {Array}
 */
const textToLowerCaseAlphanumericArray = function(str) {
  //str will be turned to lower case
  //filter symbols that are not either letters, numbers or space
  var result = _.filter(str.toLowerCase().split(''), function(w) {
    return LETTERS_AND_NUMBERS.includes(w) || w === ' ';
  });
  //join and split again, this time by space, notice that '  '.split(' ') gives ['','','']
  result = _.filter(result.join('').split(' '), function(w) {
    return w !== "";
  });
  return result;
}

/**
 * A helper method to check if an object is defined i.e. not of type undefined
 */
const isDefined =  typify('isDefined :: * -> boolean', function(object) {
  return typeof object !== 'undefined';
});

/**
 * Helper method to do type checking on an object
 * Arguments:
 * -the type the object expected to be (string)
 * -the objecte to be checked
 * -callback that will be called if the object pass the type check
 * -callback that will be called if the object does not pass the type check
 * -the message to print if the object does not match the provided type
 */
const doTypeCheck = typify('doTypeCheck :: string -> * -> string -> function -> function | null -> *',
  function(type, object, catchMessage, successCallback, finallyCallback) {
    try {
      typify.assert(type, object);
      successCallback(object);
    }
    catch (err) {
      console.error(err);
      console.error(object);
      console.error(catchMessage);
      if (finallyCallback) {
        finallyCallback(object);
      }
    }
  }
);

/**
 * This object contains methods to interact with the JSON-server, implemented with Jquery and typically for this app
 * {getAllLibraries: *, getLibrary: *, createLibrary: *, reqCreateLibrary: *, updateLibrary: *, deleteLibrary: *}
 */
const U = {
  getAllLibraries: typify('getLibrary :: * -> *', function(component) {
    //console.log('getAllLibraries()');
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": URL_PREFIX + "/libraries",
      "method": "GET",
      "headers": {
        "cache-control": "no-cache",
      }
    }

    $.ajax(settings).done(function(response) {
      //type, object, catchMessage, successCallback, finallyCallback
      doTypeCheck('(array library)', response, 'NOT an array of library objects',
        function(validResponse) {
          component.setState({
            libraries: validResponse
          });
        }, null);
    });
  }),
  getLibrary: typify('getLibrary :: string -> * -> *', function(email, component) {
    console.log('getLibrary()');
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": URL_PREFIX + "/libraries/?email=" + email,
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
        }, null);
      }
    }.bind(this));

  }),
  //this method is a preparation step prior to reqCreateLibrary below, it decides the id for the new library object
  createLibrary: typify('createLibrary :: string -> string -> * -> *', function(email, libName, component) {
    console.log('createLibrary()');
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": URL_PREFIX + "/libraries",
      "method": "GET",
      "headers": {
        "cache-control": "no-cache",
      }
    }

    $.ajax(settings).done(function (response,textStatus) {
      console.log('createLibrary()/response');
      //response will be an array of libraries, whose length will be used as the ID for the new library
      //validate textStatus
      if (typify.check('textStatus', textStatus) && textStatus === 'success') {
        //validate response
        doTypeCheck('(array library)', response, 'IS NOT array of library objects',
          function(validResponse) {
            var libraryID = validResponse.length;
            this.reqCreateLibrary(libraryID, email, libName, component);
          }.bind(this),null);
      }
    }.bind(this));
  }),
  reqCreateLibrary: typify('reqCreateLibrary :: number -> string -> string -> * -> *', function(id, email, libName, component) {
    console.log('reqCreateLibrary()');
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": URL_PREFIX + "/libraries",
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
          },
          function(invalidRespone) {
            //component is set to null since setState isn't needed
            this.deleteLibrary(invalidRespone.id, null, function(component, response) {
              //component is null here
              console.log('Invalid library deleted');
            });
          }.bind(this));
      }
    }.bind(this));
  }),
  updateLibrary: typify('updateLibrary :: library -> * -> function -> *', function(nLibrary, component, callback) {
    //console.log('updateLibrary()');
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": URL_PREFIX + "/libraries/" + nLibrary.id,
      "method": "PATCH",
      "headers": {
        "content-type": "application/json",
        "cache-control": "no-cache",
      },
      "processData": false,
      data: JSON.stringify(nLibrary)
    }

    $.ajax(settings).done(function(response, textStatus) {
      //console.log('updateLibrary()/response');
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
      "url": URL_PREFIX + "/libraries/" + id,
      "method": "DELETE",
      "headers": {
        "cache-control": "no-cache"
      }
    }
    $.ajax(settings).done(function(response, textStatus) {
      console.log('deleteLibrary()/response');
      if (typify.check('textStatus', textStatus) && textStatus === 'success') {
        callback(component, response)
      }
    });
  })
}

/**
 * This object contains methods to manipulate the library object, it is based heavily on lodash
 * Include: getNextProgrammingLanguageID, getProgrammingLanguage, addProgrammingLanguage, editProgrammingLanguage,
 * deleteProgrammingLanguage, getRelatedParadigms, getNextParadigmID, getParadigm, getParadigmID, addParadigm,
 * editParadigm, deleteParadigm, search
 */
const _API = {
  //This set of methods deal with the local library object then makes change to the library object on the server if needed
  getNextProgrammingLanguageID: typify('getNextProgrammingLanguageID :: library -> number', function(library) {
    console.log('_API/getNextProgrammingLanguageID(' + library + ')');
    //get the programming language item with the maximum id, the new item to be created will have that id + 1
    //notice that lodash returns undefined if the given array is empty
    if (library['programminglanguages'].length > 0) {
      var maxID = _.maxBy(library['programminglanguages'], function(item) {
        return item['plid'];
      })['plid'];
      return maxID + 1;
    }
    return 1;
  }),
  getProgrammingLanguage: typify('getProgrammingLanguage :: library -> number -> programminglanguage | null', function(library, id) {
    //console.log('_API/getProgrammingLanguage(' + library + ',' + id + ')');
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
  addProgrammingLanguage: typify('addProgrammingLanguage :: library -> string -> string -> string -> (array number) -> * -> *',
    function(library, name, details, type, paradigmIDs, component) {
      console.log('_API/addProgrammingLanguage(' + library + ' ,' +
        name + ' ,' + details + ' ,' + type + ' ,' + paradigmIDs + ' ,' + component + ')');

      var duplicateItems = this.findItemsHavingSameName(library,name);
      if(duplicateItems.length > 0) {
        alert('Error: There is already an item called ' + name);
        return;
      }

      //construct the new programming language item
      var nProgrammingLanguage = {
        name: name,
        details: details,
        type: type
      };

      //decide an id for this item
      var ID = this.getNextProgrammingLanguageID(library);
      nProgrammingLanguage['plid'] = ID;

      //from the specified related paradigms, create an array of Having items, these represent
      // the relationship between the new programming language and paradigms
      var Havings = [];
      paradigmIDs.forEach(function(pd) {
        Havings.push({
          "plid": ID,
          "pdid": pd
        });
      });

      //put the new programming language into the library
      library['programminglanguages'].push(nProgrammingLanguage);

      //merge the new Having items with the current ones
      var oldHavings = library['havings'];
      library['havings'] = oldHavings.concat(Havings);

      //update library object
      U.updateLibrary(library, component, function(component, validResponse) {
        component.setState({library: validResponse});
      })
    }),
  editProgrammingLanguage: typify('editProgrammingLanguage :: library -> number -> string -> string -> string -> (array number) -> * -> *',
    function(library, plid, name, details, type, paradigmIDs, component) {
      console.log('_API/editProgrammingLanguage(' + library + ' ,' +
        name + ' ,' + plid + ',' + details + ' ,' + type + ' ,' + paradigmIDs + ' ,' + component + ')');

      //-duplicateItems should be 0 to continue in case user makes an item having unduplicated name then
      // changes it to having duplicated name with another item
      // -if it is 1 and the duplicate item's id must be === the item-to-be-updated's id i.e. the same item
      var duplicateItems = this.findItemsHavingSameName(library,name);
      var canContinue = duplicateItems.length === 0 ||
        (duplicateItems.length === 1 && duplicateItems[0].plid && duplicateItems[0].plid === plid);

      if(!canContinue) {
        //in case user create a non-duplicate item then edit the item to have duplicate name
        alert('Error: There is already an item called ' + name);
        return;
      }

      //construct the update programming language item
      var nProgrammingLanguage = {
        plid: plid,
        name: name,
        details: details,
        type: type
      };

      //merge the specifed Having items with the current ones in library, make sure there is no duplicate
      var havings = [];
      library['havings'].forEach(function(having) {
        //get all havings that are not to do with this pl first
        if (having.plid !== plid) {
          havings.push(having);
        }
      });
      paradigmIDs.forEach(function(pdid) {
        havings.push({
          plid: plid,
          pdid: pdid
        });
      });
      library['havings'] = havings;

      //retrieve the index in the programming languages array within library object,
      // which will be updated with the updated programming language item
      var plIndex = null;
      library['programminglanguages'].forEach(function(pl, index) {
        if (pl.plid === plid) {
          plIndex = index
        }
      });
      library['programminglanguages'][plIndex] = nProgrammingLanguage;

      U.updateLibrary(library, component, function(component, validResponse) {
        component.context.router.replace({pathname: '/browse/pl/' + plid});
        component.setState({library: validResponse});
      })
    }),
  deleteProgrammingLanguage: typify('deleteProgrammingLanguage :: library -> number -> * -> *', function(library, programmingLanguageID, component) {
    console.log('_API/deleteProgrammingLanguage(' + library + ' ,' + programmingLanguageID + ' ,' + component);

    //to be passed to lodash
    var identity = function(item) {
      if (typeof item['plid'] !== typeof programmingLanguageID)
        console.log('_API/deleting PL: unexpected types');
      return item['plid'] === programmingLanguageID;
    };

    //remove programming language item
    console.log('_API/removed from PLs: ' + _.remove(library['programminglanguages'], identity));

    //remove any related Having item
    console.log('_API/removed from Havings: ' + _.remove(library['havings'], identity));

    U.updateLibrary(library, component, function(component, validResponse) {
      //user is redirected to browsepage after deleting a programming language item
      component.context.router.replace({pathname: '/browse'});
      component.setState({library: validResponse});
    });
  }),
  getRelatedParadigms: typify('getRelatedParadigms :: library -> number -> (array paradigm)', function(library, programmingLanguageID) {
    //console.log('_API/getRelatedParadigms(' + library + ',' + programmingLanguageID + ')');
    //get paradigms that a programming language belong to
    var havings = library['havings'];
    var relatedParadigms = [];
    for (var i = 0; i < havings.length; i++) {
      var having = havings[i];
      if (isDefined(having['plid']) && isDefined(having['pdid']) && having['plid'] === programmingLanguageID) {
        relatedParadigms.push(this.getParadigm(library, having['pdid']));
      }
    }
    return relatedParadigms;
  }),
  getNextParadigmID: typify('getNextParadigmID :: library -> number', function(library) {
    console.log('_API/getNextParadigmID(' + library + ')');
    //find the paradigm item having the maximum id, id of the new paradigm will be that + 1
    if (library['paradigms'].length > 0) {
      var maxID = _.maxBy(library['paradigms'], function(item) {
        return item['pdid'];
      })['pdid'];
      return maxID + 1;
    }
    return 1;
  }),
  getParadigm: typify('getParadigm :: library -> number -> paradigm | null', function(library, id) {
    //console.log('_API/getParadigm(' + library + ',' + id + ')');
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
    //console.log('_API/getParadigmId(' + library + ',' + paradigmName + ')');
    //retrieve paradigm ID from paradigm's name
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

      var duplicateItems = this.findItemsHavingSameName(library,name);
      if(duplicateItems.length > 0) {
        alert('Error: There is already an item called ' + name);
        return;
      }

      //construct the new paradigm item
      var nParadigm = {
        pdid: this.getNextParadigmID(library),
        name: name,
        details: details,
        subparadigms: subparadigms
      }
      //add to library
      library['paradigms'].push(nParadigm);
      //update library
      U.updateLibrary(library, component, function(component, validResponse) {
        component.setState({library: validResponse});
      })
    }),
  editParadigm: typify('editParadigm :: library -> number -> string -> string -> (array number) -> * -> *',
    function(library, pdid, name, details, subParadigmIDs, component) {
      console.log('_API/editParadigm(' + library + ' ,' + name + ' ,'
        + pdid + ',' + details + ' ,' + subParadigmIDs + ' ,' + component + ')');

      //-duplicateItems should be 0 to continue in case user makes an item having unduplicated name then
      // changes it to having duplicated name with another item
      // -if it is 1 and the duplicate item's id must be === the item-to-be-updated's id i.e. the same item
      var duplicateItems = this.findItemsHavingSameName(library,name);
      var canContinue = duplicateItems.length === 0 ||
        (duplicateItems.length === 1 && duplicateItems[0].pdid && duplicateItems[0].pdid === pdid);

      if(!canContinue) {
        //in case user create a non-duplicate item then edit the item to have duplicate name
        alert('Error: There is already an item called ' + name);
        alert(duplicateItems.length);
        duplicateItems.forEach(function(d) {
          alert(d.name);
        });
        return;
      }

      //construct the updated paradigm item
      var nParadigm = {
        pdid: pdid,
        name: name,
        details: details,
        subparadigms: subParadigmIDs
      };

      //retrieve its index within the array of paradigms
      var pdIndex = null;
      library['paradigms'].forEach(function(pd, index) {
        if (pd.pdid === pdid) {
          pdIndex = index
        }
      });

      //update the index with the updated paradigm item
      library['paradigms'][pdIndex] = nParadigm;

      //update the library
      U.updateLibrary(library, component, function(component, validResponse) {
        component.context.router.replace({pathname: '/browse/pd/' + pdid});
        component.setState({library: validResponse});
      })
    }),
  deleteParadigm: typify('deleteParadigm :: library -> number -> * -> *', function(library, paradigmID, component) {
    console.log('_API/deleteParadigm(' + library + ' ,' + paradigmID + ' ,' + component);

    //to be passed to lodash
    var identity = function(item) {
      if (typeof item['pdid'] !== typeof paradigmID)
        console.log('_API/deleting PD: unexpected types');
      //console.log('#' + item['pdid'] + ' === ' + paradigmID + ' ? ' + item['pdid'] === paradigmID);
      return item['pdid'] === paradigmID;
    };

    //remove the paradigm
    console.log('_API/removed from PDs: ' + _.remove(library['paradigms'], identity));

    //remove related Having items
    console.log('_API/removed from Havings: ' + _.remove(library['havings'], identity));

    //each paradigm also has an array of subparadigm, remove from this array too
    library['paradigms'].forEach(function(paradigm) {
      _.remove(paradigm.subparadigms,function(id) {
        return id === paradigmID;
      });
    });

    //update library on server
    U.updateLibrary(library, component, function(component, validResponse) {
      //redirect user to browsepage
      component.context.router.replace({pathname: '/browse'});
      component.setState({library: validResponse});
    });
  }),
  findItemsHavingSameName: typify('search :: library -> string -> (array programminglanguage) | (array paradigm)', function(library, name) {
    console.log('_API/findItemsHavingSameName(' + library + ' ,' + name + ')');
    var allItems = library.programminglanguages.concat(library.paradigms);
    typify.assert('array', allItems);

    var duplicateItems = [];
    var counter = 0;
    while(counter < allItems.length) {
      typify.assert('(programminglanguage | paradigm)',allItems[counter]);
      if(allItems[counter].name === name) {
        duplicateItems.push(allItems[counter]);
      }
      counter++;
    }

    return duplicateItems;
  }),
  search: typify('search :: library -> string -> string -> string -> ' +
    '(array programminglanguage) | (array paradigm) | (array queryresult)', function(library, query, findBy, sortBy) {
    console.log('_API/search(' + library + ' ,' + query + ' ,' + findBy + ',' + sortBy + ')');

    //get all programming languages and paradigms
    var items = library['programminglanguages'].concat(library['paradigms']);
    var found = [];
    if (findBy === 'name') {
      //go through the array to find ones that match the query
      items.forEach(function(i) {
        if (i.name.toLowerCase().includes(query.toLowerCase()) ||  query.toLowerCase().includes(i.name.toLowerCase())) {
          found.push(i);
        }
      }.bind(this));
      //sort if needed
      if (found.length > 1) {
        found = _.sortBy(found, function(item) {
          return item.name;
        })
      }
    }
    else if (findBy === 'content') {
      //strict mode eg. "java is object-oriented" (double-quotes)
      var strict = query.length > 3 && query.charAt(0) === '"' && query.charAt(query.length - 1) === '"';
      var refinedQuery = strict ? query.substring(1, query.length - 1) : textToLowerCaseAlphanumericArray(query);

      //go through item to do searching
      items.forEach(function(i) {
        var rank = 0;
        if (strict) {
          if (i.details.includes(refinedQuery))
            rank++;
        }
        else {
          //turn item details to array of alphanumeric items
          textToLowerCaseAlphanumericArray(i.details).forEach(function(word) {
            if (refinedQuery.includes(word))
              rank++;
          });
        }

        //put to found array
        if (rank > 0) {
          found.push({
            foundItem: i,
            rank: rank
          });
        }
      });

      //sort
      if (found.length > 1) {
        found = _.sortBy(found, function(item) {
          return sortBy === 'relevance' ? item.rank : item.foundItem.name;
        });
      }
    }
    return _.reverse(found); //descending order
  })
}

export {U, _API, defineLibraryAppDataTypes, isDefined};