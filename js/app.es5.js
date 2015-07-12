/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _db = __webpack_require__(1);

	var _modelsQuestion = __webpack_require__(2);

	var form = document.querySelector('#questionForm');
	var text = document.querySelector('#text');
	var db = new _db.DB('questioner', 1);

	form.addEventListener('submit', function (evt) {
	  var question = new _modelsQuestion.Question(text.value);
	  db.saveQuestion(question).then(function () {
	    return displayQuestion(question);
	  });
	  evt.stopPropagation();
	  evt.preventDefault();
	});

	var displayQuestion = function displayQuestion(question) {
	  document.body.appendChild(createQuestionElement(question));
	};

	var createQuestionElement = function createQuestionElement(question) {
	  var el = document.createElement('div');
	  el.textContent = question.text;
	  return el;
	};

	// Display all questions from the db
	db.getAllQuestions().then(function (questions) {
	  return showAllQuestions(questions);
	});

	var showAllQuestions = function showAllQuestions(questions) {
	  var fragment = document.createDocumentFragment();
	  questions.forEach(function (question) {
	    return fragment.appendChild(createQuestionElement(question));
	  });
	  document.body.appendChild(fragment);
	};

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var DB = (function () {
	  function DB(name, version) {
	    _classCallCheck(this, DB);

	    this.name_ = name;
	    this.version_ = version;
	    this.dbPromise_ = null;
	  }

	  _createClass(DB, [{
	    key: 'open_',
	    value: function open_() {
	      var request = window.indexedDB.open(this.name_, this.version_);
	      request.onupgradeneeded = this.upgrade_;
	      return new Promise(function (resolve, reject) {
	        request.onsuccess = function (e) {
	          return resolve(e.target.result);
	        };
	      });
	    }
	  }, {
	    key: 'getDb_',
	    value: function getDb_() {
	      if (!this.dbPromise_) {
	        this.dbPromise_ = this.open_();
	      }
	      return this.dbPromise_;
	    }
	  }, {
	    key: 'saveQuestion',
	    value: function saveQuestion(question) {
	      var _this = this;

	      return this.getDb_().then(function (db) {
	        var store = _this.openStore_(db, DB.Objects.QUESTION, DB.Transaction.READ_WRITE);
	        var request = store.add(question);
	        return new Promise(function (resolve, reject) {
	          request.onsuccess = function () {
	            return resolve(question);
	          };
	        });
	      });
	    }
	  }, {
	    key: 'getAllQuestions',
	    value: function getAllQuestions() {
	      var _this2 = this;

	      return this.getDb_().then(function (db) {
	        var store = _this2.openStore_(db, DB.Objects.QUESTION, DB.Transaction.READ_ONLY);
	        var cursor = store.openCursor();
	        return new Promise(function (resolve, reject) {
	          var questions = [];
	          cursor.onsuccess = function (evt) {
	            var result = event.target.result;
	            if (result) {
	              questions.push(result.value);
	              result['continue']();
	            } else {
	              resolve(questions);
	            }
	          };
	        });
	      });
	    }
	  }, {
	    key: 'openStore_',

	    /**
	     * @param {!window.indexedDB} db
	     * @param {!Db.Ojects} name
	     * @param {!Db.Transaction} transactionType
	     */
	    value: function openStore_(db, name, transactionType) {
	      return db.transaction(name, transactionType).objectStore(name);
	    }
	  }, {
	    key: 'upgrade_',
	    value: function upgrade_(upgradeEvent) {
	      var db = upgradeEvent.target.result;
	      db.createObjectStore(DB.Objects.QUESTION, { autoIncrement: true });
	    }
	  }]);

	  return DB;
	})();

	exports.DB = DB;

	/** @type Enum<String> */
	DB.Objects = {
	  QUESTION: 'question'
	};

	/** @type Enum<String> */
	DB.Transaction = {
	  READ_WRITE: 'readwrite',
	  READ_ONLY: 'readonly'
	};

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Question = function Question(text) {
	  _classCallCheck(this, Question);

	  this.text = text;
	};

	exports.Question = Question;

/***/ }
/******/ ]);