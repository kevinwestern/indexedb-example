import {Question} from './models/Question';

export class DB {

  constructor(name, version) {
    this.name_ = name;
    this.version_ = version;
    this.dbPromise_ = null;
  }

  open_() {
    var request = window.indexedDB.open(this.name_, this.version_);
    request.onupgradeneeded = this.upgrade_;
    return new Promise((resolve, reject) => {
      request.onsuccess = (e) => resolve(e.target.result);
    });
  }

  getDb_() {
    if (!this.dbPromise_) {
      this.dbPromise_ = this.open_();
    }
    return this.dbPromise_;
  }

  saveQuestion(question) {
    return this.getDb_().then((db) => {
      const store = this.openStore_(db, DB.Objects.QUESTION, DB.Transaction.READ_WRITE);
      const request = store.add(question);
      return new Promise((resolve, reject) => {
        request.onsuccess = (e) => {
          question.setKey(e.target.result);
          resolve(question)
        }
      });
    });
  }

  updateQuestion(question) {
    return this.getDb_().then((db) => {
      const store = this.openStore_(db, DB.Objects.QUESTION, DB.Transaction.READ_WRITE);
      const request = store.get(question.key);
      request.onsuccess = (evt) => {
        store.put(question, question.key)
      }
    });
  }

  getAllQuestions() {
    return this.getDb_().then((db) => {
      const store = this.openStore_(db, DB.Objects.QUESTION, DB.Transaction.READ_ONLY);
      const cursor = store.openCursor();
      return new Promise((resolve, reject) => {
        const questions = [];
        cursor.onsuccess = (evt) => {
          const result = event.target.result;
          if (result) {
            questions.push(Question.fromJSON(result.value, result.key));
            result.continue();
          } else {
            resolve(questions);
          }
        }
      });
    });
  }

  /**
   * @param {!window.indexedDB} db
   * @param {!Db.Ojects} name
   * @param {!Db.Transaction} transactionType
   */
  openStore_(db, name, transactionType) {
    return db.transaction(name, transactionType).objectStore(name);
  }

  upgrade_(upgradeEvent) {
    var db = upgradeEvent.target.result;
    db.createObjectStore(DB.Objects.QUESTION, { autoIncrement: true });
  }
}


/** @type Enum<String> */
DB.Objects = {
  QUESTION: 'question'
};

/** @type Enum<String> */
DB.Transaction = {
  READ_WRITE: 'readwrite',
  READ_ONLY: 'readonly'
};