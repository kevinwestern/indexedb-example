import {DB} from './db';
import {Question} from './models/Question';

const form = document.querySelector("#questionForm");
const text = document.querySelector("#text");
const db = new DB('questioner', 1);

let questionsList = [];
const questionsEl = document.querySelector('kw-question-list');
db.getAllQuestions().then((questions) => {
  questionsList = questions;
  questionsEl.questions = questionsList;
});

document.addEventListener('addQuestion', (evt) => {
  db.saveQuestion(new Question(evt.detail, 0)).then(question => {
    questionsList = questionsList.unshift(question);
    questionsEl.questions = questionsList;
  })
})