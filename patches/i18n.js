'use strict';

exports.__esModule = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.str = str;
exports.html = html;
exports.group = group;
exports.initI18n = initI18n;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

//----------------------------------------------------
//var _util = require('util');

var formatRegExp = /%[sdj%]/g;
var format = function(f) {
  if (! (typeof f === 'string')) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(/%[sdj%]/g, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};
//----------------------------------------------------

var _sync = require('./sync');

var _sync2 = _interopRequireDefault(_sync);

var _index = require('./core/index');

var l = _interopRequireWildcard(_index);

var _data_utils = require('./utils/data_utils');

var _en = require('./i18n/en');

var _en2 = _interopRequireDefault(_en);

var _cdn_utils = require('./utils/cdn_utils');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _dataFns = (0, _data_utils.dataFns)(["i18n"]),
    get = _dataFns.get,
    set = _dataFns.set;

function str(m, keyPath) {
  for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  //return _util.format.apply(undefined, [get(m, ["strings"].concat(keyPath), "")].concat(args));
  //console.log('auth0-lock -> i18n.js -> str');
  //console.log([get(m, ["strings"].concat(keyPath), "")].concat(args));
  return format.apply(undefined, [get(m, ["strings"].concat(keyPath), "")].concat(args));
}

function html(m, keyPath) {
  for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
    args[_key2 - 2] = arguments[_key2];
  }

  var html = str.apply(undefined, [m, keyPath].concat(args));

  return html ? _react2.default.createElement("span", { dangerouslySetInnerHTML: { __html: html } }) : null;
}

function group(m, keyPath) {
  return get(m, ["strings"].concat(keyPath), (0, _immutable.Map)()).toJS();
}

function initI18n(m) {
  var language = l.ui.language(m);
  var overrides = l.ui.dict(m);
  var defaultDictionary = _immutable2.default.fromJS(_en2.default);

  var base = languageDictionaries[language] || (0, _immutable.Map)({});

  if (base.isEmpty()) {
    base = overrides;
    m = (0, _sync2.default)(m, "i18n", {
      syncFn: function syncFn(_, cb) {
        return syncLang(m, language, cb);
      },
      successFn: function successFn(m, result) {
        registerLanguageDictionary(language, result);

        var overrided = _immutable2.default.fromJS(result).mergeDeep(overrides);

        assertLanguage(m, overrided.toJS(), _en2.default);

        return set(m, "strings", defaultDictionary.mergeDeep(overrided));
      }
    });
  } else {
    assertLanguage(m, base.toJS(), _en2.default);
  }

  base = defaultDictionary.mergeDeep(base).mergeDeep(overrides);

  return set(m, "strings", base);
}

function assertLanguage(m, language, base) {
  var path = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "";

  Object.keys(base).forEach(function (key) {
    if (!language.hasOwnProperty(key)) {
      l.warn(m, 'language does not have property ' + path + key);
    } else {
      if (_typeof(base[key]) === 'object') {
        assertLanguage(m, language[key], base[key], '' + path + key + '.');
      }
    }
  });
}

// sync

function syncLang(m, language, _cb) {
  (0, _cdn_utils.load)({
    method: "registerLanguageDictionary",
    url: l.languageBaseUrl(m) + '/js/lock/' + '10.5.1' + '/' + language + '.js',
    check: function check(str) {
      return str && str === language;
    },
    cb: function cb(err, _, dictionary) {
      _cb(err, dictionary);
    }
  });
}

var languageDictionaries = [];

function registerLanguageDictionary(language, dictionary) {
  languageDictionaries[language] = _immutable2.default.fromJS(dictionary);
}

registerLanguageDictionary("en", _en2.default);

(0, _cdn_utils.preload)({
  method: "registerLanguageDictionary",
  cb: registerLanguageDictionary
});
