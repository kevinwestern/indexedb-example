import {DB} from './db';
import {Question} from './models/Question';

const form = document.querySelector("#questionForm");
const text = document.querySelector("#text");
const db = new DB('questioner', 1);

form.addEventListener('submit', function(evt) {
  const question = new Question(text.value);
  db.saveQuestion(question).then(() => displayQuestion(question));
  evt.stopPropagation();
  evt.preventDefault();
});

const displayQuestion = (question) => {
  document.body.appendChild(createQuestionElement(question))
};

const createQuestionElement = (question) => {
  const el = document.createElement('div');
  el.textContent = question.text;
  return el;
};

// Display all questions from the db
db.getAllQuestions().then((questions) => showAllQuestions(questions));

const showAllQuestions = (questions) => {
  const fragment = document.createDocumentFragment();
  questions.forEach((question) => fragment.appendChild(createQuestionElement(question)));
  document.body.appendChild(fragment);
}