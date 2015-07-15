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

	var questionsList = [];
	var questionsEl = document.querySelector('kw-question-list');
	db.getAllQuestions().then(function (questions) {
	  questionsList = questions;
	  questionsEl.questions = questionsList;
	});

	var updateQuestionsList = function updateQuestionsList(questionToUpdate) {
	  var index = questionsList.findIndex(function (question) {
	    return question.key == questionToUpdate.key;
	  });
	  questionsList = questionsList.update(index, function () {
	    return questionToUpdate;
	  });
	  questionsEl.questions = questionsList;
	};

	document.addEventListener('addQuestion', function (evt) {
	  db.saveQuestion(new _modelsQuestion.Question(evt.detail, 0)).then(function (question) {
	    questionsList = questionsList.unshift(question);
	    questionsEl.questions = questionsList;
	  });
	});

	document.addEventListener('upvoteQuestion', function (evt) {
	  db.updateQuestion(evt.detail.upVote()).then(updateQuestionsList);
	});

	document.addEventListener('downvoteQuestion', function (evt) {
	  db.updateQuestion(evt.detail.downVote()).then(updateQuestionsList);
	});

	document.addEventListener('submitComment', function (evt) {
	  db.updateQuestion(evt.detail.question.addComment(evt.detail.commentText)).then(updateQuestionsList);
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _modelsQuestion = __webpack_require__(2);

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
	          request.onsuccess = function (e) {
	            question.setKey(e.target.result);
	            resolve(question);
	          };
	        });
	      });
	    }
	  }, {
	    key: 'updateQuestion',
	    value: function updateQuestion(question) {
	      var _this2 = this;

	      return this.getDb_().then(function (db) {
	        var store = _this2.openStore_(db, DB.Objects.QUESTION, DB.Transaction.READ_WRITE);
	        var request = store.get(question.key);
	        return new Promise(function (resolve, reject) {
	          request.onsuccess = function (evt) {
	            store.put(question, question.key).onsuccess = function (e) {
	              resolve(question);
	            };
	          };
	        });
	      });
	    }
	  }, {
	    key: 'getAllQuestions',
	    value: function getAllQuestions() {
	      var _this3 = this;

	      return this.getDb_().then(function (db) {
	        var store = _this3.openStore_(db, DB.Objects.QUESTION, DB.Transaction.READ_ONLY);
	        var cursor = store.openCursor();
	        return new Promise(function (resolve, reject) {
	          var questions = [];
	          cursor.onsuccess = function (evt) {
	            var result = event.target.result;
	            if (result) {
	              questions.push(_modelsQuestion.Question.fromJSON(result.value, result.key));
	              result['continue']();
	            } else {
	              resolve(new Immutable.List(questions));
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

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Question = (function () {
	  function Question(text, votes, opt_vote, opt_key, opt_comments) {
	    _classCallCheck(this, Question);

	    this.text = text;
	    this.votes = votes;
	    this.vote = opt_vote == undefined ? 1 : opt_vote;
	    this.key = opt_key;
	    this.comments = opt_comments || [];
	  }

	  _createClass(Question, [{
	    key: "upVote",
	    value: function upVote() {
	      if (this.vote == 1) {
	        return new Question(this.text, this.votes, 0, this.key, this.comments);
	      } else {
	        return new Question(this.text, this.votes, 1, this.key, this.comments);
	      }
	    }
	  }, {
	    key: "downVote",
	    value: function downVote() {
	      if (this.vote == -1) {
	        return new Question(this.text, this.votes, 0, this.key, this.comments);
	      } else {
	        return new Question(this.text, this.votes, -1, this.key, this.comments);
	      }
	    }
	  }, {
	    key: "addComment",
	    value: function addComment(text) {
	      this.comments.push(text);
	      return new Question(this.text, this.votes, this.vote, this.key, this.comments);
	    }
	  }, {
	    key: "setKey",
	    value: function setKey(key) {
	      this.key = key;
	    }
	  }], [{
	    key: "fromJSON",
	    value: function fromJSON(json, opt_key) {
	      return new Question(json.text, json.votes, json.vote, opt_key, json.comments);
	    }
	  }]);

	  return Question;
	})();

	exports.Question = Question;
	;

/***/ }
/******/ ]);