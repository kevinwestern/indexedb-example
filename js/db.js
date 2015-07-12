"use strict";

var _createClass = (function () {
  function defineProperties(target, props) {
    for (var key in props) {
      var prop = props[key];prop.configurable = true;if (prop.value) prop.writable = true;
    }Object.defineProperties(target, props);
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
})();

var _classCallCheck = function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var DB = exports.DB = (function () {
  function DB() {
    _classCallCheck(this, DB);
  }

  _createClass(DB, {
    open: {
      value: function open(name, version) {
        var request = window.indexedb.open(name, version);
        request.onupgradeneeded = this.upgrade_;
        return new Promise(function (resolve, reject) {
          request.onsuccess = function () {
            return resolve(request);
          };
        });
      }
    },
    upgrade_: {
      value: function upgrade_(upgradeEvent) {
        var db = upgradeEvent.target.result;
        db.createObjectStore("question", { keyPath: "__key__" });
      }
    }
  });

  return DB;
})();

;