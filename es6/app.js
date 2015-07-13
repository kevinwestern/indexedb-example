import {DB} from './db';
import {Question} from './models/Question';

const form = document.querySelector("#questionForm");
const text = document.querySelector("#text");
const submitButton = document.querySelector("#submit");
const db = new DB('questioner', 1);
const questionsEl = document.querySelector("#questions");

const submit = (evt) => {
  const question = new Question(text.value, 0);
  db.saveQuestion(question)
    .then(() => displayQuestion(question))
    .then(() => text.value = '');
  evt.stopPropagation();
  evt.preventDefault();
};

const displayQuestion = (question) => {
  questionsEl.insertBefore(createQuestionElement(question), questionsEl.childNodes[2]);
};

const createQuestionElement = (question) => {
  const el = document.createElement('kw-question');
  el.question = question;
  return el;
};

// Display all questions from the db
window.requestAnimationFrame(() =>
  db.getAllQuestions().then((questions) => showAllQuestions(questions)));

const showAllQuestions = (questions) => {
  const fragment = document.createDocumentFragment();
  questions.forEach((question) => fragment.appendChild(createQuestionElement(question)));
  const questionsEl = document.querySelector("#questions");
  questionsEl.appendChild(fragment);
}

form.addEventListener('submit', submit);
submitButton.addEventListener('click', submit);
document.addEventListener('questionChanged', (evt) => {
  db.updateQuestion(evt.detail);
});